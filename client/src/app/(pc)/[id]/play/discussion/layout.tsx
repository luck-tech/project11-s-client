import React from "react";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-white bg-[#101616]">
      <div className="min-h-screen mx-auto flex flex-col font-bold">
        {children}
      </div>
    </div>
  );
}
