import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "特朗普模拟器 | Trump Simulator",
  description: "扮演唐纳德·特朗普，体验总统生涯中的道德困境。你会成为贪婪的亿万富翁，还是人民的总统？",
  keywords: ["特朗普", "Trump", "模拟器", "Simulator", "游戏", "Game", "政治", "Politics"],
  authors: [{ name: "Trump Simulator" }],
  openGraph: {
    title: "特朗普模拟器 | Trump Simulator",
    description: "扮演唐纳德·特朗普，体验总统生涯中的道德困境",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-slate-900">{children}</body>
    </html>
  );
}
