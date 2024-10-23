"use client";
import { RecoilRoot } from "recoil";

export default function PCLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRoot>
      <div className="relative w-full h-full">{children}</div>;
    </RecoilRoot>
  );
}
