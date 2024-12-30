import { memo } from "react";
import { OptimizedImage } from "~/shared/ui/components/OptimizedImage";

interface ProfileCellProps {
  profileUrl: string;
  employeeName: string;
}

export const ProfileCell = memo(function ProfileCell({
  profileUrl,
  employeeName,
}: ProfileCellProps) {
  return (
    <div className="flex items-center gap-2">
      <OptimizedImage
        src={profileUrl}
        alt={employeeName}
        className="rounded-full"
        width={32}
        height={32}
      />
      <span>{employeeName}</span>
    </div>
  );
});
