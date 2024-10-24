"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "@/app/components/TabPanel";
import { useSearchParams } from "next/navigation";

const Chat = () => {
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // TODO: trial/game_stateにリクエストを1秒間隔で送り、game_stateがshow_final_claim_and_judgeになったら、最終主張画面に飛ばす
  const themeClass =
    player === "A" ? "#F22CFB" : player === "B" ? "#1BCDFD" : "#88F4D5";

  if (!player) return;
  return (
    <div className="w-full p-[20px_0] flex-grow flex flex-col">
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
          label="参加者コメント"
          className="w-6/12 p-[14px_16px] text-[12px] text-white"
          sx={{
            "&.Mui-selected": {
              color: themeClass,
            },
          }}
        />
        <Tab
          label="主張編集"
          className="w-6/12 text-[12px] text-white"
          sx={{
            "&.Mui-selected": {
              color: player === "A" ? "#F22CFB" : "#1BCDFD",
            },
          }}
        />
      </Tabs>

      <TabPanel
        value={value}
        index={0}
        message={message}
        setMessage={setMessage}
        player={player}
      />
      <TabPanel
        value={value}
        index={1}
        message={message}
        setMessage={setMessage}
        player={player}
      />
    </div>
  );
};
export default Chat;
