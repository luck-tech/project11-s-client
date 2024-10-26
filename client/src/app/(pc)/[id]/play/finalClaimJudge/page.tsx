import ClaimJudgmentLayout from "@/app/components/ClaimJudgmentLayout";

const FinalClaimJudge = () => {
  // 最終主張と判決を表示するページ
  return (
    <>
      <ClaimJudgmentLayout
        player={"judge"}
        title={`AI裁判官の暫定判決`}
        content={
          "被告のSNS投稿は事実に基づかず、原告の名誉を著しく傷つけたと認められるため、被告に対して損害賠償〇〇円の支払いを命じます。"
        }
      />
    </>
  );
};

export default FinalClaimJudge;
