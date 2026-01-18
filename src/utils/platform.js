export function getPlatform() {
  const ua = navigator.userAgent || "";

  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}
