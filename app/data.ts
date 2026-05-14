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

export type TechSpecSection = {
  title: string;
  items: ModelSpec[];
};

export type ProductModel = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  accent: string;
  featured?: boolean;
  imageUrl: string;
  shopeeUrl?: string;
  lineUrl?: string;
  specs: ModelSpec[];
  techSpecs?: TechSpecSection[];
  usageNotes?: string[];
  ctaLabel?: string;
  ctaBg?: string;
  ctaText?: string;
  ctaBorder?: string;
  ctaHover?: string;
  images?: string[];
  seo?: SeoData;
};

export const socialLinks = {
  line: "https://lin.ee/P5C6Pez",
  shopee: "https://s.shopee.co.th/9021ZWlkjA?share_channel_code=6",
};

export const initialModels: ProductModel[] = [
  {
    id: "PB-AR07Pro",
    name: "PB-AR07Pro",
    tagline: "ไฟดับไม่ต้องกลัว พาวเวอร์สเตชั่นสำรองไฟบ้าน ใช้งานง่าย ปลอดภัยกว่าปั่นไฟ",
    price: "฿19,900",
    accent: "#34C759",
    featured: false,
    imageUrl: "https://webstatitic.blob.core.windows.net/picture/07.jpg",
    shopeeUrl: "https://s.shopee.co.th/9021ZWlkjA?share_channel_code=6",
    lineUrl: "https://lin.ee/P5C6Pez",
    specs: [
      {
        label: "ความจุ",
        value: "299Wh"
      },
      {
        label: "กำลังขับ AC",
        value: "600W"
      },
      {
        label: "ชาร์จเร็ว",
        value: "1 ชม."
      },
      {
        label: "น้ำหนัก",
        value: "5.6 กก."
      }
    ],
    techSpecs: [
      {
        title: "ข้อมูลทั่วไป",
        items: [
          {
            label: "ชื่อผลิตภัณฑ์ / รุ่น",
            value: "PB-AR07Pro (รหัสสินค้า: 410005)"
          },
          {
            label: "ประเภทแบตเตอรี่",
            value: "ลิเธียมไอออนฟอสเฟต (LiFePO4)"
          },
          {
            label: "ความจุแบตเตอรี่",
            value: "299Wh"
          },
          {
            label: "น้ำหนักตัวเครื่อง",
            value: "5.6 กก."
          },
          {
            label: "ขนาดตัวเครื่อง",
            value: "285 มม. x 195 มม. x 190 มม."
          },
          {
            label: "ฟังก์ชันพิเศษ",
            value: "ระบบ UPS (10ms), รองรับ Pass-through"
          },
          {
            label: "ระยะเวลาชาร์จเต็ม",
            value: "ประมาณ 1 ชั่วโมง"
          }
        ]
      },
      {
        title: "Input",
        items: [
          {
            label: "ไฟบ้าน (AC Input)",
            value: "100V 50Hz (สูงสุด 4A)"
          },
          {
            label: "โซล่าเซลล์ (Solar)",
            value: "12～60V 8.8A (สูงสุด 220W)"
          },
          {
            label: "ชาร์จผ่านรถยนต์",
            value: "รองรับทั้ง 12V และ 24V"
          }
        ]
      },
      {
        title: "Output",
        items: [
          {
            label: "ปลั๊กไฟบ้าน (AC)",
            value: "2 ช่อง: 600W (Peak 1,200W)"
          },
          {
            label: "USB-A",
            value: "รวมสูงสุด 36W (QC 3.0)"
          },
          {
            label: "USB-C (2 ช่อง)",
            value: "PD รวมสูงสุด 200W"
          },
          {
            label: "ช่องจุดบุหรี่",
            value: "12V/10A (สูงสุด 120W)"
          },
          {
            label: "ชาร์จไร้สาย",
            value: "สูงสุด 15W"
          }
        ]
      },
      {
        title: "สภาพแวดล้อมและการป้องกัน",
        items: [
          {
            label: "ระบบความปลอดภัย",
            value: "ป้องกันอุณหภูมิ, แรงดันเกิน, Short Circuit"
          },
          {
            label: "อุณหภูมิขณะชาร์จ",
            value: "0℃ ถึง +40℃"
          },
          {
            label: "อุณหภูมิขณะใช้งาน",
            value: "-10℃ ถึง +40℃"
          },
          {
            label: "ความชื้นที่รองรับ",
            value: "10% ถึง 90%Rh"
          }
        ]
      }
    ],
    usageNotes: [
      "การดูแลรักษา: หากเก็บไว้เป็นเวลานาน ควรนำมาชาร์จและคลายประจุทุกๆ 3 เดือน",
      "ประสิทธิภาพ: แนะนำให้ใช้งานในที่อุณหภูมิ 0℃ ขึ้นไปเพื่อประสิทธิภาพสูงสุด",
      "การใช้งานกับเครื่องจักร: สามารถใช้กับเครื่องเชื่อมท่อ EF หรือเครื่องต๊าปเกลียวบางรุ่นได้"
    ],
    ctaLabel: "สั่งซื้อ Lite — ฿29,900",
    ctaBg: "transparent",
    ctaText: "#34C759",
    ctaBorder: "#34C759",
    ctaHover: "",
    images: [
      "https://webstatitic.blob.core.windows.net/picture/07.jpg",
      "https://webstatitic.blob.core.windows.net/picture/Gemini_Generated_Image_3ws1nu3ws1nu3ws1.png",
      "https://webstatitic.blob.core.windows.net/picture/Gemini_Generated_Image_x81rt3x81rt3x81r.png"
    ],
    seo: {
      title: "🔋 พกไฟไปได้ทุกที่! PB-AR07Pro พาวเวอร์สเตชั่นสายแคมป์ ชาร์จไว 1 ชม.",
      description: "พาวเวอร์สเตชั่น PB-AR07Pro 600W/299Wh แบต LiFePO4 ชาร์จไวใน 1 ชม. รองรับ UPS และโซล่าเซลล์ น้ำหนักเบา พกพาสะดวก เหมาะสำหรับสายแคมป์ปิ้งและใช้งานทั่วไป",
      keywords: "Portable Power Station, พาวเวอร์สเตชั่น, พาวเวอร์สเตชั่นพกพา, แบตเตอรี่สำรองพกพา, เครื่องสำรองไฟพกพา, เครื่องปั่นไฟไร้เสียง, LiFePO4",
      ogDescription: "หมดกังวลเรื่องแบตหมดกลางป่า! PB-AR07Pro 600W/299Wh น้ำหนักเบา แบต LiFePO4 สุดทน ชาร์จไวทันใจใน 1 ชั่วโมง เพื่อนแท้ที่สาย Outdoor ต้องมี!",
      canonical: "https://voltcore.tech/product/PB-AR07Pro",
    },
  },
  {
    id: "PB-AR20Pro",
    name: "PB-AR20Pro",
    tagline: "ที่สุดของความอเนกประสงค์ สำหรับทั้งบ้านและการผจญภัย",
    price: "฿29,900",
    accent: "#0071E3",
    featured: true,
    imageUrl: "https://webstatitic.blob.core.windows.net/picture/20.jpg",
    shopeeUrl: "https://s.shopee.co.th/9021ZWlkjA?share_channel_code=6",
    lineUrl: "https://lin.ee/P5C6Pez",
    specs: [
      {
        label: "ความจุ",
        value: "1,152Wh"
      },
      {
        label: "กำลังขับ AC",
        value: "1,800W"
      },
      {
        label: "ชาร์จเร็ว",
        value: "1.5 ชม."
      },
      {
        label: "น้ำหนัก",
        value: "16.7 กก."
      }
    ],
    techSpecs: [
      {
        title: "ข้อมูลทั่วไป",
        items: [
          {
            label: "ชื่อผลิตภัณฑ์ / รุ่น",
            value: "PB-AR20Pro (รหัสสินค้า: 410015)"
          },
          {
            label: "ประเภทแบตเตอรี่",
            value: "ลิเธียมไอออนฟอสเฟต (LiFePO4)"
          },
          {
            label: "ความจุแบตเตอรี่",
            value: "1,152Wh"
          },
          {
            label: "น้ำหนักตัวเครื่อง",
            value: "16.7 กก."
          },
          {
            label: "ขนาดตัวเครื่อง",
            value: "413 มม. x 312 มม. x 265 มม."
          },
          {
            label: "ฟังก์ชันพิเศษ",
            value: "ระบบ UPS (15ms), รองรับ Pass-through"
          },
          {
            label: "ระยะเวลาชาร์จเต็ม",
            value: "ประมาณ 1.5 ชั่วโมง"
          }
        ]
      },
      {
        title: "Input",
        items: [
          {
            label: "ไฟบ้าน (AC Input)",
            value: "100～120V 50/60Hz (สูงสุด 15A)"
          },
          {
            label: "โซล่าเซลล์ (Solar)",
            value: "12～95V 13A (สูงสุด 650W)"
          },
          {
            label: "ชาร์จผ่านรถยนต์",
            value: "รองรับทั้ง 12V และ 24V"
          }
        ]
      },
      {
        title: "Output",
        items: [
          {
            label: "ปลั๊กไฟบ้าน (AC)",
            value: "4 ช่อง: 1,800W (Peak 3,000W)"
          },
          {
            label: "USB-A (ชาร์จเร็ว)",
            value: "2 ช่อง: รวมสูงสุด 36W"
          },
          {
            label: "USB-C",
            value: "PD รวมสูงสุด 200W"
          },
          {
            label: "ช่องจุดบุหรี่",
            value: "12V/10A (สูงสุด 120W)"
          },
          {
            label: "ชาร์จไร้สาย",
            value: "สูงสุด 30W"
          }
        ]
      },
      {
        title: "สภาพแวดล้อมและการป้องกัน",
        items: [
          {
            label: "ระบบความปลอดภัย",
            value: "ป้องกันอุณหภูมิ, แรงดันเกิน, Overload, Short Circuit"
          },
          {
            label: "อุณหภูมิขณะชาร์จ",
            value: "0℃ ถึง +40℃"
          },
          {
            label: "อุณหภูมิขณะใช้งาน",
            value: "-10℃ ถึง +40℃"
          },
          {
            label: "อุณหภูมิการเก็บรักษา",
            value: "-20℃ ถึง +40℃"
          }
        ]
      }
    ],
    usageNotes: [
      "การบำรุงรักษา: ควรทำการตรวจสอบการชาร์จและคลายประจุทุกๆ 3 เดือน เพื่อยืดอายุการใช้งานแบตเตอรี่",
      "อุณหภูมิ: ประสิทธิภาพการจ่ายไฟจะดีที่สุดเมื่อใช้งานในอุณหภูมิ 0℃ ขึ้นไป",
      "ความปลอดภัย: ตัวเครื่องมีระบบป้องกันความปลอดภัยครบวงจร เหมาะสำหรับงานช่างและการสำรองไฟในไซต์งาน"
    ],
    ctaLabel: "สั่งซื้อ Pro — ฿59,900",
    ctaBg: "#0071E3",
    ctaText: "#fff",
    ctaBorder: "#0071E3",
    ctaHover: "",
    images: [
      "https://webstatitic.blob.core.windows.net/picture/20.jpg"
    ],
    seo: {
      title: "พาวเวอร์สเตชั่น 1800W PB-AR20Pro ความจุ 1152Wh สำรองไฟบ้านและงานช่าง",
      description: "Portable Power Station PB-AR20Pro กำลังไฟ 1800W ความจุ 1152Wh จ่ายไฟนิ่งด้วยระบบ UPS รองรับงานช่างและเครื่องใช้ไฟฟ้าในบ้าน ชาร์จเต็มไวเพียง 1.5 ชม. ทนทานปลอดภัย",
      keywords: "สายสำรองไฟบ้าน: สำรองไฟบ้านเวลาไฟดับ, เครื่องสำรองไฟ CPAP, พาวเวอร์สเตชั่นใช้ในบ้าน",
      ogTitle: "ไฟดับก็ไม่หวั่น! PB-AR20Pro พาวเวอร์สเตชั่น 1800W สำรองไฟบ้านและงานช่าง",
      ogDescription: "พลังงานสำรองระดับมืออาชีพ ความจุ 1152Wh พร้อมระบบ UPS สลับไฟไวใน 15ms รองรับเครื่องใช้ไฟฟ้าหลากหลาย ชาร์จไว ปลอดภัย ทนทาน ใช้งานได้ยาวนาน",
      canonical: "https://voltcore.tech/product/PB-AR20Pro",
    },
  },
  {
    id: "PB-AR26Pro",
    name: "PB-AR26Pro",
    tagline: "สำรองไฟทั้งบ้านและไซต์งานหนักระดับมืออาชีพ",
    price: "฿44,900",
    accent: "#FF9F0A",
    featured: false,
    imageUrl: "https://webstatitic.blob.core.windows.net/picture/26.jpg",
    shopeeUrl: "https://s.shopee.co.th/9021ZWlkjA?share_channel_code=6",
    lineUrl: "https://lin.ee/P5C6Pez",
    specs: [
      {
        label: "ความจุ",
        value: "2,016Wh"
      },
      {
        label: "กำลังขับ AC",
        value: "2,500W"
      },
      {
        label: "ชาร์จเร็ว",
        value: "3 ชม."
      },
      {
        label: "น้ำหนัก",
        value: "27 กก."
      }
    ],
    techSpecs: [
      {
        title: "ข้อมูลทั่วไป",
        items: [
          {
            label: "ชื่อผลิตภัณฑ์ / รุ่น",
            value: "PB-AR26Pro (รหัสสินค้า: 410025)"
          },
          {
            label: "ประเภทแบตเตอรี่",
            value: "ลิเธียมไอออนฟอสเฟต (LiFePO4)"
          },
          {
            label: "ความจุแบตเตอรี่",
            value: "2,016Wh"
          },
          {
            label: "น้ำหนักตัวเครื่อง",
            value: "27 กก."
          },
          {
            label: "ขนาดตัวเครื่อง",
            value: "450 มม. x 360 มม. x 346 มม."
          },
          {
            label: "ฟังก์ชันพิเศษ",
            value: "ระบบ UPS (15ms), รองรับ Pass-through"
          },
          {
            label: "ระยะเวลาชาร์จเต็ม",
            value: "ประมาณ 3 ชั่วโมง"
          }
        ]
      },
      {
        title: "Input",
        items: [
          {
            label: "ไฟบ้าน (AC Input)",
            value: "100～150V 50/60Hz (สูงสุด 15A)"
          },
          {
            label: "โซล่าเซลล์ (Solar)",
            value: "12～150V 13A (สูงสุด 1,000W)"
          },
          {
            label: "ชาร์จผ่านรถยนต์",
            value: "รองรับทั้ง 12V และ 24V"
          }
        ]
      },
      {
        title: "Output",
        items: [
          {
            label: "ปลั๊กไฟบ้าน (AC)",
            value: "4 ช่อง: 2,500W (Peak 4,000W)"
          },
          {
            label: "USB-A (ชาร์จเร็ว)",
            value: "2 ช่อง: รวมสูงสุด 36W"
          },
          {
            label: "USB-C",
            value: "PD รวมสูงสุด 200W"
          },
          {
            label: "ช่องจุดบุหรี่",
            value: "12V/10A (สูงสุด 120W)"
          },
          {
            label: "DC5525",
            value: "2 ช่อง: 12V/5A"
          }
        ]
      },
      {
        title: "สภาพแวดล้อมและการป้องกัน",
        items: [
          {
            label: "ระบบความปลอดภัย",
            value: "ป้องกันอุณหภูมิ, แรงดันเกิน, Overload, Short Circuit"
          },
          {
            label: "อุณหภูมิขณะชาร์จ",
            value: "0℃ ถึง +40℃"
          },
          {
            label: "อุณหภูมิขณะใช้งาน",
            value: "-10℃ ถึง +40℃"
          },
          {
            label: "ความชื้นที่รองรับ",
            value: "10% ถึง 90%Rh"
          }
        ]
      }
    ],
    usageNotes: [
      "การเก็บรักษา: หากไม่ได้ใช้งานนาน ควรนำออกมาทดสอบชาร์จและคายประจุอย่างน้อยทุกๆ 3 เดือน",
      "อุณหภูมิ: ระบบป้องกันจะทำงานตามอุณหภูมิภายในตัวเครื่อง ควรหลีกเลี่ยงที่ร้อนหรือเย็นจัด",
      "การใช้งานในที่เย็น: สามารถใช้งานได้ถึง -10℃ แต่แนะนำที่ 0℃ ขึ้นไปเพื่อประสิทธิภาพสูงสุด",
      "คำแนะนำ: การรักษาระดับไฟที่ 20% - 80% ระหว่างการเก็บรักษาจะช่วยยืดอายุแบตเตอรี่ได้ดีที่สุด"
    ],
    ctaLabel: "สั่งซื้อ Max — ฿109,000",
    ctaBg: "transparent",
    ctaText: "#FF9F0A",
    ctaBorder: "#FF9F0A",
    ctaHover: "",
    images: [
      "https://webstatitic.blob.core.windows.net/picture/26.jpg"
    ],
    seo: {
      title: "PB-AR26Pro Portable Power Station 2500W/2016Wh พลังงานสำรองระดับโปร",
      description: "รุ่นท็อป PB-AR26Pro พาวเวอร์สเตชั่น 2500W ความจุสูง 2016Wh แบตอึดจุใจ รองรับโซล่าเซลล์ 1000W จ่ายไฟแรงสำหรับเครื่องจักรและอุปกรณ์มืออาชีพ พร้อมระบบความปลอดภัยครบชุด",
      keywords: "สายงานช่าง/นอกสถานที่: พลังงานสำรองงานช่าง, พาวเวอร์สเตชั่นใช้กับเครื่องต๊าป, แหล่งจ่ายไฟนอกสถานที่",
      ogTitle: "⚡ แรงสุดในรุ่น! PB-AR26Pro พาวเวอร์สเตชั่น 2500W จุใจ 2016Wh",
      ogDescription: "จัดเต็มพลังงานสะอาดสำหรับงานหนักและไซต์งาน! รองรับโซล่าเซลล์สูงสุด 1000W จ่ายไฟแรง 2500W ชาร์จโน้ตบุ๊ก เครื่องมือช่าง หรือสำรองไฟบ้านได้แบบจุใจ",
      canonical: "https://voltcore.tech/product/PB-AR26Pro",
    },
  }
];
