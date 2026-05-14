"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ProductModel, initialModels, socialLinks } from "@/app/data";
import { safeJsonParse, safeImageSrc } from "@/app/lib/safety";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const trustBadges = [
  { icon: "🚚", label: "จัดส่งฟรีทั่วไทย" },
  { icon: "🛡️", label: "ประกัน 5 ปี" },
  { icon: "↩️", label: "คืนสินค้าภายใน 30 วัน" },
];

const boxContents = [
  "ตัวเครื่อง VoltCore × 1",
  "สาย AC ชาร์จ × 1",
  "สายชาร์จในรถ 12V × 1",
  "สาย MC4 สำหรับโซล่าร์ × 2",
  "คู่มือการใช้งาน (TH/EN) × 1",
];

const keyFeatures = [
  {
    eyebrow: "เทคโนโลยีแบตเตอรี่",
    title: "LiFePO₄ — ปลอดภัยที่สุด",
    desc: "3,500+ รอบการใช้งาน อายุการใช้งานกว่า 10 ปี ไม่ลุกไหม้ ไม่ระเบิด ต่างจากลิเธียมทั่วไปอย่างสิ้นเชิง",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    eyebrow: "รองรับโซล่าร์เซลล์",
    title: "ชาร์จจากแสงแดดได้ตรงๆ",
    desc: "รองรับ MPPT สูงถึง 1,600W จากแผงโซล่าร์ภายนอก ชาร์จเต็มภายในวันที่มีแดดจ้าเพียง 2-3 ชั่วโมง",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    eyebrow: "การชาร์จ X-Stream",
    title: "0 → 100% ในเวลาไม่ถึง 2 ชั่วโมง",
    desc: "อัลกอริทึมชาร์จเร็ว 1,800W–3,000W ที่เป็นเอกสิทธิ์เฉพาะ ชาร์จเต็มเร็วกว่าคู่แข่งในระดับเดียวกัน",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    eyebrow: "จอ LCD อัจฉริยะ",
    title: "แสดงข้อมูลพลังงานแบบเรียลไทม์",
    desc: "ดูวัตต์เข้า-ออก อุณหภูมิแบตเตอรี่ และเวลาที่เหลือจนกว่าจะเต็มหรือหมดได้ทันที",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const socialProofByModel: Record<string, string> = {
  "lite-1000": "ขายไปแล้วกว่า 320 เครื่อง",
  "pro-2000":  "ขายไปแล้วกว่า 800 เครื่อง",
  "max-4000":  "ขายไปแล้วกว่า 150 เครื่อง",
};

export default function ProductPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";

  const [product, setProduct] = useState<ProductModel | null>(null);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [lineUrl, setLineUrl] = useState(socialLinks.line);
  const [shopeeUrl, setShopeeUrl] = useState(socialLinks.shopee);

  const ctaZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !id) return;
    let models: ProductModel[] = initialModels;
    try {
      const saved = localStorage.getItem("voltcore_models");
      const parsed = safeJsonParse<ProductModel[] | null>(saved, null);
      if (Array.isArray(parsed) && parsed.length > 0) models = parsed;
      const savedLine = localStorage.getItem("voltcore_line_url");
      if (savedLine) setLineUrl(savedLine);
      const savedShopee = localStorage.getItem("voltcore_shopee_url");
      if (savedShopee) setShopeeUrl(savedShopee);
    } catch { /* localStorage unavailable */ }
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

  useEffect(() => {
    const el = ctaZoneRef.current;
    if (!el || !product) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [product]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white" role="status" aria-live="polite">
        <p className="font-display text-xl text-[#1d1d1f]">กำลังโหลดข้อมูลสินค้า...</p>
      </div>
    );
  }

  const allImages = (product.images?.length ? product.images : product.imageUrl ? [product.imageUrl] : [])
    .map((src) => safeImageSrc(src))
    .filter(Boolean);

  const priceNumeric = (product.price || "").replace(/[^0-9]/g, "");
  const socialProof = socialProofByModel[product.id] ?? "ไว้วางใจโดยลูกค้ากว่า 1,200 คน";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="pt-[64px]">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1080px] px-6 py-6">
          <ol className="flex text-sm font-medium text-gray-400" role="list">
            <li>
              <Link href="/" className="hover:text-black">หน้าแรก</Link>
              <span className="mx-2" aria-hidden="true">/</span>
            </li>
            <li aria-current="page" className="text-[#1d1d1f]">{product.name}</li>
          </ol>
        </nav>

        {/* ── Main product grid ── */}
        <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 pb-20 md:grid-cols-2">

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
            <h1 className="mb-3 font-display text-[44px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[52px]">
              {product.name}
            </h1>

            {/* Social proof */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="h-4 w-4" fill="#FF9F0A" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[14px] font-semibold text-[#1d1d1f]">4.9</span>
              <span className="text-[13px] text-[#86868b]">·</span>
              <span className="text-[13px] text-[#86868b]">{socialProof}</span>
            </div>

            <p className="mb-8 font-body text-xl text-[#86868b]">{product.tagline}</p>

            <p className="mb-8 font-display text-[36px] font-bold" aria-label={`ราคา ${product.price}`}>
              {product.price}
            </p>

            {/* CTA zone — observed for sticky bar */}
            <div ref={ctaZoneRef} className="space-y-4">

              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <span className="text-[14px] font-bold text-[#86868b]">จำนวน</span>
                <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="ลดจำนวน"
                    className="flex h-10 w-10 items-center justify-center text-[20px] font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-black disabled:opacity-30"
                    disabled={qty <= 1}
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-[15px] font-bold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="เพิ่มจำนวน"
                    className="flex h-10 w-10 items-center justify-center text-[20px] font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Main CTA */}
              <button
                type="button"
                className="h-14 w-full rounded-full bg-black font-body text-lg font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                สั่งซื้อตอนนี้{qty > 1 ? ` (${qty} เครื่อง)` : ""}
              </button>

              {/* Channel CTAs */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={product.shopeeUrl || shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={`ซื้อ ${product.name} บน Shopee`}
                  className="flex h-12 items-center justify-center rounded-full bg-[#ee4d2d] font-body text-[15px] font-semibold text-white no-underline transition-opacity hover:opacity-90"
                >
                  Shopee
                </a>
                <a
                  href={product.lineUrl || lineUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={`สอบถาม ${product.name} ผ่าน LINE`}
                  className="flex h-12 items-center justify-center rounded-full bg-[#06C755] font-body text-[15px] font-semibold text-white no-underline transition-opacity hover:opacity-90"
                >
                  คุยทาง LINE
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {trustBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-1.5 text-[13px] font-medium text-[#86868b]">
                    <svg className="h-3.5 w-3.5 flex-shrink-0 text-[#34C759]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {b.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Specs table */}
            {((product.techSpecs?.length ?? 0) > 0 || product.specs.length > 0) && (
              <div className="mt-10 border-t border-gray-100 pt-10">
                <h2 className="mb-5 font-display text-lg font-bold">รายละเอียดทางเทคนิค</h2>
                
                {product.techSpecs && product.techSpecs.length > 0 ? (
                  <div className="space-y-8">
                    {product.techSpecs.map((section) => (
                      <div key={section.title} className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a432a]">
                          {section.title}
                        </h3>
                        <table className="w-full overflow-hidden rounded-2xl text-sm border border-gray-50">
                          <tbody>
                            {section.items.map((s, i) => (
                              <tr key={s.label} className={i % 2 === 0 ? "bg-[#f5f5f7]" : "bg-white"}>
                                <th scope="row" className="w-2/5 px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400">{s.label}</th>
                                <td className="px-5 py-3 font-semibold text-[#1d1d1f]">{s.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                ) : (
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
                )}

                {/* Usage Notes */}
                {product.usageNotes && product.usageNotes.length > 0 && (
                  <div className="mt-8 rounded-2xl bg-[#1a432a]/5 p-6 border border-[#1a432a]/10">
                    <h3 className="mb-4 text-sm font-bold text-[#1a432a]">ข้อแนะนำในการใช้งาน</h3>
                    <ul className="space-y-3">
                      {product.usageNotes.map((note, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#1d1d1f]">
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#1a432a] text-[10px] text-white">
                            {i + 1}
                          </span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Key Features ── */}
        <section className="border-t border-gray-100 bg-[#fbfbfd] px-6 py-20 md:px-10">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-12 text-center">
              <p className="mb-2 font-body text-[13px] font-bold uppercase tracking-[0.15em] text-[#1a432a]">
                ทำไมต้องเลือก VoltCore
              </p>
              <h2 className="font-display text-[36px] font-bold tracking-[-0.02em] text-[#1d1d1f] md:text-[48px]">
                สร้างมาเพื่อความทนทานระยะยาว
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {keyFeatures.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${product.accent}18`, color: product.accent }}
                  >
                    {f.icon}
                  </div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: product.accent }}>
                    {f.eyebrow}
                  </p>
                  <h3 className="mb-2 font-display text-[16px] font-bold leading-snug text-[#1d1d1f]">
                    {f.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#86868b]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What's in the box ── */}
        <section className="bg-white px-6 py-20 md:px-10">
          <div className="mx-auto max-w-[1080px]">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              {/* Text */}
              <div>
                <p className="mb-2 font-body text-[13px] font-bold uppercase tracking-[0.15em] text-[#1a432a]">
                  ในกล่องมีอะไรบ้าง
                </p>
                <h2 className="mb-8 font-display text-[36px] font-bold tracking-[-0.02em] text-[#1d1d1f] md:text-[44px]">
                  ครบชุด พร้อมใช้งานทันที
                </h2>
                <ul className="space-y-3">
                  {boxContents.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[16px] font-medium text-[#1d1d1f]">
                      <span
                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-white"
                        style={{ background: product.accent }}
                        aria-hidden="true"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item.replace("VoltCore", product.name.includes("VoltCore") ? product.name : `VoltCore ${product.name}`).replace("VoltCore VoltCore", "VoltCore")}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual: stylized box illustration */}
              <div
                className="flex aspect-square items-center justify-center rounded-[40px]"
                style={{ background: `${product.accent}10` }}
              >
                <div className="text-center">
                  <svg
                    className="mx-auto mb-4 h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: product.accent }}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="font-display text-[18px] font-bold" style={{ color: product.accent }}>
                    {product.name.replace("VoltCore ", "")}
                  </p>
                  <p className="text-[13px] font-medium text-[#86868b]">Complete Package</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cinematic ── */}
        <section className="bg-[#f5f5f7] px-6 py-24 text-center">
          <div className="mx-auto max-w-[800px]">
            <h2 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
              ออกแบบมาเพื่อสิ่งที่ไม่คาดฝัน
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-[#86868b]">
              ด้วยเทคโนโลยี LiFePO₄ ที่ปลอดภัยเป็นพิเศษและตัวเครื่องเกรดอากาศยานที่ทนทาน {product.name} ถูกออกแบบมาเพื่อเป็นพันธมิตรที่เชื่อถือได้มากที่สุดของคุณ ไม่ว่าจะอยู่นอกสถานที่หรือเผชิญกับเหตุการณ์ไฟดับที่บ้าน
            </p>
            <a
              href={product.lineUrl || lineUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex h-13 items-center rounded-full bg-[#06C755] px-8 font-body text-[16px] font-semibold text-white no-underline transition-all hover:scale-105 active:scale-95"
            >
              ปรึกษาผู้เชี่ยวชาญทาง LINE
            </a>
          </div>
        </section>

      </main>

      {/* ── Sticky Buy Bar ── */}
      <div
        role="complementary"
        aria-label="ซื้อสินค้า"
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 shadow-2xl shadow-black/10 backdrop-blur-xl transition-all duration-300 ${
          showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4 overflow-hidden">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f5f5f7]"
            >
              {allImages[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={allImages[0]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs font-bold" style={{ color: product.accent }}>V</span>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="truncate font-display text-[15px] font-bold">{product.name}</p>
              <p className="font-display text-[15px] font-bold" style={{ color: product.accent }}>
                {product.price}
              </p>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <a
              href={product.shopeeUrl || shopeeUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hidden h-10 items-center rounded-full bg-[#ee4d2d] px-5 font-body text-[14px] font-semibold text-white no-underline transition-opacity hover:opacity-90 sm:flex"
            >
              Shopee
            </a>
            <a
              href={product.lineUrl || lineUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex h-10 items-center rounded-full bg-[#06C755] px-6 font-body text-[14px] font-semibold text-white no-underline transition-all hover:scale-105 active:scale-95"
            >
              คุยทาง LINE
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
