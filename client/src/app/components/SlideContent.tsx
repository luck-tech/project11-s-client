import React from "react";

function SlideContent({
  slide: { title, header, content },
}: {
  slide: { title: string; header: string; content: string };
}) {
  const headerClass =
    header === "AI裁判官の主張"
      ? "text-theme-green"
      : header === "Aさんの主張"
      ? "text-theme-pink"
      : header === "Bさんの主張"
      ? "text-theme-blue"
      : "";

  return (
    <div className="flex-grow flex flex-col items-center">
      <h2 className="text-[40px] max-w-[840px] text-center">{title}</h2>
      <h1 className={`p-[40px] text-[64px] ${headerClass}`}>{header}</h1>
      <h2 className="p-[20px_60px] text-[40px] text-center">{content}</h2>
    </div>
  );
}

export default SlideContent;
