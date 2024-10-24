import React from "react";

interface ChatProps {
  username: string;
  message: string;
  time: string;
  color: string;
}

// TODO: GET /chat/{chat_id}/でチャット内の新規メッセージを取得する
// playerのroleが返ってくるから、それで色を出し分ける。時間はcreated_atとnowの差分で表示

export const ChatBubble = ({ username, message, time, color }: ChatProps) => (
  <div className="font-normal flex-grow">
    <div className="">
      <p className="">@{username}</p>
      <p>{message}</p>
    </div>
    <p className="">{time}前</p>
  </div>
);
