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
    <div className="text-white text-center flex flex-col justify-center items-center min-h-screen gap-10 md:gap-36 py-8 max-w-7xl mx-auto">
      <div className="bg-[#828282] px-10 py-5 rounded-xl">
        <h1 className="text-3xl lg:text-[40px] font-medium lg:leading-snug leading-snug">
          {trial.subject}
          SNSでの名誉毀損による損害賠償請求SNSでの名誉毀損による損害賠償請求SNSでの名誉毀損による損害
        </h1>
      </div>
      <div>
        <div className="text-xl lg:text-2xl font-bold bg-theme-green px-10 py-5 rounded-xl mb-5 lg:mb-20">
          <p>傍聴人のQRコード</p>
        </div>
        <div className="aspect-square max-w-[450px] w-full lg:w-[450px] bg-neutral-100 rounded-lg">
          <QRCodeSVG
            value={`http://localhost:3000/${id}/participation?player=spectator`}
            className="w-full h-full p-6 lg:p-9"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinSpectator;
