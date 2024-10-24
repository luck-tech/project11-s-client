import React from "react";
import { PlayerProps } from "@/app/types/mobile";

export const Player = ({ player }: PlayerProps) => {
  const playerText =
    player === "plaintiff"
      ? "PlayerA(原告)"
      : player === "defendant"
      ? "PlayerB(被告)"
      : "傍聴人";

  const themeClass =
    player === "plaintiff"
      ? "text-theme-pink"
      : player === "defendant"
      ? "text-theme-blue"
      : "text-theme-green";

  return (
    <span className={`text-[18px] leading-[32.4px] ${themeClass}`}>
      {playerText}
    </span>
  );
};
