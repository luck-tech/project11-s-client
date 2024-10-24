import React from "react";

interface ChatProps {
  username: string;
  message: string;
  time: string;
  color: string;
}

export const ChatBubble = ({ username, message, time, color }: ChatProps) => (
  <div className="font-normal">
    <div className="">
      <p className="">@{username}</p>
      <p>{message}</p>
    </div>
    <p className="">{time}前</p>
  </div>
);
