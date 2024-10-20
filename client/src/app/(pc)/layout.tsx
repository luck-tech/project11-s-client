export default function PCLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="container mx-auto px-5">{children}</body>
    </html>
  );
}
