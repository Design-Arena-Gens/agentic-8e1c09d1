import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "نوآموز خودکار",
  description:
    "یک همیار وبی که مثل یک کودک کنجکاو از منابع آموزشی یاد می‌گیرد و رشد می‌کند.",
  metadataBase: new URL("https://agentic-8e1c09d1.vercel.app"),
  openGraph: {
    title: "نوآموز خودکار",
    description:
      "مسیر رشد یک یادگیرنده خودکار را ببینید؛ از کنجکاوی تا ساخت پروژه‌های نوآورانه.",
    url: "https://agentic-8e1c09d1.vercel.app",
    siteName: "نوآموز خودکار",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
