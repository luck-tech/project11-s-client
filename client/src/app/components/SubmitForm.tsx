"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { UserNameInputProps } from "@/app/types/mobile";

const SubmitForm = ({ maxLength, player }: UserNameInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { id }: { id: string } = useParams();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim().length > 0) {
      if (pathname.includes("/participation")) {
        try {
          const joinPlayer = await createPlayer(id, player, inputValue);
          console.log(joinPlayer);
          if (player === "plaintiff" || player === "defendant") {
            sessionStorage.setItem(
              "plaintiff_and_defendant",
              JSON.stringify({
                playerId: joinPlayer.player_id,
                mainChatId: joinPlayer.main_chat_id,
              })
            );
            router.push(`/${id}/claim?player=${player}`);
          } else {
            sessionStorage.setItem(
              "spectator",
              JSON.stringify({
                playerId: joinPlayer.player_id,
                mainChatId: joinPlayer.main_chat_id,
                subChatId: joinPlayer.sub_chat_id,
              })
            );
            router.push(`/${id}/waiting?player=${player}`);
          }
        } catch (error) {
          console.error(error);
        }
      } else if (pathname.includes("/claim")) {
        try {
          const claim = await createClaim(id, inputValue);
          console.log(claim);
          router.push(`/${id}/waiting?player=${player}`);
        } catch (error) {
          console.error(error);
        }
      } else if (
        pathname.includes("/chat") ||
        player === "plaintiff" ||
        player === "defendant"
      ) {
        try {
          const claim = await editClaim(id, inputValue);
          console.log(claim);
          setInputValue("");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const themeClass =
    player === "plaintiff"
      ? "theme-pink"
      : player === "defendant"
      ? "theme-blue"
      : "theme-green";

  return (
    <div className="flex-col flex gap-[24px] w-full">
      <div className="w-full">
        <p className="text-[12px] leading-[21.6px]">
          {maxLength == 100 ? "主張内容" : "ユーザーネーム登録"}
        </p>
        {maxLength == 100 ? (
          <textarea
            className={`w-full font-normal caret-${themeClass} text-[#FFF] placeholder-[#79747E] bg-[#333] border-[1px] border-solid border-[#FFF] rounded-[8px] p-[8px_10px] leading-[28.8px] focus:outline-none focus:border-${themeClass}`}
            placeholder="主張内容を入力してください"
            value={inputValue}
            onChange={handleChange}
            maxLength={maxLength}
          />
        ) : (
          <input
            className={`w-full font-normal caret-${themeClass} text-[#FFF] placeholder-[#79747E] bg-[#333] border-[1px] border-solid border-[#FFF] rounded-[8px] p-[8px_10px] leading-[28.8px] focus:outline-none focus:border-${themeClass}`}
            placeholder="ユーザーネームを入力"
            value={inputValue}
            onChange={handleChange}
            maxLength={maxLength}
          />
        )}
        <p className="text-right font-normal text-[12px] leading-[16px]">
          {inputValue.length}/{maxLength}
        </p>
      </div>
      <button
        className={`p-[10px_20px] text-[12px] rounded-[8px] border-[1px] border-solid w-full leading-[21.6px] ${
          inputValue.trim().length > 0
            ? `bg-${themeClass} border-${themeClass} cursor-pointer`
            : "bg-[#79747E] border-[#79747E] cursor-default"
        }`}
        onClick={handleSubmit}
        disabled={inputValue.trim().length === 0} // 入力がない場合は無効
      >
        {maxLength == 100 ? "送信する" : "参加する"}
      </button>
    </div>
  );
};

export default SubmitForm;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function createPlayer(id: string, role: string, playerName: string) {
  const res = await fetch(`${API_URL}/trial/player/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trial_id: id,
      role: role,
      player_name: playerName,
    }),
  });

  if (!res.ok) {
    throw new Error(`failed create player ${res.status}`);
  }

  return await res.json();
}

async function createClaim(id: string, claim: string) {
  const plaintiff_and_defendant = sessionStorage.getItem(
    "plaintiff_and_defendant"
  );
  if (!plaintiff_and_defendant) throw new Error(`playerId is not available`);
  const playerId = JSON.parse(plaintiff_and_defendant);

  const res = await fetch(`${API_URL}/trial/claim/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trial_id: id,
      player_id: playerId.playerId,
      claim: claim,
    }),
  });

  if (!res.ok) {
    throw new Error(`failed create player ${res.status}`);
  }

  return await res.json();
}

async function editClaim(id: string, claim: string) {
  const plaintiff_and_defendant = sessionStorage.getItem(
    "plaintiff_and_defendant"
  );
  if (!plaintiff_and_defendant) throw new Error(`player is not available`);
  const playerId = JSON.parse(plaintiff_and_defendant);

  const res = await fetch(`${API_URL}/trial/claim/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trial_id: id,
      player_id: playerId.playerId,
      claim: claim,
    }),
  });

  if (!res.ok) {
    throw new Error(`failed create player ${res.status}`);
  }

  return await res.json();
}
