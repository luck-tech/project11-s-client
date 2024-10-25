"use client";
import ClaimJudgmentLayout from "@/app/components/ClaimJudgmentLayout";
import ClaimJudgmentStart from "@/app/components/ClaimJudgmentStart";
import { useTimer } from "@/app/hooks/useTimer";
import { trialState } from "@/app/TrialState";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getClaims(id: string, type: string) {
  const res = await fetch(`${API_URL}/trial/claims_and_judgments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ trial_id: id, resource_type: type }),
  });

  if (!res.ok) {
    throw new Error(`failed get claims ${res.status}`);
  }

  return await res.json();
}

const PlayerClaim = () => {
  const timeLimit = { min: 1, sec: 0 };
  const { time, timeUp, startTime } = useTimer(timeLimit);
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  const [claimState, setClaimState] = useState<"start" | "claim">("start");
  const { id }: { id: string } = useParams();
  const [title, setTitle] = useState({ playerName: "a", sentence: "" });
  const [content, setContent] = useState("");
  const trial = useRecoilValue(trialState);

  useEffect(() => {
    if (!player || (player !== "plaintiff" && player !== "defendant")) return;
    (async () => {
      try {
        if (player === "plaintiff") {
          const claims = await getClaims(id, "plaintiff_claim");
          setTitle({
            playerName: claims.player_name,
            sentence: "さんの主張を始めます",
          });
          setContent(claims.resource);
        } else if (player === "defendant") {
          const claims = await getClaims(id, "defendant_claim");
          setContent(claims.resource);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [player]);

  useEffect(() => {
    if (claimState === "claim") {
      setTitle({ ...title, sentence: "さんの主張" });
      startTime();
    }
  }, [claimState]);

  useEffect(() => {
    if (timeUp) {
      // タイムアップ後の処理
    }
  }, [timeUp]);

  if (!player || (player !== "plaintiff" && player !== "defendant")) return;

  return (
    <>
      {claimState === "start" ? (
        <ClaimJudgmentStart
          player={player}
          subject={trial.subject}
          title={title.playerName + title.sentence}
          buttonClick={() => setClaimState("claim")}
        />
      ) : (
        <ClaimJudgmentLayout
          player={player}
          title={title.playerName + title.sentence}
          content={content}
          time={time}
        />
      )}
    </>
  );
};

export default PlayerClaim;
