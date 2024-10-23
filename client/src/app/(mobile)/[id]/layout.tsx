import React from "react";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-white bg-[#333]">
      <div className="max-w-sm min-h-screen mx-auto flex flex-col font-bold">
        {children}
      </div>
    </div>
  );
}
