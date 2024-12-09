import type { Metadata } from "next";
import "./App.scss";

export const metadata: Metadata = {
  title: "Park Mobile",
  description: "Park Mobile Краснодар",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
