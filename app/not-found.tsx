import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-white px-6 pt-[64px] text-center">
        <div className="max-w-md">
          <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-[#1a432a]">404</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-[#1d1d1f] md:text-6xl">
            ไม่พบหน้านี้
          </h1>
          <p className="mt-4 font-body text-[#86868b]">
            URL ที่คุณค้นหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่ในระบบ
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-black px-8 font-body text-[16px] font-medium text-white transition-all hover:scale-105 active:scale-95"
          >
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
