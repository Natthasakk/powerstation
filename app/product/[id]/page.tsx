"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ProductModel, initialModels } from "@/app/data";
import { safeJsonParse, safeImageSrc } from "@/app/lib/safety";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ProductPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    if (!id) return;
    let models: ProductModel[] = initialModels;
    try {
      const saved = localStorage.getItem("voltcore_models");
      const parsed = safeJsonParse<ProductModel[] | null>(saved, null);
      if (Array.isArray(parsed) && parsed.length > 0) models = parsed;
    } catch {
      // localStorage unavailable
    }
    const found = models.find((m) => m.id === id);
    if (found) {
      setProduct(found);
      setSelectedImageIdx(0);
    } else {
      setNotFoundFlag(true);
    }
  }, [id]);

  useEffect(() => {
    if (notFoundFlag) notFound();
  }, [notFoundFlag]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-black" role="status" aria-live="polite">
        <p className="font-display text-xl">กำลังโหลดข้อมูลสินค้า...</p>
      </div>
    );
  }

  const allImages = (product.images?.length ? product.images : product.imageUrl ? [product.imageUrl] : [])
    .map((src) => safeImageSrc(src))
    .filter(Boolean);

  const priceNumeric = (product.price || "").replace(/[^0-9]/g, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seo?.description || product.tagline,
    image: allImages,
    brand: { "@type": "Brand", name: "VoltCore" },
    offers: {
      "@type": "Offer",
      price: priceNumeric,
      priceCurrency: "THB",
      availability: "https://schema.org/InStock",
      url: product.seo?.canonical || `https://voltcore.tech/product/${product.id}`,
    },
  };

  return (
    <div className="bg-white text-[#1d1d1f]">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-[64px]">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1080px] px-6 py-8">
          <ol className="flex text-sm font-medium text-gray-400" role="list">
            <li>
              <Link href="/" className="hover:text-black">หน้าแรก</Link>
              <span className="mx-2" aria-hidden="true">/</span>
            </li>
            <li aria-current="page" className="text-black">{product.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 pb-24 md:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-[40px] bg-[#f5f5f7] shadow-inner">
              {allImages[selectedImageIdx] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={allImages[selectedImageIdx]}
                  alt={product.name}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
              ) : (
                <div aria-hidden="true" className="flex h-full items-center justify-center text-gray-200">
                  <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div role="tablist" aria-label="รูปภาพสินค้า" className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={selectedImageIdx === i}
                    aria-label={`ดูรูปที่ ${i + 1}`}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${selectedImageIdx === i ? "border-black opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="mb-2 font-body text-sm font-bold uppercase tracking-[0.2em] text-[#1a432a]">
              พลังงานพกพา
            </p>
            <h1 className="mb-4 font-display text-[44px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
              {product.name}
            </h1>
            <p className="mb-8 font-body text-xl text-[#86868b]">
              {product.tagline}
            </p>
            <p className="mb-10 font-display text-[32px] font-bold" aria-label={`ราคา ${product.price}`}>
              {product.price}
            </p>

            {/* CTAs */}
            <div className="mb-12 flex flex-col gap-4">
              <button
                type="button"
                className="h-14 rounded-full bg-black font-body text-lg font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                สั่งซื้อตอนนี้
              </button>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  rel="noopener noreferrer nofollow"
                  aria-label={`ซื้อ ${product.name} บน Shopee`}
                  className="flex h-14 items-center justify-center rounded-full bg-[#ee4d2d] font-body text-base font-semibold text-white no-underline transition-opacity hover:opacity-90"
                >
                  Shopee
                </a>
                <a
                  href="#"
                  rel="noopener noreferrer nofollow"
                  aria-label={`สอบถาม ${product.name} ผ่าน LINE`}
                  className="flex h-14 items-center justify-center rounded-full bg-[#06C755] font-body text-base font-semibold text-white no-underline transition-opacity hover:opacity-90"
                >
                  คุยทาง LINE
                </a>
              </div>
            </div>

            {/* Specs Table */}
            {product.specs.length > 0 && (
              <div className="border-t border-gray-100 pt-10">
                <h2 className="mb-5 font-display text-lg font-bold">รายละเอียดทางเทคนิค</h2>
                <table className="w-full overflow-hidden rounded-2xl text-sm">
                  <caption className="sr-only">ข้อมูลจำเพาะของ {product.name}</caption>
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr key={s.label} className={i % 2 === 0 ? "bg-[#f5f5f7]" : "bg-white"}>
                        <th scope="row" className="w-2/5 px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-gray-400">{s.label}</th>
                        <td className="px-5 py-3.5 font-semibold text-[#1d1d1f]">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Cinematic Section */}
        <section className="bg-[#f5f5f7] py-24 text-center">
          <div className="mx-auto max-w-[800px] px-6">
            <h2 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
              ออกแบบมาเพื่อสิ่งที่ไม่คาดฝัน
            </h2>
            <p className="font-body text-lg leading-relaxed text-[#86868b]">
              ด้วยเทคโนโลยี LiFePO₄ ที่ปลอดภัยเป็นพิเศษและตัวเครื่องเกรดอากาศยานที่ทนทาน {product.name} ถูกออกแบบมาเพื่อเป็นพันธมิตรที่เชื่อถือได้มากที่สุดของคุณ ไม่ว่าคุณจะอยู่นอกสถานที่หรือเผชิญกับเหตุการณ์ไฟดับที่บ้าน
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
