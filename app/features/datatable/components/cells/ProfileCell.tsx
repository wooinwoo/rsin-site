import { memo } from "react";
import { OptimizedImage } from "~/shared/ui/components/OptimizedImage";
import { getFullImageUrl } from "~/shared/utils/imges";

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
      <div className="rounded-full ring-1 ring-gray-300 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
        <OptimizedImage
          src={getFullImageUrl(profileUrl)}
          alt={employeeName}
          className="rounded-full"
          width={32}
          height={32}
        />
      </div>
      <span>{employeeName}</span>
    </div>
  );
});
