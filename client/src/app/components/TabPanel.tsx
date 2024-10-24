import React, { useEffect, useState } from "react";
//import axios from "axios";
import { ChatBubble } from "@/app/components/ChatBubble";
import { CommentForm } from "@/app/components/CommentForm";
import { Player } from "@/app/components/Player";
import SubmitForm from "@/app/components/SubmitForm";
import CalculateTime from "@/app/hooks/CalculateTime";
import mockMessages from "@/app/components/MockData.json";
import mockMessages2 from "@/app/components/MockData2.json";
import { TabPanelProps } from "@/app/types/mobile";
import { ChatResponseProps } from "@/app/types/mobile";

const TabPanel = ({ value, index, player }: TabPanelProps) => {
  const [participantComments, setParticipantComments] = useState<
    ChatResponseProps[]
  >([]);
  const [judgeComments, setJudgeComments] = useState<ChatResponseProps[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (index === 0) {
      // TODO: GETリクエストでチャットメッセージを取得
      /*axios.get(`/chat/${chat_id}/`).then((response) => {
        setParticipantComments(response.data);
      });*/
      setParticipantComments(mockMessages);
    } else if (index === 1 && player === "spectator") {
      // モックデータ2をセット
      setJudgeComments(mockMessages2);
    }
  }, [index]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={`${
        value === index ? "flex-grow h-full flex flex-col" : "hidden"
      }`}
    >
      {value === index && (
        <div className="flex-grow flex flex-col h-full">
          {index === 0 ? (
            // タブ 0 (参加者コメント)
            <div className="flex flex-col flex-grow overflow-y-auto">
              {participantComments.map((chat) => (
                <ChatBubble
                  key={chat.message_id}
                  username={chat.player_name}
                  message={chat.message}
                  time={CalculateTime(chat.created_at)}
                  role={chat.player_role}
                  player={player}
                />
              ))}
            </div>
          ) : index === 1 && player === "spectator" ? (
            // タブ 1かつplayerがspectatorの場合
            <div className="flex flex-col flex-grow overflow-y-auto">
              {judgeComments.map((chat) => (
                <ChatBubble
                  key={chat.message_id}
                  username={chat.player_name}
                  message={chat.message}
                  time={CalculateTime(chat.created_at)}
                  role={chat.player_role}
                  player={player}
                />
              ))}
            </div>
          ) : (
            <div className="p-[36px_40px] flex flex-col gap-[54px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Player player={player} />
                <p>主張内容を入力してください</p>
              </div>
              <SubmitForm maxLength={100} player={player} />
            </div>
          )}
          {index === 0 ||
            (index === 1 && player === "spectator" && (
              <div className="flex-shrink-0">
                <CommentForm message={message} setMessage={setMessage} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TabPanel;
