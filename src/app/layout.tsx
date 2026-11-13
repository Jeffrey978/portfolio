import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/ui/cursor";
import { Navbar } from "@/components/sections/navbar";

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
  title: "Jeffrey Atuluku // ServHive & Flagship Engineering Systems",
  description:
    "Engineering high-assurance marketplace architectures, local-first applications, and spatial 3D WebGL interfaces. Creator of ServHive (verified artisan escrow platform in Port Harcourt), DriftGuard, Godfrey Moves Transport, and Subnet Scout.",
  keywords: [
    "ServHive",
    "Escrow Marketplace",
    "Jeffrey Atuluku",
    "Port Harcourt",
    "Three.js",
    "Next.js 16",
    "GSAP",
    "DriftGuard",
    "Subnet Scout",
    "Godfrey Moves Transport"
  ],
  authors: [{ name: "Jeffrey Atuluku", url: "https://github.com/Jeffrey978" }],
  openGraph: {
    title: "Jeffrey Atuluku // ServHive & Flagship Engineering Systems",
    description: "Verified artisan escrow marketplace & high-assurance spatial web architectures.",
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
      <body className="min-h-screen bg-[#070709] text-[#f4f4f5] font-sans relative selection:bg-cyan-400 selection:text-black">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <div className="cyber-grid relative min-h-screen flex flex-col">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
