"use client";
import ClaimJudgmentLayout from "@/app/components/ClaimJudgmentLayout";
import ClaimJudgmentStart from "@/app/components/ClaimJudgmentStart";
import { useTimer } from "@/app/hooks/useTimer";
import { trialState } from "@/app/TrialState";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import getClaims from "@/app/hooks/getClaims";

const FinalClaimJudge = () => {
  // 最終主張と判決を表示するページ
  const timeLimit = { min: 1, sec: 0 };
  const { time, timeUp, startTime } = useTimer(timeLimit);
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  const [claimState, setClaimState] = useState<"start" | "claim">("start");
  const { id }: { id: string } = useParams();
  const [title, setTitle] = useState({ playerName: "", sentence: "" });
  const [content, setContent] = useState("");
  const trial = useRecoilValue(trialState);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const state = await setState(id, "show_final_claim_and_judge");
        console.log("state", state);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!player) return;
    (async () => {
      try {
        if (player === "plaintiff") {
          const claims = await getClaims(id, "plaintiff_final_claim");
          console.log("plaintiff claims", claims);
          setTitle({
            playerName: claims.player_name,
            sentence: "さんの\n最終主張を始めます",
          });
          setContent(claims.resource);
        } else if (player === "defendant") {
          const claims = await getClaims(id, "defendant_final_claim");
          console.log("defendant claims", claims);
          setTitle({
            playerName: claims.player_name,
            sentence: "さんの\n最終主張を始めます",
          });
          setContent(claims.resource);
        } else if (player === "judge") {
          const judgment = await getClaims(id, "final_judgment");
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
      setTitle({ ...title, sentence: "さんの最終主張" });
      startTime();
    }
  }, [claimState]);

  useEffect(() => {
    if (timeUp) {
      if (player === "plaintiff") {
        setClaimState("start");
        setContent("");
        router.push(`/${id}/play/finalClaimJudge?player=defendant`);
      } else if (player === "defendant") {
        router.push(`/${id}/play/finalClaimJudge?player=judge`);
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
          title={`AI裁判官の判決`}
          content={content}
          linkHref={`/${id}/play/trialEnd`}
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

export default FinalClaimJudge;

async function setState(id: string, state: string) {
  const res = await fetch(
    `https://project7.uni-bo.net//trial/game_state/set/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trial_id: id,
        state: state,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`failed set state ${res.status}`);
  }

  return await res.json();
}
