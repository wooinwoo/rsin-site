import { MobileCard } from "~/features/datatable/components/MobileCard";
import { TeamMemberCardProps } from "./types";
import { OptimizedImage } from "~/shared/ui/components/OptimizedImage";
import { LogoIcon } from "~/shared/ui/icons";
export function TeamMemberCard({ item, onEdit, onDelete }: TeamMemberCardProps) {
  return (
    <MobileCard
      item={item}
      renderHeader={(employee) => (
        <div className="relative p-4 bg-gradient-to-br from-gray-50 via-white to-red-50 rounded-lg shadow-sm border border-gray-100">
          {/* 배경 로고 */}
          <div className="absolute top-3 right-3 opacity-[0.1] w-24 h-24">
            <LogoIcon className="w-full h-full text-red-900" />
          </div>

          {/* 프로필 섹션 */}
          <div className="flex items-center gap-3 mb-3">
            <OptimizedImage
              src={employee.profileUrl}
              alt={employee.name}
              className="rounded-full ring-2 ring-white shadow-sm"
              width={48}
              height={48}
            />
            <div>
              <h3 className="text-base font-medium text-gray-900">{employee.name}</h3>
              <p className="text-sm text-gray-700">{employee.position}</p>
              <p className="text-xs text-gray-500">{employee.department?.name}</p>
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-red-100 my-2" />

          {/* 상세 정보 */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">사번</span>
              <span className="font-medium text-gray-900">{employee.empNo}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">입사일</span>
              <span className="font-medium text-gray-900">{employee.joinedAt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">연락처</span>
              <span className="font-medium text-gray-900">{employee.phone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">MBTI</span>
              <span className="font-medium text-gray-900">{employee.mbti}</span>
            </div>
            <div className="col-span-2 flex items-center justify-between">
              <span className="text-gray-500">이메일</span>
              <span className="font-medium text-gray-900">{employee.email}</span>
            </div>
          </div>
        </div>
      )}
    />
  );
}
