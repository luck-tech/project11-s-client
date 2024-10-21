"use client";
import ClaimJudgmentLayout from "@/app/components/ClaimJudgmentLayout";
import { useTimer } from "@/app/hooks/useTimer";
import { useEffect, useState } from "react";

const PlayerClaim = () => {
  const timeLimit = { min: 1, sec: 0 };
  const { time, timeUp, startTime } = useTimer(timeLimit);
  const [user, setUser] = useState<"A" | "B">("B");

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
      username: "A",
      content:
        "被告がSNSにおいて虚偽かつ誹謗中傷にあたる投稿を行った結果、名誉を著しく傷つけられ、 信用が低下しました。",
    },
    B: {
      username: "B",
      content:
        "被告としては、原告が主張するSNSでの投稿は事実に基づいた意見であり、名誉毀損には該当しないと考えています。批判的意見の表明であって、原告を誹謗中傷する目的ではありませんでした。",
    },
  };

  return (
    <>
      <ClaimJudgmentLayout
        user={user}
        title={`${claim[user].username}の主張`}
        content={claim[user].content}
        time={time}
      />
    </>
  );
};

export default PlayerClaim;
