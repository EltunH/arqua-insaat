import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARQUA Design & Build",
  description:
    "Premium architecture, interior design and construction. Spaces beyond expectations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
