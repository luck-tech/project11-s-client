"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "@/app/components/TabPanel";
import { useSearchParams } from "next/navigation";

const Chat = () => {
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // TODO: trial/game_stateにリクエストを1秒間隔で送り、game_stateがshow_final_claim_and_judgeになったらどっかに飛ばす（デザイン協議中）

  const themeClass =
    player === "plaintiff"
      ? "#E854AC"
      : player === "defendant"
      ? "#5193E0"
      : "#49C7B0";

  if (!player) return;
  return (
    <>
      <h1 className="p-[20px_36px] text-theme-green text-[18px] leading-[32.4px]">
        AI裁判官
      </h1>
      <div className="w-full flex-grow flex flex-col mb-[40px]">
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="chat tabs"
          centered
          className="w-full font-medium"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: themeClass,
            },
          }}
        >
          <Tab
            label={
              player == "spectator"
                ? "参加者コメント(閲覧のみ）"
                : "参加者コメント"
            }
            className="w-6/12 p-[14px_16px] text-[12px]"
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: themeClass,
              },
            }}
          />
          <Tab
            label={player == "spectator" ? "AI裁判官とのチャット" : "主張編集"}
            className="w-6/12 text-[12px]"
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: themeClass,
              },
            }}
          />
        </Tabs>
        <TabPanel value={value} index={0} player={player} />
        <TabPanel value={value} index={1} player={player} />
      </div>
    </>
  );
};
export default Chat;
