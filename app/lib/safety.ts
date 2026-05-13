export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export function isSafeImageUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/")) return true;
  if (/^data:image\/(png|jpe?g|gif|webp|svg\+xml|avif);/i.test(trimmed)) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function safeImageSrc(url: string | undefined | null, fallback = ""): string {
  return isSafeImageUrl(url) ? (url as string).trim() : fallback;
}

export function safeJsonParse<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  try {
    const parsed = JSON.parse(json);
    return parsed as T;
  } catch {
    return fallback;
  }
}

export type FileValidationResult = { ok: true } | { ok: false; error: string };

export function validateImageFile(file: File): FileValidationResult {
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "ไฟล์ที่อัพโหลดต้องเป็นรูปภาพเท่านั้น" };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    const mb = Math.round(MAX_IMAGE_BYTES / 1024 / 1024);
    return { ok: false, error: `ไฟล์ใหญ่เกินไป สูงสุด ${mb}MB` };
  }
  return { ok: true };
}
