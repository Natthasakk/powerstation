import type { Metadata, Viewport } from "next";
import "./globals.css";

const BASE_URL = "https://powerstation-beta.vercel.app";

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
    default: "VoltCore | พาวเวอร์สเตชั่นพกพา LiFePO₄ สำรองไฟบ้านพรีเมียม",
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
  alternates: {
    canonical: BASE_URL,
    languages: { "th-TH": BASE_URL },
  },
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VoltCore",
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.jpg`,
  sameAs: [
    "https://lin.ee/P5C6Pez",
    "https://s.shopee.co.th/9021ZWlkjA",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: "Thai",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VoltCore",
  url: BASE_URL,
  description:
    "พาวเวอร์สเตชั่น LiFePO₄ ประสิทธิภาพสูงสำหรับการสำรองไฟที่บ้าน แคมป์ปิ้ง และงานมืออาชีพ ชาร์จเร็ว ปลอดภัย และทนทาน",
  inLanguage: "th-TH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
