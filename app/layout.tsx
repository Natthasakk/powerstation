import type { Metadata, Viewport } from "next";
import "./globals.css";

const BASE_URL = "https://voltcore.tech";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "VoltCore | พาวเวอร์สเตชั่นพกพาระดับพรีเมียม",
    template: "%s | VoltCore",
  },
  description:
    "พาวเวอร์สเตชั่น LiFePO₄ ประสิทธิภาพสูงสำหรับการสำรองไฟที่บ้าน แคมป์ปิ้ง และงานมืออาชีพ ชาร์จเร็ว ปลอดภัย และทนทาน",
  keywords: [
    "พาวเวอร์สเตชั่นพกพา",
    "โซล่าร์เจนเนอเรเตอร์",
    "สำรองไฟบ้าน",
    "แบตเตอรี่ LiFePO4",
    "VoltCore",
  ],
  authors: [{ name: "VoltCore" }],
  creator: "VoltCore",
  publisher: "VoltCore",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "VoltCore | พลังงานสำหรับทุกการเดินทาง",
    description:
      "พาวเวอร์สเตชั่นพกพา LiFePO₄ ระดับพรีเมียม พลังงานสะอาดที่สร้างมาเพื่อทุกที่ที่คุณไป",
    url: BASE_URL,
    siteName: "VoltCore",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VoltCore พาวเวอร์สเตชั่นพกพา",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoltCore | พลังงานสำหรับทุกการเดินทาง",
    description:
      "พาวเวอร์สเตชั่นพกพา LiFePO₄ ระดับพรีเมียม พลังงานสะอาดที่สร้างมาเพื่อทุกที่ที่คุณไป",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
