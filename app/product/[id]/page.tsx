import { Metadata } from "next";
import { notFound } from "next/navigation";
import { initialModels } from "@/app/data";
import ProductClient from "./ProductClient";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  // On the server, we use the initialModels as the source of truth for SEO.
  // Changes from Admin (localStorage) are handled by the Client Component.
  return initialModels.find((m) => m.id === id);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return {};

  const title = product.seo?.title || `${product.name} | พาวเวอร์สเตชั่น VoltCore`;
  const description = product.seo?.description || product.tagline;
  const canonical = product.seo?.canonical || `https://voltcore.tech/product/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { "th-TH": canonical },
    },
    openGraph: {
      title,
      description,
      url: `https://voltcore.tech/product/${id}`,
      images: [
        {
          url: product.imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.imageUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductClient initialProduct={product} />;
}
