import React from "react";

interface PlayerProps {
  player: string;
}
export const Player = ({ player }: PlayerProps) => {
  const playerText =
    player === "A"
      ? "PlayerA(原告)"
      : player === "B"
      ? "PlayerB(被告)"
      : "傍聴人";

  const themeClass =
    player === "A"
      ? "text-theme-pink"
      : player === "B"
      ? "text-theme-blue"
      : "text-theme-green";

  return (
    <span className={`text-[18px] leading-[32.4px] ${themeClass}`}>
      {playerText}
    </span>
  );
};
