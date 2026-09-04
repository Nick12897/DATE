import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DATING_CONFIG } from "@/config/dating";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: DATING_CONFIG.hero.title,
  description: DATING_CONFIG.hero.subtitle,
  openGraph: {
    title: DATING_CONFIG.hero.title,
    description: DATING_CONFIG.hero.subtitle,
    images: [
      {
        url: DATING_CONFIG.hero.avatarUrl,
        width: 800,
        height: 600,
        alt: "Dating Scheduler",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFFDF9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-romantic-200">
        <main className="min-h-screen flex flex-col items-center justify-start py-6 px-4 sm:px-6">
          <div className="w-full max-w-lg mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
