import { memo } from "react";
import { OptimizedImage } from "~/shared/ui/components/OptimizedImage";

const CDN_HOST = process.env.CDN_HOST;

interface ProfileCellProps {
  profileUrl: string;
  employeeName: string;
}

export const ProfileCell = memo(function ProfileCell({
  profileUrl,
  employeeName,
}: ProfileCellProps) {
  // S3 key 형식에 맞춰 URL 생성
  const getFullImageUrl = (profileUrl: string) => {
    if (!profileUrl) return "/images/profile.jpg";
    if (profileUrl.startsWith("http")) return profileUrl;
    return `${CDN_HOST}${profileUrl}`;
  };

  return (
    <div className="flex items-center gap-2">
      <OptimizedImage
        src={getFullImageUrl(profileUrl)}
        alt={employeeName}
        className="rounded-full"
        width={32}
        height={32}
      />
      <span>{employeeName}</span>
    </div>
  );
});
