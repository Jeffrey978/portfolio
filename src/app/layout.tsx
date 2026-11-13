import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/ui/cursor";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atuluku Jeffrey // Web3 Researcher & Full-Stack Builder",
  description:
    "Portfolio of Atuluku Jeffrey (B.Sc. Computer Science) — Independent Web3 researcher and full-stack web builder based in Port Harcourt, Nigeria. Creator of PulseSwitch, ServHive, and decentralized AI automation engines.",
  keywords: [
    "Atuluku Jeffrey",
    "Jeffrey",
    "Web3 Researcher",
    "Full-Stack Web Builder",
    "Full-Stack Web Developer",
    "Smart Contract Security",
    "PulseSwitch",
    "ServHive",
    "Port Harcourt",
    "Bittensor",
    "Solidity",
    "Foundry",
    "Next.js 16"
  ],
  authors: [{ name: "Atuluku Jeffrey", url: "https://github.com/Jeffrey978" }],
  openGraph: {
    title: "Atuluku Jeffrey // Web3 Researcher & Full-Stack Builder",
    description: "High-assurance web applications, decentralized protocol research, and full-stack software architectures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetBrainsMono.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0a0a0a] text-[#ffffff] font-sans relative selection:bg-white selection:text-black overflow-x-hidden w-full max-w-full">
        <SmoothScrollProvider>
          <CustomCursor />
          <SiteHeader />
          <div className="pt-16 sm:pt-20 flex-1 flex flex-col min-h-[calc(100vh-5rem)] w-full max-w-full overflow-x-hidden">
            {children}
          </div>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
