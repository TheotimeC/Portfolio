import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Théotime Colinet - AI Engineer",
  description:
    "Building agentic AI systems that are observable, controllable, and useful beyond the demo.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Théotime Colinet - AI Engineer",
    description:
      "Building agentic AI systems that are observable, controllable, and useful beyond the demo.",
    siteName: "Théotime Colinet",
  },
  twitter: {
    card: "summary_large_image",
    title: "Théotime Colinet - AI Engineer",
    description:
      "Building agentic AI systems that are observable, controllable, and useful beyond the demo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
