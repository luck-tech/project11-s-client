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
    <IconButton onClick={handleBackClick} aria-label="戻る">
      <ArrowBackIcon className="text-theme-green" />
    </IconButton>
  );
};
