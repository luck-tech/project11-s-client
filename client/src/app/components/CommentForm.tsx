import React from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { CommentFormProps } from "@/app/types/mobile";

export const CommentForm = ({
  message,
  setMessage,
  setUpdateAt,
  index,
}: CommentFormProps) => {
  const API_URL = process.env.API_URL || "http://localhost:8000";

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    const plaintiffAndDefendant = JSON.parse(
      sessionStorage.getItem("plaintiff_and_defendant") || "{}"
    );
    const spectator = JSON.parse(sessionStorage.getItem("spectator") || "{}");

    const playerId =
      index === 0 ? plaintiffAndDefendant.playerId : spectator.playerId;
    const chatId =
      index === 0 ? plaintiffAndDefendant.mainChatId : spectator.subChatId;

    if (!playerId || !chatId) {
      console.error("Required session data is missing.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/message/create/`, {
        chat_id: chatId,
        player_id: playerId,
        message: message,
      });
      setUpdateAt(response.data.created_at);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="mt-[13px] font-normal flex bg-[#79747E] rounded-[12px_12px_0_0] p-4 gap-1 items-center self-end w-full">
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
