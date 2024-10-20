export default function PCLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative w-full h-full">{children}</div>;
}
