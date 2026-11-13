import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/ui/cursor";
import { Navbar } from "@/components/sections/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeffrey Atuluku // Creative Technologist & 3D Spatial Engineer",
  description:
    "Award-caliber 3D portfolio of Jeffrey Atuluku (@jeffrey978). Creator of ServHive, DriftGuard, Godfrey Moves Transport, and Subnet Scout. Specializing in Next.js 16, React Three Fiber, WebGL, GSAP, and Blender PBR pipelines.",
  keywords: [
    "Jeffrey Atuluku",
    "Creative Technologist",
    "Three.js Portfolio",
    "React Three Fiber",
    "Next.js 16",
    "GSAP ScrollTrigger",
    "Blender 3D",
    "ServHive",
    "DriftGuard",
    "Subnet Scout",
    "Godfrey Moves Transport"
  ],
  authors: [{ name: "Jeffrey Atuluku", url: "https://github.com/Jeffrey978" }],
  openGraph: {
    title: "Jeffrey Atuluku // 3D Spatial Engineer & Creative Technologist",
    description: "Modern 3D portfolio featuring interactive WebGL, Blender pipelines, and proof-of-work systems.",
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
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
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
