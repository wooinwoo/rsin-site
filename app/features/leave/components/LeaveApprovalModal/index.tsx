import { Modal } from "~/shared/ui/components/Modal";
import { Button } from "~/shared/ui/components/Button";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { LeaveApprovalData, LeaveApprovalModalProps } from "./types";
export function LeaveApprovalModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
}: LeaveApprovalModalProps) {
  // 예시 데이터
  const data: LeaveApprovalData = {
    applicant: {
      name: "우인우",
      department: "개발팀",
      profileImage: "/images/profile.jpg",
    },
    appliedAt: "2024-11-06T14:08:00",
    approvalSteps: [
      { step: 1, approver: { name: "김태완", position: "매니저" }, status: "waiting" },
      { step: 2, approver: { name: "이형진", position: "팀장" }, status: "pending" },
      { step: 3, approver: { name: "김지해", position: "이사" }, status: "pending" },
    ],
    leaveType: "연차휴가",
    period: {
      startDate: "2024-11-10",
      endDate: "2024-11-10",
    },
    duration: 1,
    reason: "개인 사유로 인한 휴가 신청입니다.",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="휴가 승인">
      {/* 신청자 정보 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">신청자</span>
          <div className="text-sm text-gray-600">
            {format(new Date(data.appliedAt), "yyyy.MM.dd(EEE) HH:mm", { locale: ko })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            {data.applicant.profileImage && (
              <img
                src={data.applicant.profileImage}
                alt={data.applicant.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <div className="">{data.applicant.name}</div>
            <div className="text-sm text-gray-600">{data.applicant.department}</div>
          </div>
        </div>
      </div>

      {/* 승인 단계 */}
      <div className="mb-6">
        <div className="mb-3 text-sm font-medium">승인단계</div>
        <div className="space-y-2 mb-6">
          {data.approvalSteps.map((step) => (
            <div
              key={step.step}
              className={`
          rounded-lg p-4 flex items-center justify-between
          ${
            step.status === "waiting"
              ? "border border-gray-200"
              : "border border-gray-100 bg-gray-50" // 비활성화 시 배경색과 테두리 색상 변경
          }
        `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
              w-6 h-6 rounded-full flex items-center justify-center text-sm
              ${
                step.status === "waiting" ? "bg-red-500 text-white" : "bg-gray-300 text-gray-500" // 비활성화 시 더 어두운 회색
              }
            `}
                >
                  {step.step}
                </div>
                <div
                  className={`
              ${
                step.status === "waiting" ? "text-gray-900" : "text-gray-400" // 비활성화 시 더 밝은 텍스트
              }
            `}
                >
                  {step.approver.name} {step.approver.position}
                </div>
              </div>
              <div
                className={`
            text-sm
            ${
              step.status === "waiting" ? "text-red-500" : "text-gray-400" // 비활성화 시 더 밝은 텍스트
            }
          `}
              >
                {step.status === "waiting" ? "승인대기" : "대기중"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 내용 */}
      <div className="mb-6">
        <div className="mb-3 text-sm font-medium">상세내용</div>
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className=" mb-2">{data.leaveType}</div>
              <div className="text-sm text-gray-600">
                {format(new Date(data.period.startDate), "yyyy.MM.dd(EEE)", { locale: ko })}
                {data.period.startDate !== data.period.endDate &&
                  ` - ${format(new Date(data.period.endDate), "yyyy.MM.dd(EEE)", { locale: ko })}`}
              </div>
            </div>
            <div className="text-sm flex items-center gap-1">
              <span className="text-red-500 text-xl ">{data.duration}</span>일
            </div>
          </div>
        </div>
      </div>

      {/* 사유 */}
      <div className="mb-6">
        <div className=" mb-3 text-sm font-medium">사유</div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-gray-600 whitespace-pre-wrap">{data.reason}</div>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onReject} size="md">
          반려
        </Button>
        <Button type="button" variant="red" onClick={onApprove} size="md">
          승인
        </Button>
      </div>
    </Modal>
  );
}
