import type { Metadata } from "next";
import { initialModels } from "@/app/data";
import { isSafeImageUrl } from "@/app/lib/safety";

const BASE_URL = "https://powerstation-beta.vercel.app";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return initialModels.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = initialModels.find((m) => m.id === id);

  if (!product) {
    return {
      title: "ไม่พบสินค้า | VoltCore",
      robots: { index: false, follow: false },
    };
  }

  const seo = product.seo || {};
  const title = seo.title || `${product.name} | VoltCore Thailand`;
  const description = seo.description || product.tagline;
  const rawImage = product.images?.[0] || product.imageUrl;
  const image = isSafeImageUrl(rawImage) ? rawImage : undefined;
  const url = seo.canonical || `${BASE_URL}/product/${id}`;

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
      languages: { "th-TH": url },
    },
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url,
      siteName: "VoltCore",
      images: image ? [{ url: image, alt: product.name }] : undefined,
      locale: "th_TH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: image ? [image] : undefined,
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
