import React from "react";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-white bg-[#333] min-h-screen flex flex-col font-bold">
      {children}
    </div>
  );
}
