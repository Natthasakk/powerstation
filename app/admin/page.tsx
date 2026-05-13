"use client";
import { useEffect, useState } from "react";
import { ProductModel, initialModels, ModelSpec, SeoData } from "@/app/data";
import { safeJsonParse, safeImageSrc, isSafeImageUrl, validateImageFile } from "@/app/lib/safety";

export default function AdminPage() {
  const [models, setModels] = useState<ProductModel[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProductModel>>({});
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [seoOpen, setSeoOpen] = useState(false);

  const [heroImage, setHeroImage] = useState<string>("");
  const [heroImageInput, setHeroImageInput] = useState<string>("");
  const [isHeroUploading, setIsHeroUploading] = useState(false);
  const [heroSaved, setHeroSaved] = useState(false);
  const [heroError, setHeroError] = useState<string>("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("voltcore_models");
      const parsed = safeJsonParse<ProductModel[] | null>(saved, null);
      setModels(Array.isArray(parsed) && parsed.length > 0 ? parsed : initialModels);

      const savedHero = localStorage.getItem("voltcore_hero_image");
      const safeHero = safeImageSrc(savedHero);
      if (safeHero) {
        setHeroImage(safeHero);
        setHeroImageInput(safeHero.startsWith("data:") ? "" : safeHero);
      }
    } catch {
      setModels(initialModels);
    }
  }, []);

  const saveToLocal = (newModels: ProductModel[]) => {
    localStorage.setItem("voltcore_models", JSON.stringify(newModels));
    setModels(newModels);
  };

  const handleEdit = (m: ProductModel) => {
    setEditingId(m.id);
    setFormData({ ...m, images: m.images || (m.imageUrl ? [m.imageUrl] : []) });
    setGalleryUrlInput("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) {
      const filtered = models.filter((m) => m.id !== id);
      saveToLocal(filtered);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.name) return;

    const images = formData.images || [];
    const dataToSave: ProductModel = {
      ...(formData as ProductModel),
      images,
      imageUrl: images[0] || formData.imageUrl || "",
    };

    let updatedModels: ProductModel[];
    if (editingId) {
      updatedModels = models.map((m) => (m.id === editingId ? dataToSave : m));
    } else {
      updatedModels = [...models, dataToSave];
    }

    saveToLocal(updatedModels);
    setEditingId(null);
    setFormData({});
    setGalleryUrlInput("");
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.ok) {
      setHeroError(validation.error);
      e.target.value = "";
      return;
    }
    setIsHeroUploading(true);
    setHeroError("");

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const MAX_W = 1280;
      const MAX_H = 720;
      let { width, height } = img;
      if (width > MAX_W) { height = Math.round(height * MAX_W / width); width = MAX_W; }
      if (height > MAX_H) { width = Math.round(width * MAX_H / height); height = MAX_H; }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);

      const compressed = canvas.toDataURL("image/jpeg", 0.75);
      setHeroImage(compressed);
      setHeroImageInput("");
      setIsHeroUploading(false);
    };
    img.onerror = () => { setIsHeroUploading(false); URL.revokeObjectURL(objectUrl); };
    img.src = objectUrl;
  };

  const saveHeroImage = () => {
    const imageToSave = heroImageInput.trim() || heroImage;
    if (!imageToSave) return;
    if (!isSafeImageUrl(imageToSave)) {
      setHeroError("URL รูปภาพไม่ถูกต้อง ใช้ได้เฉพาะ http(s) หรือ data:image เท่านั้น");
      return;
    }
    setHeroError("");
    try {
      localStorage.setItem("voltcore_hero_image", imageToSave);
      setHeroImage(imageToSave);
      setHeroSaved(true);
      setTimeout(() => setHeroSaved(false), 2000);
    } catch {
      setHeroError("รูปภาพมีขนาดใหญ่เกินไป กรุณาใช้ URL แทนการอัพโหลดไฟล์");
    }
  };

  const compressImage = (file: File, maxW = 1200, maxH = 900): Promise<string> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        let { width, height } = img;
        if (width > maxW) { height = Math.round(height * maxW / width); width = maxW; }
        if (height > maxH) { width = Math.round(width * maxH / height); height = maxH; }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(); };
      img.src = objectUrl;
    });

  const handleGalleryUpload = async (file: File, index: number) => {
    const validation = validateImageFile(file);
    if (!validation.ok) {
      alert(validation.error);
      return;
    }
    setUploadingIdx(index);
    try {
      const compressed = await compressImage(file);
      const images = [...(formData.images || [])];
      images[index] = compressed;
      setFormData({ ...formData, images, imageUrl: images[0] || "" });
    } catch {
      alert("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ");
    } finally {
      setUploadingIdx(null);
    }
  };

  const removeGalleryImage = (index: number) => {
    const images = (formData.images || []).filter((_, i) => i !== index);
    setFormData({ ...formData, images, imageUrl: images[0] || "" });
  };

  const addGalleryImageUrl = () => {
    const url = galleryUrlInput.trim();
    if (!url) return;
    if (!isSafeImageUrl(url)) {
      alert("URL รูปภาพไม่ถูกต้อง ใช้ได้เฉพาะ http(s) เท่านั้น");
      return;
    }
    const images = [...(formData.images || [])];
    if (images.length >= 5) return;
    images.push(url);
    setFormData({ ...formData, images, imageUrl: images[0] || "" });
    setGalleryUrlInput("");
  };

  const updateSeo = (field: keyof SeoData, value: string) => {
    setFormData({ ...formData, seo: { ...(formData.seo || {}), [field]: value } });
  };

  const updateSpec = (index: number, field: keyof ModelSpec, value: string) => {
    const specs = [...(formData.specs || [])];
    specs[index] = { ...specs[index], [field]: value };
    setFormData({ ...formData, specs });
  };

  const addSpec = () => {
    setFormData({ ...formData, specs: [...(formData.specs || []), { label: "", value: "" }] });
  };

  const removeSpec = (index: number) => {
    const specs = (formData.specs || []).filter((_, i) => i !== index);
    setFormData({ ...formData, specs });
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-lg bg-[#1a432a] flex items-center justify-center text-white font-bold">V</div>
            <h1 className="font-display text-xl font-bold tracking-tight">VoltCore Dashboard</h1>
          </div>
          <a href="/" className="group flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#0071E3]">
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับสู่หน้าหลัก
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Hero Image Section */}
        <div className="mb-12 rounded-[32px] border border-gray-100 bg-white p-8 shadow-2xl shadow-black/5 lg:p-10">
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h2 className="font-display text-2xl font-bold tracking-tight">รูปภาพหน้า Homepage</h2>
            <p className="mt-1 text-sm text-[#86868b]">อัพโหลดหรือใส่ URL รูปภาพที่จะแสดงในส่วน Hero บนหน้าหลัก</p>
          </div>
          <div className="flex flex-wrap items-start gap-8">
            {/* Preview */}
            <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-2xl border border-gray-100 bg-[#f5f5f7] shadow-inner flex-shrink-0">
              {isHeroUploading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#0071E3] border-t-transparent" />
                </div>
              ) : heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={safeImageSrc(heroImage)} alt="พรีวิวรูปภาพ Hero" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-300">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex-1 min-w-[240px] space-y-5">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageUpload}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#f5f5f7] px-6 py-3 font-bold transition-colors hover:bg-gray-200 text-sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  อัพโหลดรูปภาพจากเครื่อง
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-[#86868b]">หรือใส่ URL รูปภาพ</p>
                <input
                  type="url"
                  value={heroImageInput}
                  onChange={(e) => {
                    const v = e.target.value;
                    setHeroImageInput(v);
                    if (v && isSafeImageUrl(v)) setHeroImage(v);
                  }}
                  className="w-full rounded-xl border border-gray-200 p-4 text-sm font-medium transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5"
                  placeholder="https://..."
                />
              </div>

              <button
                type="button"
                onClick={saveHeroImage}
                disabled={!heroImage && !heroImageInput.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#1d1d1f] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {heroSaved ? (
                  <>
                    <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    บันทึกแล้ว
                  </>
                ) : "บันทึกรูปภาพ"}
              </button>
              {heroError && (
                <p className="text-xs font-medium text-red-500">{heroError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
          
          {/* Left Column: Product Management */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight">จัดการสินค้า</h2>
                <p className="mt-2 text-sm text-[#86868b]">เพิ่ม แก้ไข หรือลบรายการสินค้าจากร้านค้าของคุณ</p>
              </div>

              <div className="space-y-4">
                {models.map((m) => (
                  <div 
                    key={m.id} 
                    onClick={() => handleEdit(m)}
                    className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 hover:border-gray-300 hover:bg-white hover:shadow-xl ${editingId === m.id ? 'border-[#0071E3] bg-white shadow-lg ring-1 ring-[#0071E3]' : 'border-gray-100 bg-gray-50/50'}`}
                  >
                    <div className="h-14 w-14 overflow-hidden rounded-xl bg-white border border-gray-100 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={safeImageSrc(m.imageUrl)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-bold">{m.name}</p>
                      <p className="text-xs font-medium text-[#86868b]">{m.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }}
                      aria-label={`ลบสินค้า ${m.name}`}
                      className="opacity-0 transition-opacity group-hover:opacity-100 h-8 w-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}

                <button 
                  onClick={() => { setEditingId(null); setFormData({ id: "model-" + Date.now(), specs: [], images: [] }); setGalleryUrlInput(""); }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-6 text-sm font-bold text-gray-400 transition-all hover:border-[#0071E3] hover:text-[#0071E3] hover:bg-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มสินค้าใหม่
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Editor Form */}
          <div className="lg:col-span-8">
            <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-2xl shadow-black/5 lg:p-12">
              <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-8">
                <h2 className="font-display text-3xl font-bold tracking-tight">
                  {editingId ? "แก้ไขรายละเอียดสินค้า" : "สร้างสินค้าใหม่"}
                </h2>
                {editingId && (
                  <button 
                    onClick={() => { setEditingId(null); setFormData({}); }}
                    className="text-sm font-bold text-[#86868b] hover:text-[#1d1d1f]"
                  >
                    ยกเลิกการแก้ไข
                  </button>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-10 text-sm">
                
                {/* Gallery Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#86868b]">รูปภาพสินค้า (สูงสุด 5 รูป)</label>
                    <span className="text-xs text-[#86868b]">{(formData.images || []).length} / 5 — รูปแรกเป็นรูปหลัก</span>
                  </div>

                  {/* Thumbnail slots */}
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: Math.min((formData.images?.length ?? 0) + 1, 5) }).map((_, i) => {
                      const src = (formData.images || [])[i];
                      return src ? (
                        <div key={i} className="group relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-[#f5f5f7]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={safeImageSrc(src)} alt={`รูปภาพสินค้าที่ ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                          {i === 0 && (
                            <span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">หลัก</span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(i)}
                            aria-label={`ลบรูปที่ ${i + 1}`}
                            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <label key={i} aria-label={`อัพโหลดรูปที่ ${i + 1}`} className="relative flex h-24 w-24 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-gray-200 bg-[#f5f5f7]/50 text-gray-300 transition-colors hover:border-[#0071E3] hover:text-[#0071E3]">
                          {uploadingIdx === i ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0071E3] border-t-transparent" />
                          ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleGalleryUpload(f, i); e.target.value = ""; }}
                          />
                        </label>
                      );
                    })}
                  </div>

                  {/* URL input */}
                  {(formData.images?.length ?? 0) < 5 && (
                    <div className="flex gap-3">
                      <input
                        value={galleryUrlInput}
                        onChange={(e) => setGalleryUrlInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGalleryImageUrl())}
                        className="flex-1 rounded-xl border border-gray-200 p-3 text-sm font-medium transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5"
                        placeholder="หรือเพิ่มด้วย URL รูปภาพ..."
                      />
                      <button
                        type="button"
                        onClick={addGalleryImageUrl}
                        disabled={!galleryUrlInput.trim()}
                        className="rounded-xl bg-[#f5f5f7] px-5 text-sm font-bold transition-colors hover:bg-gray-200 disabled:opacity-40"
                      >
                        เพิ่ม
                      </button>
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#86868b]">ชื่อสินค้า</label>
                    <input 
                      value={formData.name || ""} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 p-4 font-medium transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5" 
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#86868b]">ไอดีสินค้า (Unique ID)</label>
                    <input 
                      value={formData.id || ""} 
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 p-4 font-medium transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5 disabled:bg-gray-50 disabled:text-gray-400" 
                      required
                      disabled={!!editingId}
                    />
                  </div>
                  <div className="space-y-4 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#86868b]">สโลแกน (Tagline)</label>
                    <input 
                      value={formData.tagline || ""} 
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 p-4 font-medium transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#86868b]">ราคา</label>
                    <input 
                      value={formData.price || ""} 
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="฿29,900"
                      className="w-full rounded-xl border border-gray-200 p-4 font-medium transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#86868b]">สีเน้น (Brand Accent Hex)</label>
                    <div className="flex gap-4">
                      <input 
                        type="color"
                        value={formData.accent || "#000000"} 
                        onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                        className="h-14 w-14 cursor-pointer overflow-hidden rounded-xl border-none p-0" 
                      />
                      <input 
                        value={formData.accent || ""} 
                        onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                        className="flex-1 rounded-xl border border-gray-200 p-4 font-mono transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5" 
                        placeholder="#0071E3"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={formData.featured || false} 
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    id="featured"
                    className="h-5 w-5 rounded-lg border-gray-300 text-[#0071E3] focus:ring-[#0071E3]"
                  />
                  <label htmlFor="featured" className="text-sm font-bold">แสดงเป็น "สินค้าแนะนำ" (ยอดนิยมที่สุด)</label>
                </div>

                {/* Specs Section */}
                <div className="space-y-6 pt-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#86868b]">รายละเอียดทางเทคนิค</label>
                    <button type="button" onClick={addSpec} className="text-xs font-bold text-[#0071E3] hover:underline">+ เพิ่มรายการใหม่</button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {(formData.specs || []).map((s, i) => (
                      <div key={i} className="group relative grid grid-cols-12 gap-3 rounded-2xl border border-gray-100 bg-[#f5f5f7]/50 p-4 transition-all hover:bg-white hover:shadow-xl">
                        <div className="col-span-5 space-y-2">
                          <p className="text-[10px] font-bold uppercase text-[#86868b]">หัวข้อ</p>
                          <input 
                            placeholder="เช่น น้ำหนัก" 
                            value={s.label} 
                            onChange={(e) => updateSpec(i, "label", e.target.value)}
                            className="w-full border-none bg-transparent p-0 font-bold focus:ring-0"
                          />
                        </div>
                        <div className="col-span-6 space-y-2">
                          <p className="text-[10px] font-bold uppercase text-[#86868b]">ข้อมูล</p>
                          <input 
                            placeholder="เช่น 11.2 กก." 
                            value={s.value} 
                            onChange={(e) => updateSpec(i, "value", e.target.value)}
                            className="w-full border-none bg-transparent p-0 font-medium text-[#86868b] focus:ring-0"
                          />
                        </div>
                        <div className="col-span-1 flex items-center justify-end pt-5">
                          <button onClick={() => removeSpec(i)} type="button" aria-label="ลบรายการสเปคนี้" className="opacity-0 transition-opacity group-hover:opacity-100 text-gray-300 hover:text-red-500">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEO Section */}
                <div className="overflow-hidden rounded-2xl border border-gray-100">
                  <button
                    type="button"
                    onClick={() => setSeoOpen(!seoOpen)}
                    className="flex w-full items-center justify-between bg-[#f5f5f7] px-6 py-4 text-left transition-colors hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-[#0071E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="font-bold text-[#1d1d1f]">SEO &amp; Meta Tags</span>
                      {(formData.seo?.title || formData.seo?.description) ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700">ตั้งค่าแล้ว</span>
                      ) : (
                        <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-yellow-700">ยังไม่ตั้งค่า</span>
                      )}
                    </div>
                    <svg className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${seoOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {seoOpen && (
                    <div className="space-y-8 p-6">

                      {/* SERP Preview */}
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#86868b]">ตัวอย่างผลลัพธ์ใน Google</p>
                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                          <p className="mb-1 font-sans text-xs text-[#006621]">
                            yoursite.com › product › <span>{formData.id || "product-id"}</span>
                          </p>
                          <p className="mb-1 font-sans text-lg font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                            {(formData.seo?.title || formData.name || "ชื่อสินค้า").slice(0, 70)}
                            {(formData.seo?.title || formData.name || "").length > 70 && "…"}
                          </p>
                          <p className="font-sans text-sm leading-relaxed text-[#545454]">
                            {(formData.seo?.description || formData.tagline || "รายละเอียดสินค้าของคุณจะแสดงที่นี่ ควรมีความยาว 120–160 ตัวอักษร").slice(0, 160)}
                            {(formData.seo?.description || formData.tagline || "").length > 160 && "…"}
                          </p>
                        </div>
                      </div>

                      {/* Meta Title */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Meta Title</label>
                          <span className={`text-xs font-bold ${
                            (formData.seo?.title?.length ?? 0) > 60 ? "text-red-500" :
                            (formData.seo?.title?.length ?? 0) >= 30 ? "text-green-600" : "text-yellow-500"
                          }`}>
                            {formData.seo?.title?.length ?? 0} / 60
                          </span>
                        </div>
                        <input
                          value={formData.seo?.title || ""}
                          onChange={(e) => updateSeo("title", e.target.value)}
                          placeholder={`${formData.name || "ชื่อสินค้า"} | VoltCore Thailand`}
                          className="w-full rounded-xl border border-gray-200 p-4 font-medium transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5"
                        />
                        <p className="text-[11px] text-[#86868b]">แนะนำ 30–60 ตัวอักษร — ชื่อที่ดีควรมีชื่อสินค้าและแบรนด์</p>
                      </div>

                      {/* Meta Description */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Meta Description</label>
                          <span className={`text-xs font-bold ${
                            (formData.seo?.description?.length ?? 0) > 160 ? "text-red-500" :
                            (formData.seo?.description?.length ?? 0) >= 120 ? "text-green-600" : "text-yellow-500"
                          }`}>
                            {formData.seo?.description?.length ?? 0} / 160
                          </span>
                        </div>
                        <textarea
                          rows={3}
                          value={formData.seo?.description || ""}
                          onChange={(e) => updateSeo("description", e.target.value)}
                          placeholder={formData.tagline || "อธิบายสินค้าของคุณในแบบที่ดึงดูดให้คนคลิก รวมถึงคุณสมบัติหลักและจุดขาย"}
                          className="w-full resize-none rounded-xl border border-gray-200 p-4 font-medium leading-relaxed transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5"
                        />
                        <p className="text-[11px] text-[#86868b]">แนะนำ 120–160 ตัวอักษร — ใส่ keyword หลักและ call-to-action</p>
                      </div>

                      {/* Keywords */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Keywords</label>
                        <input
                          value={formData.seo?.keywords || ""}
                          onChange={(e) => updateSeo("keywords", e.target.value)}
                          placeholder="แบตเตอรี่พกพา, power station, โซล่าร์เซลล์, สำรองไฟ"
                          className="w-full rounded-xl border border-gray-200 p-4 font-medium transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5"
                        />
                        <p className="text-[11px] text-[#86868b]">คั่นด้วยลูกน้ำ (,) — ใส่ 5–10 คำที่เกี่ยวข้อง</p>
                      </div>

                      {/* Open Graph */}
                      <div className="space-y-4 rounded-xl border border-dashed border-gray-200 p-5">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Open Graph (Facebook / Line / Social Sharing)</p>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-[#86868b]">OG Title</label>
                            <input
                              value={formData.seo?.ogTitle || ""}
                              onChange={(e) => updateSeo("ogTitle", e.target.value)}
                              placeholder={formData.seo?.title || formData.name || "ชื่อที่แสดงเมื่อแชร์"}
                              className="w-full rounded-xl border border-gray-200 p-3 text-sm font-medium transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-[#86868b]">OG Description</label>
                            <textarea
                              rows={2}
                              value={formData.seo?.ogDescription || ""}
                              onChange={(e) => updateSeo("ogDescription", e.target.value)}
                              placeholder={formData.seo?.description || formData.tagline || "คำอธิบายที่แสดงเมื่อแชร์"}
                              className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm font-medium leading-relaxed transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Canonical URL */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Canonical URL</label>
                        <input
                          value={formData.seo?.canonical || ""}
                          onChange={(e) => updateSeo("canonical", e.target.value)}
                          placeholder={`https://yoursite.com/product/${formData.id || "product-id"}`}
                          className="w-full rounded-xl border border-gray-200 p-4 font-mono text-sm transition-all focus:border-[#0071E3] focus:outline-none focus:ring-4 focus:ring-[#0071E3]/5"
                        />
                        <p className="text-[11px] text-[#86868b]">ใส่เมื่อมีหลาย URL ที่แสดงสินค้าเดียวกัน เพื่อป้องกัน duplicate content</p>
                      </div>

                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex gap-4 pt-12">
                  <button type="submit" className="flex-1 rounded-2xl bg-black py-5 font-display text-lg font-bold text-white shadow-2xl shadow-black/20 transition-all hover:bg-[#1d1d1f] hover:scale-[1.01] active:scale-[0.99]">
                    {editingId ? "บันทึกการเปลี่ยนแปลง" : "สร้างรายการสินค้า"}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
