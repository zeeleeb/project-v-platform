import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "PROJECT V -- Government Accountability Through Transparency",
  description: "Interactive map of government officials, campaign finance, and investigative findings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-gray-950 text-white`}>
        <Navbar />
        <div className="pt-14">
          {children}
        </div>
      </body>
    </html>
  );
}
