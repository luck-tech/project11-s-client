import React from "react";
import { ChatBubble } from "@/app/components/ChatBubble";
import { CommentForm } from "@/app/components/CommentForm";
import { Player } from "@/app/components/Player";
import SubmitForm from "@/app/components/SubmitForm";

interface TabPanelProps {
  value: number;
  index: number;
  message: string;
  setMessage: (message: string) => void;
  player: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { value, index, message, setMessage, player, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={`${
        value === index ? "flex-grow h-full flex flex-col" : "hidden"
      }`}
    >
      {value === index && (
        <div className="flex-grow flex flex-col h-full">
          {index === 0 ? (
            // タブ 0 (参加者コメント)
            <div className="flex flex-col flex-grow">
              <ChatBubble
                username="user_name1"
                message="Aさんの主張についてコメントします"
                time="3分"
                color="bg-pink-300"
              />
              <CommentForm message={message} setMessage={setMessage} />
            </div>
          ) : index === 1 ? (
            // タブ 1 (主張編集)
            <div className="p-[36px_40px] flex flex-col gap-[54px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Player player={player} />
                <p>主張内容を入力してください</p>
              </div>
              <SubmitForm maxLength={100} player={player} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TabPanel;
