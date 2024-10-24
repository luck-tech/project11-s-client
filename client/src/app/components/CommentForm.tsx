import React from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { CommentFormProps } from "@/app/types/mobile";

export const CommentForm = ({ message, setMessage }: CommentFormProps) => {
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage("");
  };
  return (
    <div className="my-[27px] font-normal flex bg-[#79747E] rounded-[12px_12px_0_0] p-4 gap-1 items-center self-end w-full">
      <input
        type="text"
        placeholder="コメントを記入してください"
        value={message}
        onChange={handleMessageChange}
        className="focus:outline-none flex-grow h-[24px] placeholder-white bg-[#79747E]"
      />
      <IconButton onClick={handleSendMessage} className="text-white h-[24px]">
        <SendIcon />
      </IconButton>
    </div>
  );
};
