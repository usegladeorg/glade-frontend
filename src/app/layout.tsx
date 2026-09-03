import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Display face: a soft, organic old-style serif for headlines and numbers.
// Its SOFT axis rounds the terminals like leaves; WONK adds a little play
// to italics.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body face for running text, labels and interface copy.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glade: Private banking built for people and their AI agents",
  description:
    "Glade is a non-custodial neobank on Robinhood Chain and the money layer for the agent economy. Transfers are encrypted from the start, blocks settle every 100ms, and AI agents run their own accounts inside spend limits you set. Confidential out of the box, provable whenever it counts.",
  openGraph: {
    title: "Glade: Private banking built for people and their AI agents",
    description:
      "Glade is a non-custodial neobank on Robinhood Chain and the money layer for the agent economy. Transfers are encrypted from the start, blocks settle every 100ms, and AI agents run their own accounts inside spend limits you set. Confidential out of the box, provable whenever it counts.",
    url: "https://useglade.org",
    siteName: "Glade",
    type: "website",
    images: [
      {
        url: "https://useglade.org/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Glade: Private banking built for people and their AI agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@usegladeorg",
    creator: "@usegladeorg",
    title: "Glade: Private banking built for people and their AI agents",
    description:
      "Glade is a non-custodial neobank on Robinhood Chain and the money layer for the agent economy. Transfers are encrypted from the start, blocks settle every 100ms, and AI agents run their own accounts inside spend limits you set. Confidential out of the box, provable whenever it counts.",
    images: ["https://useglade.org/images/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
