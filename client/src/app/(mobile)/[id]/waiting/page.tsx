"use client";
import { Player } from "@/app/components/Player";
import { useSearchParams } from "next/navigation";

const Waiting = () => {
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  if (!player) return;

  return (
    <>
      <div className="p-[20px_36px] flex items-center text-[18px] leading-[32.4px]">
        <p className="text-theme-green">AI裁判官</p>
      </div>
      <div className="p-[36px_40px] flex flex-col gap-[36px] items-center justify-center flex-grow text-[16px] leading-[28.8px]">
        <p>
          <Player player={player} />
          として参加を受付ました
        </p>
        <p>プロジェクターをご覧ください</p>
      </div>
    </>
  );
};

export default Waiting;
