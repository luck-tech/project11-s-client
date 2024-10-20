import React from "react";
import NameSubmitForm from "@/app/components/NameSubmitForm";

const page = () => {
  return (
    <div className="p-[36px_40px] flex flex-col	gap-[54px] items-center	justify-center flex-grow">
      <h3 className="text-[18px] leading-[32.4px]">
        <span className="text-theme-green">AI裁判官</span>へようこそ！
      </h3>
      <div className="flex flex-col gap-[16px]">
        <h3 className="text-[18px] leading-[32.4px]">
          あなたは<span className="text-theme-pink">PlayerB(被告)</span>です
        </h3>
        <p className="text-[16px] text-center leading-[28.8px]">
          ユーザーネームを登録し、
          <br />
          参加ボタンを押してください
        </p>
      </div>
      <NameSubmitForm maxLength={10} />
      <div className="flex flex-col gap-[16px] leading-[21.6px] w-[120px]">
        <button className="p-[10px] text-[12px] border-[1px] border-[#FFF] border-solid rounded-[8px]">
          使い方
        </button>
        <button className="p-[10px] text-[12px] border-[1px] border-[#FFF] border-solid rounded-[8px]">
          お問い合わせ
        </button>
      </div>
    </div>
  );
};

export default page;
