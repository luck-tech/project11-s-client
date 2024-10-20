"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface UserNameInputProps {
  maxLength: number; // 最大文字数をpropsとして受け取る
}

const NameSubmitForm: React.FC<UserNameInputProps> = ({ maxLength }) => {
  const [inputValue, setInputValue] = useState(""); // 入力された文字を保持
  const router = useRouter(); // Next.jsのルーター

  // 入力を制限しつつ、ステートを更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value); // 文字数が最大値以下の場合のみ更新
    }
  };

  // ボタンをクリックした時の処理
  const handleSubmit = () => {
    if (inputValue.trim().length > 0) {
      router.push("/claim"); // 文字が入力されていればclaimページに遷移
    }
  };

  return (
    <div className="flex-col flex gap-[24px] w-full">
      <div className="w-full">
        <p className="text-[12px] leading-[21.6px]">ユーザーネーム登録</p>
        <input
          className="w-full font-normal text-[#FFF] placeholder-[#79747E] bg-[#333] border-[1px] border-solid border-[#FFF] rounded-[8px] p-[8px_10px] leading-[28.8px] focus:outline-none focus:border-theme-pink"
          placeholder="ユーザーネームを入力"
          value={inputValue}
          onChange={handleChange}
          maxLength={maxLength} // 最大文字数を設定
        />
        <p className="text-right font-normal text-[12px] leading-[16px]">
          {inputValue.length}/{maxLength} {/* 現在の文字数/最大文字数 */}
        </p>
      </div>
      <button
        className={`p-[10px_20px] text-[12px] rounded-[8px] border-[1px] border-solid w-full leading-[21.6px] ${
          inputValue.trim().length > 0
            ? "bg-theme-pink border-theme-pink cursor-pointer"
            : "bg-[#79747E] border-[#79747E] cursor-default"
        }`}
        onClick={handleSubmit}
        disabled={inputValue.trim().length === 0} // 入力がない場合は無効
      >
        参加する
      </button>
    </div>
  );
};

export default NameSubmitForm;
