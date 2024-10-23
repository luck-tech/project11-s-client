"use client";
import { Player } from "@/app/components/Player";
import SubmitForm from "@/app/components/SubmitForm";
import { BackButton } from "@/app/components/BackButton";
import { useSearchParams } from "next/navigation";

const Claim = () => {
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  if (!player) return;

  return (
    <>
      <div className="p-[20px_36px_20px_8px] flex items-center text-[18px] leading-[32.4px]">
        <BackButton />
        <p className="text-theme-green">AI裁判官</p>
      </div>
      <div className="p-[36px_40px] flex flex-col gap-[54px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Player player={player} />
          <p>主張内容を入力してください</p>
        </div>
        <SubmitForm maxLength={100} player={player} />
      </div>
    </>
  );
};

export default Claim;
