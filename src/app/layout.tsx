import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/ui/cursor";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

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
  title: "Jeffrey // Web3 Researcher, Security Auditor & Full-Stack Engineer",
  description:
    "Portfolio of Jeffrey (B.Sc. Computer Science) — Independent Web3 researcher, smart contract security auditor, and full-stack web developer based in Port Harcourt, Nigeria. Creator of PulseSwitch, ServHive, and decentralized AI automation engines.",
  keywords: [
    "Jeffrey",
    "Atuluku Jeffrey",
    "Smart Contract Security Auditor",
    "Web3 Researcher",
    "Full-Stack Web Developer",
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
    title: "Jeffrey // Web3 Researcher & Smart Contract Security Auditor",
    description: "High-assurance protocol audits, Web3 research, and full-stack software architectures.",
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
      <body className="min-h-screen bg-[#0a0a0a] text-[#ffffff] font-sans relative selection:bg-white selection:text-black">
        <SmoothScrollProvider>
          <CustomCursor />
          <SiteHeader />
          <div className="pt-16 sm:pt-20 flex-1 flex flex-col min-h-[calc(100vh-5rem)]">
            {children}
          </div>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
