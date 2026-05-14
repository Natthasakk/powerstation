"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductModel, initialModels, ModelSpec, SeoData } from "@/app/data";
import { safeJsonParse, safeImageSrc, isSafeImageUrl, validateImageFile } from "@/app/lib/safety";

type AdminSection = "products" | "hero";
type FormTab = "info" | "gallery" | "specs" | "seo";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [section, setSection] = useState<AdminSection>("products");
  const [models, setModels] = useState<ProductModel[]>(initialModels);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<ProductModel>>({});
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [activeTab, setActiveTab] = useState<FormTab>("info");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [heroImage, setHeroImage] = useState<string>("");
  const [heroImageInput, setHeroImageInput] = useState<string>("");
  const [isHeroUploading, setIsHeroUploading] = useState(false);
  const [heroSaved, setHeroSaved] = useState(false);
  const [heroError, setHeroError] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const session = sessionStorage.getItem("voltcore_admin_session");
        if (session === "true") setIsLoggedIn(true);

        const saved = localStorage.getItem("voltcore_models");
        console.log("Loading models from localStorage:", saved ? "Found data" : "No data");
        
        const parsed = safeJsonParse<ProductModel[] | null>(saved, null);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log("Parsed models:", parsed.length, "items");
          setModels(parsed);
        } else if (saved) {
          console.warn("localStorage data found but failed to parse or was empty");
        }

        const savedHero = localStorage.getItem("voltcore_hero_image");
        if (savedHero) setHeroImage(savedHero);
      } catch (e) {
        console.error("Initialization error", e);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Rexasia12345") {
      setIsLoggedIn(true);
      sessionStorage.setItem("voltcore_admin_session", "true");
      setLoginError("");
    } else {
      setLoginError("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("voltcore_admin_session");
  };

  const saveToLocal = (newModels: ProductModel[]) => {
    try {
      localStorage.setItem("voltcore_models", JSON.stringify(newModels));
      setModels(newModels);
      return true;
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
      alert("ไม่สามารถบันทึกข้อมูลลงในเครื่องได้ เนื่องจากข้อมูลมีขนาดใหญ่เกินไป (เช่น มีรูปภาพฐาน Base64 มากเกินไป) กรุณาใช้ URL รูปภาพแทนการอัพโหลดไฟล์");
      return false;
    }
  };

  const openEditor = (m: ProductModel) => {
    setEditingId(m.id);
    setFormData({ ...m, images: m.images || (m.imageUrl ? [m.imageUrl] : []) });
    setGalleryUrlInput("");
    setActiveTab("info");
    setShowForm(true);
    setSidebarOpen(false);
  };

  const openNewForm = () => {
    setEditingId(null);
    setFormData({ id: "model-" + Date.now(), specs: [], images: [] });
    setGalleryUrlInput("");
    setActiveTab("info");
    setShowForm(true);
    setSidebarOpen(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({});
    setSaveSuccess(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) {
      const filtered = models.filter((m) => m.id !== id);
      saveToLocal(filtered);
      if (editingId === id) closeForm();
    }
  };

  const handleSave = (e: React.SyntheticEvent) => {
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
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.ok) { setHeroError(validation.error); e.target.value = ""; return; }
    setIsHeroUploading(true);
    setHeroError("");
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const MAX_W = 1280, MAX_H = 720;
      let { width, height } = img;
      if (width > MAX_W) { height = Math.round(height * MAX_W / width); width = MAX_W; }
      if (height > MAX_H) { width = Math.round(width * MAX_H / height); height = MAX_H; }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);
      setHeroImage(canvas.toDataURL("image/jpeg", 0.75));
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
    if (!validation.ok) { alert(validation.error); return; }
    setUploadingIdx(index);
    try {
      const compressed = await compressImage(file);
      const images = [...(formData.images || [])];
      images[index] = compressed;
      setFormData({ ...formData, images, imageUrl: images[0] || "" });
    } catch { alert("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ"); }
    finally { setUploadingIdx(null); }
  };

  const removeGalleryImage = (index: number) => {
    const images = (formData.images || []).filter((_, i) => i !== index);
    setFormData({ ...formData, images, imageUrl: images[0] || "" });
  };

  const addGalleryImageUrl = () => {
    const url = galleryUrlInput.trim();
    if (!url) return;
    if (!isSafeImageUrl(url)) { alert("URL รูปภาพไม่ถูกต้อง ใช้ได้เฉพาะ http(s) เท่านั้น"); return; }
    const images = [...(formData.images || [])];
    if (images.length >= 5) return;
    images.push(url);
    setFormData({ ...formData, images, imageUrl: images[0] || "" });
    setGalleryUrlInput("");
  };

  const updateSeo = (field: keyof SeoData, value: string) =>
    setFormData({ ...formData, seo: { ...(formData.seo || {}), [field]: value } });

  const updateSpec = (index: number, field: keyof ModelSpec, value: string) => {
    const specs = [...(formData.specs || [])];
    specs[index] = { ...specs[index], [field]: value };
    setFormData({ ...formData, specs });
  };

  const addSpec = () =>
    setFormData({ ...formData, specs: [...(formData.specs || []), { label: "", value: "" }] });

  const removeSpec = (index: number) => {
    const specs = (formData.specs || []).filter((_, i) => i !== index);
    setFormData({ ...formData, specs });
  };

  const featuredCount = models.filter((m) => m.featured).length;

  const navItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
    {
      id: "products",
      label: "สินค้า",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: "hero",
      label: "รูป Homepage",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const tabItems: { id: FormTab; label: string }[] = [
    { id: "info", label: "ข้อมูลทั่วไป" },
    { id: "gallery", label: "รูปภาพ" },
    { id: "specs", label: "สเปค" },
    { id: "seo", label: "SEO" },
  ];

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] p-6">
        <div className="w-full max-w-[400px] overflow-hidden rounded-[32px] border border-gray-200/50 bg-white p-10 shadow-2xl shadow-black/5 backdrop-blur-xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1a432a] text-[24px] font-black text-white shadow-lg shadow-[#1a432a]/20">
              V
            </div>
            <h1 className="text-[24px] font-bold tracking-tight text-[#1d1d1f]">ยินดีต้อนรับกลับ</h1>
            <p className="mt-2 text-[14px] font-medium text-[#86868b]">กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบ</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
                placeholder="••••••••"
                required
                autoFocus
              />
              {loginError && <p className="text-[12px] font-semibold text-red-500">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#1a432a] py-4 text-[15px] font-bold text-white transition-all hover:bg-[#1a432a]/95 hover:scale-[1.02] active:scale-[0.98]"
            >
              เข้าสู่ระบบ
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <div className="mt-10 border-t border-gray-100 pt-8 text-center">
            <Link href="/" className="text-[13px] font-semibold text-[#86868b] transition-colors hover:text-[#1a432a]">
              กลับสู่หน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200/80 bg-white transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand */}
        <div className="flex h-[68px] items-center gap-3 border-b border-gray-100 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1a432a] text-[18px] font-black text-white shadow-sm">
            V
          </div>
          <div>
            <p className="text-[15px] font-bold leading-tight tracking-tight">VoltCore</p>
            <p className="text-[11px] font-medium text-[#86868b]">Admin Dashboard</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[#86868b]">จัดการ</p>
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => { setSection(item.id); setSidebarOpen(false); if (item.id !== "products") setShowForm(false); }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-all ${
                    section === item.id
                      ? "bg-[#1a432a] text-white shadow-sm"
                      : "text-[#3d3d3f] hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-[#86868b] transition-colors hover:bg-gray-100 hover:text-[#1d1d1f]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับสู่หน้าหลัก
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* ── Main wrapper ── */}
      <div className="md:pl-64">

        {/* ── Top bar ── */}
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-gray-200/80 bg-white/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 md:hidden"
              aria-label="เปิดเมนู"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-[17px] font-bold tracking-tight">
                {section === "products" ? "จัดการสินค้า" : "รูป Homepage"}
              </h1>
              <p className="hidden text-[12px] text-[#86868b] sm:block">
                {section === "products"
                  ? `${models.length} รายการ · ${featuredCount} แนะนำ`
                  : "แก้ไขรูปภาพหลักในหน้าเว็บ"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {section === "products" && !showForm && (
              <>
                <button
                  onClick={() => {
                    const data = JSON.stringify({ models, heroImage }, null, 2);
                    const blob = new Blob([data], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `voltcore-data-${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[13px] font-bold text-gray-600 transition-all hover:bg-gray-50 sm:inline-flex"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  ส่งออก (Export)
                </button>
                <label className="hidden cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-[13px] font-bold text-gray-600 transition-all hover:bg-gray-50 sm:inline-flex">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  นำเข้า (Import)
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (re) => {
                        try {
                          const content = re.target?.result as string;
                          const data = JSON.parse(content);
                          if (data.models) {
                            saveToLocal(data.models);
                            if (data.heroImage) {
                              localStorage.setItem("voltcore_hero_image", data.heroImage);
                              setHeroImage(data.heroImage);
                            }
                            alert("นำเข้าข้อมูลสำเร็จแล้ว!");
                            window.location.reload();
                          }
                        } catch (err) {
                          alert("ไฟล์ไม่ถูกต้อง กรุณาใช้ไฟล์ .json ที่ส่งออกมาจากระบบนี้เท่านั้น");
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                </label>
                <button
                  onClick={openNewForm}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1a432a] px-5 py-2 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-[#1a432a]/90 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มสินค้าใหม่
                </button>
              </>
            )}
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="p-6 lg:p-8">

          {/* ═══════════ PRODUCTS SECTION ═══════════ */}
          {section === "products" && (
            <div className="space-y-6">

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "สินค้าทั้งหมด", value: models.length, color: "text-[#0071E3]" },
                  { label: "สินค้าแนะนำ", value: featuredCount, color: "text-[#34C759]" },
                  { label: "ราคาต่ำสุด", value: models.reduce((a, m) => Math.min(a, parseInt(m.price.replace(/[^0-9]/g, "") || "0")), Infinity) === Infinity ? "–" : "฿" + models.reduce((a, m) => Math.min(a, parseInt(m.price.replace(/[^0-9]/g, "") || "0")), Infinity).toLocaleString(), color: "text-[#FF9F0A]" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">{stat.label}</p>
                    <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Product grid */}
              {!showForm && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {models.map((m) => (
                    <div
                      key={m.id}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-xl"
                    >
                      {/* Accent bar */}
                      <div className="h-1 w-full" style={{ background: m.accent || "#0071E3" }} />

                      {/* Image */}
                      <div className="relative h-44 w-full overflow-hidden bg-[#f5f5f7]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={safeImageSrc(m.imageUrl)}
                          alt={m.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {m.featured && (
                          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                            แนะนำ
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="mb-0.5 text-[13px] font-medium text-[#86868b]">{m.id}</p>
                        <h3 className="mb-1 text-[16px] font-bold leading-snug tracking-tight">{m.name}</h3>
                        <p className="mb-4 line-clamp-2 text-[13px] text-[#86868b]">{m.tagline}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-[18px] font-bold" style={{ color: m.accent || "#1d1d1f" }}>
                            {m.price}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditor(m)}
                              className="rounded-xl bg-[#f5f5f7] px-4 py-2 text-[13px] font-bold transition-colors hover:bg-gray-200"
                            >
                              แก้ไข
                            </button>
                            <button
                              onClick={() => handleDelete(m.id)}
                              aria-label={`ลบ ${m.name}`}
                              className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-400 transition-colors hover:bg-red-500 hover:text-white"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add new card */}
                  <button
                    onClick={openNewForm}
                    className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-white text-gray-300 transition-all hover:border-[#1a432a] hover:text-[#1a432a]"
                  >
                    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-[14px] font-bold">เพิ่มสินค้าใหม่</span>
                  </button>
                </div>
              )}

              {/* ── Editor panel ── */}
              {showForm && (
                <div className="rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-black/5">

                  {/* Editor header */}
                  <div className="flex items-center justify-between border-b border-gray-100 px-8 py-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={closeForm}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#86868b] transition-colors hover:bg-gray-200 hover:text-[#1d1d1f]"
                        aria-label="ปิด"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                      </button>
                      <div>
                        <h2 className="text-[18px] font-bold tracking-tight">
                          {editingId ? formData.name || "แก้ไขสินค้า" : "สร้างสินค้าใหม่"}
                        </h2>
                        {editingId && <p className="text-[12px] text-[#86868b]">{editingId}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {editingId && (
                        <button
                          type="button"
                          onClick={() => handleDelete(editingId)}
                          className="rounded-xl border border-red-200 px-4 py-2 text-[13px] font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                        >
                          ลบสินค้า
                        </button>
                      )}
                      <button
                        form="product-form"
                        type="submit"
                        className={`inline-flex items-center gap-2 rounded-xl px-6 py-2 text-[13px] font-bold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${saveSuccess ? "bg-[#34C759]" : "bg-[#1a432a]"}`}
                      >
                        {saveSuccess ? (
                          <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            บันทึกแล้ว
                          </>
                        ) : (
                          editingId ? "บันทึกการเปลี่ยนแปลง" : "สร้างสินค้า"
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 border-b border-gray-100 px-8 pt-2">
                    {tabItems.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-4 py-3 text-[14px] font-semibold transition-colors ${
                          activeTab === tab.id
                            ? "text-[#1d1d1f]"
                            : "text-[#86868b] hover:text-[#1d1d1f]"
                        }`}
                      >
                        {tab.label}
                        {activeTab === tab.id && (
                          <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#1a432a]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Form */}
                  <form id="product-form" onSubmit={handleSave}>
                    <div className="p-8">

                      {/* ── Tab: Info ── */}
                      {activeTab === "info" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Field label="ชื่อสินค้า" required>
                              <input
                                value={formData.name || ""}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={inputCls}
                                required
                              />
                            </Field>
                            <Field label="ไอดีสินค้า (Unique ID)" required>
                              <input
                                value={formData.id || ""}
                                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                className={`${inputCls} ${editingId ? "bg-gray-50 text-gray-400" : ""}`}
                                required
                                disabled={!!editingId}
                              />
                            </Field>
                            <Field label="สโลแกน (Tagline)" className="md:col-span-2">
                              <input
                                value={formData.tagline || ""}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                className={inputCls}
                              />
                            </Field>
                            <Field label="ราคา">
                              <input
                                value={formData.price || ""}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="฿29,900"
                                className={inputCls}
                              />
                            </Field>
                            <Field label="URL รูปภาพหลัก">
                              <input
                                value={formData.imageUrl || ""}
                                onChange={(e) => {
                                  const url = e.target.value;
                                  const images = [...(formData.images || [])];
                                  if (images.length === 0) images.push(url);
                                  else images[0] = url;
                                  setFormData({ ...formData, imageUrl: url, images });
                                }}
                                placeholder="https://..."
                                className={inputCls}
                              />
                            </Field>
                            <Field label="สีแบรนด์ (Accent)">
                              <div className="flex items-center gap-3">
                                <input
                                  type="color"
                                  value={formData.accent || "#000000"}
                                  onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                                  className="h-[52px] w-16 cursor-pointer overflow-hidden rounded-xl border border-gray-200 p-1"
                                />
                                <input
                                  value={formData.accent || ""}
                                  onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                                  placeholder="#0071E3"
                                  className={`${inputCls} flex-1 font-mono`}
                                />
                              </div>
                            </Field>
                          </div>

                          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Field label="ลิงก์ Shopee">
                              <div className="flex items-center gap-3">
                                <span className="flex h-[52px] w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-[#EE4D2D]/10 text-[#EE4D2D]">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm-1.5 3.5v1h-1a.5.5 0 000 1h1v5h1v-5h1a.5.5 0 000-1h-1v-1a.5.5 0 00-1 0z"/>
                                  </svg>
                                </span>
                                <input
                                  type="url"
                                  value={formData.shopeeUrl || ""}
                                  onChange={(e) => setFormData({ ...formData, shopeeUrl: e.target.value })}
                                  placeholder="https://shopee.co.th/..."
                                  className={`${inputCls} flex-1`}
                                />
                              </div>
                            </Field>
                            <Field label="ลิงก์ LINE">
                              <div className="flex items-center gap-3">
                                <span className="flex h-[52px] w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-[#06C755]/10 text-[#06C755]">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 8.5c0-2.485-2.015-4.5-4.5-4.5S7.5 8.015 7.5 10.5c0 2.224 1.56 4.08 3.664 4.436-.145.497-.475 1.553-.545 1.794-.085.298.11.294.228.213.094-.065 1.497-.988 2.104-1.393.18.025.363.038.549.038 2.485 0 4.5-2.015 4.5-4.5z"/>
                                  </svg>
                                </span>
                                <input
                                  type="url"
                                  value={formData.lineUrl || ""}
                                  onChange={(e) => setFormData({ ...formData, lineUrl: e.target.value })}
                                  placeholder="https://line.me/ti/p/@..."
                                  className={`${inputCls} flex-1`}
                                />
                              </div>
                            </Field>
                          </div>

                          <label className="flex cursor-pointer items-center gap-3">
                            <input
                              type="checkbox"
                              checked={formData.featured || false}
                              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                              className="h-5 w-5 rounded border-gray-300 text-[#1a432a] focus:ring-[#1a432a]"
                            />
                            <span className="text-[14px] font-semibold">แสดงเป็นสินค้าแนะนำ (ยอดนิยมที่สุด)</span>
                          </label>

                          {/* CTA preview */}
                          <div className="rounded-2xl border border-gray-100 bg-[#f5f5f7]/60 p-5">
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#86868b]">ตัวอย่าง CTA Button</p>
                            <div className="flex flex-wrap gap-3">
                              <div
                                className="inline-flex h-10 items-center rounded-full px-6 text-[14px] font-semibold"
                                style={{
                                  background: formData.accent || "#0071E3",
                                  color: "#fff",
                                  border: `2px solid ${formData.accent || "#0071E3"}`,
                                }}
                              >
                                {formData.name ? `สั่งซื้อ ${formData.name.replace("VoltCore ", "")}` : "ปุ่ม CTA"}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ── Tab: Gallery ── */}
                      {activeTab === "gallery" && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <p className="text-[13px] font-semibold text-[#86868b]">
                              {(formData.images || []).length} / 5 รูป — รูปแรกเป็นรูปหลัก
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            {Array.from({ length: Math.min((formData.images?.length ?? 0) + 1, 5) }).map((_, i) => {
                              const src = (formData.images || [])[i];
                              return src ? (
                                <div key={i} className="group relative h-32 w-32 overflow-hidden rounded-2xl border border-gray-100 bg-[#f5f5f7] shadow-sm">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={safeImageSrc(src)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                  {i === 0 && (
                                    <span className="absolute bottom-2 left-2 rounded-lg bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white">หลัก</span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => removeGalleryImage(i)}
                                    aria-label={`ลบรูปที่ ${i + 1}`}
                                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                  >
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <label
                                  key={i}
                                  aria-label={`อัพโหลดรูปที่ ${i + 1}`}
                                  className="relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-gray-200 bg-[#f5f5f7]/50 text-gray-300 transition-colors hover:border-[#1a432a] hover:text-[#1a432a]"
                                >
                                  {uploadingIdx === i ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1a432a] border-t-transparent" />
                                  ) : (
                                    <>
                                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                      </svg>
                                      <span className="text-[11px] font-bold">อัพโหลด</span>
                                    </>
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

                          {(formData.images?.length ?? 0) < 5 && (
                            <div className="flex gap-3">
                              <input
                                value={galleryUrlInput}
                                onChange={(e) => setGalleryUrlInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGalleryImageUrl())}
                                className={inputCls}
                                placeholder="หรือเพิ่มด้วย URL รูปภาพ..."
                              />
                              <button
                                type="button"
                                onClick={addGalleryImageUrl}
                                disabled={!galleryUrlInput.trim()}
                                className="rounded-xl bg-[#f5f5f7] px-5 text-[14px] font-bold transition-colors hover:bg-gray-200 disabled:opacity-40"
                              >
                                เพิ่ม
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* ── Tab: Specs ── */}
                      {activeTab === "specs" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-[13px] text-[#86868b]">รายละเอียดทางเทคนิค {(formData.specs || []).length} รายการ</p>
                            <button
                              type="button"
                              onClick={addSpec}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-[#f5f5f7] px-4 py-2 text-[13px] font-bold transition-colors hover:bg-gray-200"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              เพิ่มรายการ
                            </button>
                          </div>
                          <div className="space-y-3">
                            {(formData.specs || []).map((s, i) => (
                              <div key={i} className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-[#f5f5f7]/50 p-4 transition-all hover:bg-white hover:shadow-sm">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 text-[11px] font-bold text-gray-500">
                                  {i + 1}
                                </div>
                                <input
                                  placeholder="หัวข้อ เช่น น้ำหนัก"
                                  value={s.label}
                                  onChange={(e) => updateSpec(i, "label", e.target.value)}
                                  className="w-36 border-none bg-transparent text-[14px] font-bold focus:ring-0 focus:outline-none"
                                />
                                <span className="text-gray-300">·</span>
                                <input
                                  placeholder="ค่า เช่น 11.2 กก."
                                  value={s.value}
                                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                                  className="flex-1 border-none bg-transparent text-[14px] font-medium text-[#86868b] focus:ring-0 focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeSpec(i)}
                                  aria-label="ลบ"
                                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-300 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                            {(formData.specs || []).length === 0 && (
                              <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-12 text-gray-300">
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p className="text-[13px] font-semibold">ยังไม่มีสเปค กด + เพิ่มรายการ</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ── Tab: SEO ── */}
                      {activeTab === "seo" && (
                        <div className="space-y-6">
                          {/* SERP Preview */}
                          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#86868b]">ตัวอย่างใน Google</p>
                            <p className="mb-0.5 font-sans text-xs text-[#006621]">
                              yoursite.com › product › {formData.id || "product-id"}
                            </p>
                            <p className="mb-1 font-sans text-[18px] font-normal leading-snug text-[#1a0dab] hover:underline cursor-pointer">
                              {(formData.seo?.title || formData.name || "ชื่อสินค้า").slice(0, 70)}
                              {(formData.seo?.title || formData.name || "").length > 70 && "…"}
                            </p>
                            <p className="font-sans text-[14px] leading-relaxed text-[#545454]">
                              {(formData.seo?.description || formData.tagline || "รายละเอียดสินค้าของคุณจะแสดงที่นี่").slice(0, 160)}
                              {(formData.seo?.description || formData.tagline || "").length > 160 && "…"}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-5">
                            <Field label="Meta Title" hint={`${formData.seo?.title?.length ?? 0} / 60`} hintColor={(formData.seo?.title?.length ?? 0) > 60 ? "text-red-500" : (formData.seo?.title?.length ?? 0) >= 30 ? "text-green-600" : "text-yellow-500"}>
                              <input
                                value={formData.seo?.title || ""}
                                onChange={(e) => updateSeo("title", e.target.value)}
                                placeholder={`${formData.name || "ชื่อสินค้า"} | VoltCore Thailand`}
                                className={inputCls}
                              />
                              <p className="text-[11px] text-[#86868b]">แนะนำ 30–60 ตัวอักษร</p>
                            </Field>

                            <Field label="Meta Description" hint={`${formData.seo?.description?.length ?? 0} / 160`} hintColor={(formData.seo?.description?.length ?? 0) > 160 ? "text-red-500" : (formData.seo?.description?.length ?? 0) >= 120 ? "text-green-600" : "text-yellow-500"}>
                              <textarea
                                rows={3}
                                value={formData.seo?.description || ""}
                                onChange={(e) => updateSeo("description", e.target.value)}
                                placeholder="อธิบายสินค้าให้ดึงดูดคลิก..."
                                className={`${inputCls} resize-none`}
                              />
                              <p className="text-[11px] text-[#86868b]">แนะนำ 120–160 ตัวอักษร</p>
                            </Field>

                            <Field label="Keywords">
                              <input
                                value={formData.seo?.keywords || ""}
                                onChange={(e) => updateSeo("keywords", e.target.value)}
                                placeholder="แบตเตอรี่พกพา, power station, โซล่าร์เซลล์"
                                className={inputCls}
                              />
                              <p className="text-[11px] text-[#86868b]">คั่นด้วยลูกน้ำ — ใส่ 5–10 คำ</p>
                            </Field>

                            <div className="rounded-2xl border border-dashed border-gray-200 p-5 space-y-4">
                              <p className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">Open Graph (Social Sharing)</p>
                              <Field label="OG Title">
                                <input
                                  value={formData.seo?.ogTitle || ""}
                                  onChange={(e) => updateSeo("ogTitle", e.target.value)}
                                  placeholder={formData.seo?.title || formData.name || "ชื่อที่แสดงเมื่อแชร์"}
                                  className={inputCls}
                                />
                              </Field>
                              <Field label="OG Description">
                                <textarea
                                  rows={2}
                                  value={formData.seo?.ogDescription || ""}
                                  onChange={(e) => updateSeo("ogDescription", e.target.value)}
                                  placeholder="คำอธิบายที่แสดงเมื่อแชร์"
                                  className={`${inputCls} resize-none`}
                                />
                              </Field>
                            </div>

                            <Field label="Canonical URL">
                              <input
                                value={formData.seo?.canonical || ""}
                                onChange={(e) => updateSeo("canonical", e.target.value)}
                                placeholder={`https://yoursite.com/product/${formData.id || "product-id"}`}
                                className={`${inputCls} font-mono`}
                              />
                            </Field>
                          </div>
                        </div>
                      )}

                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ═══════════ HERO IMAGE SECTION ═══════════ */}
          {section === "hero" && (
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <h2 className="mb-1 text-[18px] font-bold">รูปภาพหน้า Homepage</h2>
                <p className="mb-6 text-[13px] text-[#86868b]">รูปภาพที่จะแสดงในส่วน Hero บนหน้าหลัก</p>

                {/* Preview */}
                <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-gray-100 bg-[#f5f5f7] shadow-inner">
                  {isHeroUploading ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1a432a] border-t-transparent" />
                    </div>
                  ) : heroImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={safeImageSrc(heroImage)} alt="รูป Hero" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-300">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[13px] font-semibold">ยังไม่มีรูปภาพ</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" />
                    <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-4 text-[14px] font-bold text-gray-400 transition-all hover:border-[#1a432a] hover:text-[#1a432a]">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      อัพโหลดจากเครื่อง
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">หรือใส่ URL</p>
                    <input
                      type="url"
                      value={heroImageInput}
                      onChange={(e) => {
                        const v = e.target.value;
                        setHeroImageInput(v);
                        if (v && isSafeImageUrl(v)) setHeroImage(v);
                      }}
                      className={inputCls}
                      placeholder="https://..."
                    />
                  </div>

                  {heroError && <p className="text-[13px] font-medium text-red-500">{heroError}</p>}

                  <button
                    type="button"
                    onClick={saveHeroImage}
                    disabled={!heroImage && !heroImageInput.trim()}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[15px] font-bold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 ${heroSaved ? "bg-[#34C759]" : "bg-[#1a432a]"}`}
                  >
                    {heroSaved ? (
                      <>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        บันทึกแล้ว
                      </>
                    ) : "บันทึกรูปภาพ Hero"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  hintColor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  hintColor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${className || ""}`}>
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>
        {hint && <span className={`text-[12px] font-bold ${hintColor || "text-[#86868b]"}`}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium transition-all focus:border-[#1a432a] focus:outline-none focus:ring-4 focus:ring-[#1a432a]/8";
