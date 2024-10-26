"use client";
import { useEffect } from "react";
import BgImage from "./BgImage";
import Timer from "./Timer";

const ClaimJudgmentLayout = ({
  player,
  title,
  content,
  time,
}: {
  player: string;
  title: string;
  content: string;
  time?: {
    time: { min: number; sec: number };
    timeLimit: { min: number; sec: number };
  };
}) => {
  let color: "pink" | "blue" | "green";
  if (player === "plaintiff") {
    color = "pink";
  } else if (player === "defendant") {
    color = "blue";
  } else {
    color = "green";
  }

  const handleSpeak = () => {
    const uttr = new SpeechSynthesisUtterance();
    uttr.text = content;
    uttr.lang = "ja-JP";
    uttr.volume = 0.7;

    const voice = window.speechSynthesis.getVoices().find((voice) => {
      return voice.name === "Google 日本語";
    });
    if (voice) uttr.voice = voice;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(uttr);
  };

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      // 初回ロード時に音声を取得するためのダミー実行
      window.speechSynthesis.getVoices();
    };
  }, []);

  return (
    <>
      <BgImage color={color} />
      <div className="container mx-auto min-h-screen flex flex-col justify-center items-center gap-8">
        <h1
          className={`text-6xl lg:text-[88px] text-center font-bold text-theme-${color}`}
        >
          {title}
        </h1>
        <p className="font-bold text-center leading-normal md:leading-normal lg:leading-normal text-4xl md:text-5xl lg:text-6xl p-10">
          {content}
        </p>
        {time && (
          <div className="absolute bottom-0 left-0 p-10">
            <Timer time={time.time} timeLimit={time.timeLimit} />
          </div>
        )}
        {player === "judge" && (
          <>
            <button
              className={`text-4xl font-bold leading-snug py-5 px-10 bg-theme-${color} rounded-full my-4 text-black`}
            >
              進む
            </button>
            <button
              onClick={handleSpeak}
              className="px-4 py-2 hover:opacity-50"
            >
              読み上げ
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ClaimJudgmentLayout;
