import type { Metadata } from "next";
import "./App.scss";
import { HeaderComponentPack } from "@/Components/HeaderComponentPack/HeaderComponentPack";
import { Footer } from "@/Components/Footer/Footer";

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
    <html lang="en">
      <body>
        <HeaderComponentPack />
          {children}
        <Footer />
      </body>
    </html>
  );
}
