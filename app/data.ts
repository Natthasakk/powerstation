export type ModelSpec = {
  label: string;
  value: string;
};

export type SeoData = {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
};

export type ProductModel = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  accent: string;
  featured: boolean;
  imageUrl: string;
  images?: string[];
  specs: ModelSpec[];
  seo?: SeoData;
  ctaLabel: string;
  ctaBg: string;
  ctaText: string;
  ctaBorder: string;
  ctaHover: string;
};

export const initialModels: ProductModel[] = [
  {
    id: "lite-1000",
    name: "VoltCore Lite 1000",
    tagline: "เหมาะสำหรับการเดินทางช่วงสุดสัปดาห์และสำรองไฟมวลเบา",
    price: "฿29,900",
    accent: "#34C759",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1690192097330-f2189d2d4834?q=80&w=600&auto=format&fit=crop",
    specs: [
      { label: "ความจุ",    value: "1,024 Wh" },
      { label: "กำลังขับ AC",   value: "1,000W" },
      { label: "ชาร์จเร็ว", value: "1.5 ชม." },
      { label: "โซล่าร์อินพุต", value: "400W" },
      { label: "น้ำหนัก",      value: "11.2 กก." },
    ],
    ctaLabel: "สั่งซื้อ Lite — ฿29,900",
    ctaBg: "transparent",
    ctaText: "#34C759",
    ctaBorder: "#34C759",
    ctaHover: "",
  },
  {
    id: "pro-2000",
    name: "VoltCore Pro 2000",
    tagline: "ที่สุดของความอเนกประสงค์ สำหรับทั้งบ้านและการผจญภัย",
    price: "฿59,900",
    accent: "#0071E3",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1680513904698-1e4719262100?q=80&w=600&auto=format&fit=crop",
    specs: [
      { label: "ความจุ",    value: "2,048 Wh" },
      { label: "กำลังขับ AC",   value: "2,000W" },
      { label: "ชาร์จเร็ว", value: "1.8 ชม." },
      { label: "โซล่าร์อินพุต", value: "800W" },
      { label: "น้ำหนัก",      value: "18.2 กก." },
    ],
    ctaLabel: "สั่งซื้อ Pro — ฿59,900",
    ctaBg: "#0071E3",
    ctaText: "#fff",
    ctaBorder: "#0071E3",
    ctaHover: "",
  },
  {
    id: "max-4000",
    name: "VoltCore Max 4000",
    tagline: "สำรองไฟทั้งบ้านและไซต์งานหนักระดับมืออาชีพ",
    price: "฿109,000",
    accent: "#FF9F0A",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1697205244199-566087968504?q=80&w=600&auto=format&fit=crop",
    specs: [
      { label: "ความจุ",    value: "4,096 Wh" },
      { label: "กำลังขับ AC",   value: "4,000W" },
      { label: "ชาร์จเร็ว", value: "2.1 ชม." },
      { label: "โซล่าร์อินพุต", value: "1,600W" },
      { label: "น้ำหนัก",      value: "34.5 กก." },
    ],
    ctaLabel: "สั่งซื้อ Max — ฿109,000",
    ctaBg: "transparent",
    ctaText: "#FF9F0A",
    ctaBorder: "#FF9F0A",
    ctaHover: "",
  },
];
