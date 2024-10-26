"use client";

import React, { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useTimer } from "@/app/hooks/useTimer";
import { useParams } from "next/navigation";
import Timer from "@/app/components/Timer";
import useSlides from "@/app/hooks/useSlides";
import SlideContent from "@/app/components/SlideContent";
import useSlideInterval from "@/app/hooks/useSlideInterval";
import { useRouter } from "next/navigation";
import axios from "axios";

const Discussion = () => {
  const { id }: { id: string } = useParams();
  const timeLimit = { min: 5, sec: 0 };
  const { time, timeUp, startTime } = useTimer(timeLimit);
  const router = useRouter();

  const slides = useSlides(id);
  const currentSlide = useSlideInterval(slides.length, 5000);

  useEffect(() => {
    if (timeUp) {
      router.push(`/${id}/play/finalClaimJudge?player=plaintiff`);
    }
  }, [timeUp]);

  useEffect(() => {
    const initializeDiscussion = async () => {
      try {
        await axios.post(
          `https://project7.uni-bo.net/api/trial/game_state/set/`,
          {
            trial_id: id,
            state: "discussion",
          }
        );
        startTime();
      } catch (error) {
        console.error("ゲーム状態の設定に失敗しました:", error);
      }
    };

    initializeDiscussion();
  }, [id, startTime]);

  return (
    <div className="pt-[40px] flex-grow flex flex-col">
      {slides.length > 0 && <SlideContent slide={slides[currentSlide]} />}
      <div className="flex items-center justify-between w-full pr-[50px]">
        <Timer time={time} timeLimit={timeLimit} />
        <div className="aspect-square w-[176px] h-[176px] bg-white rounded-lg">
          <QRCodeSVG
            value={`http://localhost:3000/${id}/participation?player=spectator`}
            className="w-full h-full p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Discussion;
