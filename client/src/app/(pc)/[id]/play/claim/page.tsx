"use client";
import ClaimJudgmentLayout from "@/app/components/ClaimJudgmentLayout";
import { useTimer } from "@/app/hooks/useTimer";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PlayerClaim = () => {
  const timeLimit = { min: 1, sec: 0 };
  const { time, timeUp, startTime } = useTimer(timeLimit);
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  if (!player || (player !== "plaintiff" && player !== "defendant")) return;

  useEffect(() => {
    if (timeUp) {
      // タイムアップ後の処理
    }
  }, [timeUp]);

  useEffect(() => {
    startTime();
  }, []);

  const claim = {
    type: "Aの主張",
    content:
      "被告がSNSにおいて虚偽かつ誹謗中傷にあたる投稿を行った結果、名誉を著しく傷つけられ、 信用が低下しました。",
  };

  return (
    <>
      <ClaimJudgmentLayout
        user={player}
        title={`${claim.type}`}
        content={claim.content}
        time={{ time: time, timeLimit: timeLimit }}
      />
    </>
  );
};

export default PlayerClaim;
