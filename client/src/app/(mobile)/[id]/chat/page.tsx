"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { ChatBubble } from "@/app/components/ChatBubble";
import TabPanel from "@/app/components/TabPanel";
import { CommentForm } from "@/app/components/CommentForm";
import { Player } from "@/app/components/Player";
import SubmitForm from "@/app/components/SubmitForm";
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

  if (!player) return;
  return (
    <div className="">
      <Tabs
        value={value}
        onChange={handleTabChange}
        aria-label="chat tabs"
        centered
        className="font-medium"
      >
        <Tab label="参加者コメント" />
        <Tab label="主張編集" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className="">
          <ChatBubble
            username="user_name1"
            message="Aさんの主張についてコメントします"
            time="3分"
            color="bg-pink-300"
          />
          <ChatBubble
            username="user_name2"
            message="Aさんの主張についてコメントします"
            time="3分"
            color="bg-teal-300"
          />
          <ChatBubble
            username="user_name2"
            message="Aさんの主張についてコメントします"
            time="2分"
            color="bg-blue-300"
          />
          <ChatBubble
            username="user_name3"
            message="コメントテキストが長い場合の表示例です。"
            time="1分"
            color="bg-pink-400"
          />
        </div>
        <CommentForm message={message} setMessage={setMessage} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className="p-[36px_40px] flex flex-col gap-[54px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Player player={player} />
            <p>主張内容を入力してください</p>
          </div>
          <SubmitForm maxLength={100} player={player} />
        </div>
      </TabPanel>
    </div>
  );
};
export default Chat;
