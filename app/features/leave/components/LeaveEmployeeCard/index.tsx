import { EmployeeCardProps } from "./types";
import { OptimizedImage } from "~/shared/ui/components/OptimizedImage";
import { MobileCard } from "~/features/datatable/components/MobileCard";
import { getFullImageUrl } from "~/shared/utils/imges";
import { POSITION_OPTIONS } from "~/shared/constants/options";

export function LeaveEmployeeCard({ item }: EmployeeCardProps) {
  const position = POSITION_OPTIONS.find((pos) => pos.value === item.position);

  return (
    <MobileCard
      item={item}
      renderHeader={(employee) => (
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
          {/* 프로필 및 기본 정보 */}
          <div className="flex items-center gap-2.5 mb-2">
            <OptimizedImage
              src={getFullImageUrl(employee.thumbnailPath)}
              alt={employee.name}
              className="rounded-full ring-1 ring-gray-200"
              width={36}
              height={36}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-gray-900">{employee.name}</span>
                  <span className="text-xs text-gray-500">({employee.empNo})</span>
                </div>
                <span className="text-xs text-gray-500">{position?.label || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.5 bg-[#f7f9fc] text-[#4b5563] rounded text-xs">
                  {employee.department.name}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{employee.tenure}년차</span>
                  <span>·</span>
                  <span>{employee.joinedAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 연차 정보 */}
          <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 rounded-md p-2">
            <div>
              <div className="text-xs text-gray-500">총연차</div>
              <div className="text-sm font-medium text-gray-900">{employee.leave.granted}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">사용</div>
              <div className="text-sm font-medium text-blue-600">{employee.leave.used}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">잔여</div>
              <div className="text-sm font-medium text-green-600">{employee.leave.remain}</div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
