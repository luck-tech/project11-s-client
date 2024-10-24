import React, { useState } from "react";
import { ChatBubbleProps } from "@/app/types/mobile";

export const ChatBubble = ({
  username,
  message,
  time,
  role,
  player,
}: ChatBubbleProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const themeClass =
    role === "plaintiff"
      ? "bg-theme-pink"
      : role === "defendant"
      ? "bg-theme-blue"
      : role === "judge"
      ? "bg-theme-green"
      : "bg-[#828282]";

  if (!player) return;
  return (
    <div className="font-normal p-[0_32px] rounded-lg mt-[20px]">
      {player !== role && <p className="text-[14px] mb-1">{username}</p>}
      <div
        className={`flex gap-[8px] mb-[13px] items-end ${
          player === role ? "flex-row-reverse" : ""
        }`}
      >
        <p
          className={`flex ${themeClass} text-[14px] ${
            player === role
              ? "rounded-[16px_16px_0px_16px]"
              : "rounded-[16px_16px_16px_0px]"
          } p-3`}
        >
          {message}
        </p>
        <p className="font-medium text-[12px] whitespace-nowrap text-[#828282]">
          {time}前
        </p>
      </div>
      {player !== role && (
        <button onClick={handleLikeClick}>
          <img
            src={isLiked ? "/good.png" : "/pre_good.png"}
            width={20}
            height={21}
            alt="like button"
          />
        </button>
      )}
    </div>
  );
};
