import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Parisienne } from "next/font/google";
import { EVENT } from "@/lib/config";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const script = Parisienne({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
});

export const metadata: Metadata = {
  title: `${EVENT.coupleShortName} — ${EVENT.eventType}`,
  description: `Join ${EVENT.groomName} & ${EVENT.brideName} as they celebrate their engagement.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ECE3D6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${display.variable} ${serif.variable} ${script.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
