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
  if (!player || (player !== "A" && player !== "B")) return;

  useEffect(() => {
    if (timeUp) {
      // タイムアップ後の処理
    }
  }, [timeUp]);

  useEffect(() => {
    startTime();
  }, []);

  const claim = {
    A: {
      type: "Aの主張",
      content:
        "被告がSNSにおいて虚偽かつ誹謗中傷にあたる投稿を行った結果、名誉を著しく傷つけられ、 信用が低下しました。",
    },
    B: {
      type: "Bの主張",
      content:
        "被告としては、原告が主張するSNSでの投稿は事実に基づいた意見であり、名誉毀損には該当しないと考えています。批判的意見の表明であって、原告を誹謗中傷する目的ではありませんでした。",
    },
  };

  return (
    <>
      <ClaimJudgmentLayout
        user={player}
        title={`${claim[player].type}`}
        content={claim[player].content}
        time={time}
      />
    </>
  );
};

export default PlayerClaim;
