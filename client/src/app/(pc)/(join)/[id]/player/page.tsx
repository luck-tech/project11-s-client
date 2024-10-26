"use client";
import { trialState } from "@/app/TrialState";
import { useParams, useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

async function gameState(id: string) {
  const res = await fetch("https://project7.uni-bo.net/api/trial/game_state/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trial_id: id }),
  });

  if (!res.ok) {
    throw new Error(`failed get game state ${res.status}`);
  }

  return await res.json();
}

const JoinPlayer = () => {
  const trial = useRecoilValue(trialState);
  const { id }: { id: string } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = await gameState(id);
        if (state.state === "show_one_qr_codes") {
          router.push(`/${id}/spectator`);
        }
        console.log(state);
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
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between w-full">
        <div>
          <div className="text-xl lg:text-2xl font-bold bg-theme-pink px-10 py-5 rounded-xl mb-5 lg:mb-20">
            <p>Player A QRコード</p>
          </div>
          <div className="aspect-square max-w-[450px] lg:w-[450px] bg-white rounded-xl">
            <QRCodeSVG
              value={`https://project11-s-client.vercel.app/${id}/participation?player=plaintiff`}
              className="w-full h-full p-6 lg:p-9"
            />
          </div>
        </div>
        <div>
          <div className="text-xl lg:text-2xl font-bold bg-theme-blue px-10 py-5 rounded-xl mb-5 lg:mb-20">
            <p>Player B QRコード</p>
          </div>
          <div className="aspect-square max-w-[450px] lg:w-[450px] bg-white rounded-xl">
            <QRCodeSVG
              value={`https://project11-s-client.vercel.app/${id}/participation?player=defendant`}
              className="w-full h-full p-6 lg:p-9"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPlayer;
