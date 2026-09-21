import { Inter, Geist_Mono } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import { BASE_URL } from "./constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});



export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Ibad Khan | Frontend Developer",
  description:
    "Frontend developer building modern, performant web experiences with React, Next.js, and Tailwind CSS. Based in Hyderabad.",
  keywords: [
    "frontend developer",
    "react developer",
    "next.js",
    "web developer",
    "portfolio",
    "ibad khan",
    "hyderabad",
  ],
  authors: [{ name: "Ibad Khan" }],
  creator: "Ibad Khan",
  icons: {
    icon: "/ibad-fav.svg",
  },
  verification: {
    google: "googlec5f414645987388e.html",
  },
  openGraph: {
    title: "Ibad Khan | Frontend Developer",
    description:
      "Frontend developer building modern, performant web experiences with React, Next.js, and Tailwind CSS.",
    url: BASE_URL,
    siteName: "Ibad Khan Portfolio",
    locale: "en_US",
    type: "website",
  },
  openGraph: {
    title: "Ibad Khan | Frontend Developer",
    description:
      "Frontend developer building modern, performant web experiences with React, Next.js, and Tailwind CSS.",
    url: BASE_URL,
    siteName: "Ibad Khan Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/featured-image.jpg`,
        alt: "Ibad Khan portfolio preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibad Khan | Frontend Developer",
    description:
      "Frontend developer building modern, performant web experiences with React, Next.js, and Tailwind CSS.",
    images: [`${BASE_URL}/featured-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-ink" style={{ fontVariationSettings: "'cv01' 1, 'cv05' 1, 'cv09' 1, 'cv11' 1, 'ss03' 1, 'ss07' 1, 'dlig' 1" }}>
        <SmoothScroll />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}