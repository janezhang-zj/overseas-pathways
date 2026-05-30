import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "飘向远方 — 出国路径信息聚合 | 打工度假、留学、实习、换宿",
    template: "%s | 飘向远方",
  },
  description:
    "聚合各国移民局官网第一手信息：澳洲WHV、新西兰打工度假、德国双元制、日本留学、美国J-1实习、WWOOF全球换宿等10+条低成本出国路径。按年龄、学历、预算筛选，每条路径含官方政策、费用明细、时间线、材料清单。",
  keywords: [
    "出国", "打工度假", "WHV", "留学", "低成本出国", "澳洲WHV", "新西兰WHV",
    "德国双元制", "日本留学", "美国实习", "WWOOF", "换宿", "出国攻略", "签证",
  ],
  authors: [{ name: "飘向远方" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "飘向远方 — 出国路径信息聚合",
    description: "人生三万天，不止三点一线。各国移民局官网信息一站式聚合。",
    url: "https://overseas-pathways.vercel.app",
    siteName: "飘向远方",
    type: "website",
    locale: "zh_CN",
  },
  alternates: {
    canonical: "https://overseas-pathways.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=ZCOOL+XiaoWei&display=swap"
          rel="stylesheet"
        />
        {/* 百度站点验证（上线后替换为你的验证码） */}
        {/* <meta name="baidu-site-verification" content="code-xxx" /> */}
      </head>
      <body className="min-h-full flex flex-col bg-earth-50 text-earth-900">
        {children}
      </body>
    </html>
  );
}
