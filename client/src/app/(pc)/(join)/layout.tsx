import BgImage from "@/app/components/BgImage";

export default function PCLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BgImage color="green" />
      <main className="container mx-auto px-5">{children}</main>
    </div>
  );
}
