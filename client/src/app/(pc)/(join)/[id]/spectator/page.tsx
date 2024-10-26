"use client";
import { trialState } from "@/app/TrialState";
import { useParams, useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function gameState(id: string) {
  const res = await fetch(`${API_URL}/trial/game_state/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trial_id: id }),
  });

  if (!res.ok) {
    throw new Error(`failed get game state ${res.status}`);
  }

  return await res.json();
}

const JoinSpectator = () => {
  const trial = useRecoilValue(trialState);
  const { id }: { id: string } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = await gameState(id);
        console.log(state);
        if (state.state === "show_first_claim_and_judge") {
          router.push(`/${id}/play/claimJudge?player=plaintiff`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const interval = setInterval(() => {
      fetchData();
    }, 3000);
    fetchData();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white text-center flex flex-col justify-center items-center min-h-screen gap-10 md:gap-24 py-8">
      <div className="bg-neutral-100 text-neutral-800 px-10 py-10 rounded-3xl">
        <h1 className="text-4xl lg:text-5xl font-bold lg:leading-snug leading-snug">
          {trial.subject}
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-4xl lg:text-5xl font-bold text-neutral-800 bg-neutral-100 px-10 py-10 rounded-[50px] mb-10">
          <p>傍聴人のQRコード</p>
        </div>
        <div className="aspect-square max-w-[450px] w-full lg:w-[450px] bg-neutral-100 rounded-lg">
          <QRCodeSVG
            value={`http://localhost:3000/participation`}
            className="w-full h-full p-6"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinSpectator;
