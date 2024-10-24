import React from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface CommentFormProps {
  message: string;
  setMessage: (message: string) => void;
}

export const CommentForm = ({ message, setMessage }: CommentFormProps) => {
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage("");
  };
  return (
    <div className="font-normal">
      <input
        type="text"
        placeholder="コメントを記入してください"
        value={message}
        onChange={handleMessageChange}
        className=""
      />
      <IconButton onClick={handleSendMessage} color="primary">
        <SendIcon />
      </IconButton>
    </div>
  );
};
