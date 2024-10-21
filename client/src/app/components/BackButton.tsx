"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back(); // 前のページに戻る
  };

  return (
    <div className="flex items-center text-[18px] leading-[32.4px]">
      <IconButton onClick={handleBackClick} aria-label="戻る">
        <ArrowBackIcon className="text-theme-green" />
      </IconButton>
      <p className="text-theme-green">AI裁判官</p>
    </div>
  );
};
