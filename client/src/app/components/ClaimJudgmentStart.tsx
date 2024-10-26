"use client";
import BgImage from "@/app/components/BgImage";
import { trialState } from "@/app/TrialState";
import { useRecoilValue } from "recoil";

const ClaimJudgmentStart = ({
  player,
  subject,
  title,
  buttonClick,
}: {
  player: string;
  subject: string;
  title: string;
  buttonClick: () => void;
}) => {
  const trial = useRecoilValue(trialState);

  let color: "pink" | "blue" | "green";
  if (player === "plaintiff") {
    color = "pink";
  } else if (player === "defendant") {
    color = "blue";
  } else {
    color = "green";
  }
  return (
    <>
      <BgImage color={color} />
      <div className="container mx-auto min-h-screen flex flex-col justify-center items-center gap-8">
        <p className="font-bold text-center leading-normal md:leading-normal lg:leading-normal text-4xl md:text-5xl lg:text-6xl p-10">
          {subject}
        </p>
        <h1
          className={`text-6xl lg:text-[88px] text-center font-bold text-theme-${color} leading-snug`}
        >
          {title}
        </h1>
        <button
          className={`text-4xl font-bold leading-snug py-5 px-10 bg-theme-${color} rounded-full my-10`}
          onClick={buttonClick}
        >
          主張を開始する
        </button>
      </div>
    </>
  );
};

export default ClaimJudgmentStart;
