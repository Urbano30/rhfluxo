import type { Metadata } from "next";
import { Baloo_Bhaina_2 } from "next/font/google";
import "./globals.css";

const balooBhaina = Baloo_Bhaina_2({
  variable: "--font-baloo-bhaina",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rhfluxo",
  description: "Portal de RH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${balooBhaina.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
