import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2, Tajawal } from "next/font/google";
import "./globals.css";

const baloo = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "متعة التعلم، تعلم، ألعب، واكتشف",
  description:
    "موقع تفاعلي لتعليم الأطفال الحروف العربية والأرقام، بالصوت والصورة.",
};

export const viewport: Viewport = {
  themeColor: "#14183C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${baloo.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
