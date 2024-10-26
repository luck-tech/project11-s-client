"use client";
import ClaimJudgmentLayout from "@/app/components/ClaimJudgmentLayout";
import ClaimJudgmentStart from "@/app/components/ClaimJudgmentStart";
import { useTimer } from "@/app/hooks/useTimer";
import { trialState } from "@/app/TrialState";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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

const ClaimJudge = () => {
  const timeLimit = { min: 1, sec: 0 };
  const { time, timeUp, startTime } = useTimer(timeLimit);
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  const [claimState, setClaimState] = useState<"start" | "claim">("start");
  const { id }: { id: string } = useParams();
  const [title, setTitle] = useState({ playerName: "a", sentence: "" });
  const [content, setContent] = useState("");
  const trial = useRecoilValue(trialState);
  const router = useRouter();

  useEffect(() => {
    if (!player) return;
    (async () => {
      try {
        if (player === "plaintiff") {
          const claims = await getClaims(id, "plaintiff_claim");
          console.log("plaintiff claims", claims);
          setTitle({
            playerName: claims.player_name,
            sentence: "さんの主張を始めます",
          });
          setContent(claims.resource);
        } else if (player === "defendant") {
          const claims = await getClaims(id, "defendant_claim");
          console.log("defendant claims", claims);
          setTitle({
            playerName: claims.player_name,
            sentence: "さんの主張を始めます",
          });
          setContent(claims.resource);
        } else if (player === "judge") {
          const judgment = await getClaims(id, "provisional_judgment");
          console.log("provisional judgment", judgment);
          setContent(judgment.resource);
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
      if (player === "plaintiff") {
        setClaimState("start");
        setContent("");
        router.push(`/${id}/play/claimJudge?player=defendant`);
      } else if (player === "defendant") {
        router.push(`/${id}/play/claimJudge?player=judge`);
      }
    }
  }, [timeUp]);

  if (
    !player ||
    (player !== "plaintiff" && player !== "defendant" && player !== "judge")
  )
    return;

  return (
    <>
      {player === "judge" ? (
        <ClaimJudgmentLayout
          player={"judge"}
          title={`AI裁判官の暫定判決`}
          content={content}
        />
      ) : claimState === "start" ? (
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
          time={{ time: time, timeLimit: timeLimit }}
        />
      )}
    </>
  );
};

export default ClaimJudge;