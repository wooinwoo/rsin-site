const CDN_HOST = process.env.CDN_HOST;

export function getFullImageUrl(profileUrl: string | null | undefined): string {
  if (!profileUrl) return "/images/profile.jpg";
  if (profileUrl.startsWith("http")) return profileUrl;
  return `${CDN_HOST}${profileUrl}`;
}
