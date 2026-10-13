import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getBranding } from "@/lib/branding";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
});

const branding = getBranding();

export const metadata: Metadata = {
  title: branding.productName,
  description: branding.description,
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", type: "image/png" }
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-tenant={branding.tenant} className={poppins.variable}>
      <body className={branding.tenant === "vectra" ? poppins.className : undefined}>
        {children}
      </body>
    </html>
  );
}
