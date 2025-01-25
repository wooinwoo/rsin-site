import { Modal } from "~/shared/ui/components/Modal";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { useState, useEffect, useMemo } from "react";
import { useFetcher } from "@remix-run/react";
import type { ProrateSimulationResponse, AnnualSimulationResponse } from "~/entities/leave/model";
import { Loading } from "~/shared/ui/components/Loading";
import { Badge } from "~/shared/ui/components/Badge";
import { addMonths, setDate, getDaysInMonth } from "date-fns";

function calculateMonthlyLeave(
  prorateData: ProrateSimulationResponse | null | undefined,
  joinedAt: string | undefined
) {
  if (!prorateData || !joinedAt) return null;

  const monthlyLeaves = [];
  const joinedDate = new Date(joinedAt);
  const joinedDay = joinedDate.getDate();

  let startDate = new Date(joinedDate);
  startDate.setFullYear(startDate.getFullYear() - 1);

  for (let i = 1; i <= 12; i++) {
    const baseDate = addMonths(startDate, i);
    const daysInMonth = getDaysInMonth(baseDate);

    const grantDay = daysInMonth < joinedDay ? daysInMonth : joinedDay;
    const grantDate = setDate(baseDate, grantDay);

    monthlyLeaves.push({
      grantAt: grantDate.toISOString().split("T")[0],
      granted: true,
      isMonthly: i < 12,
      amount: i === 12 ? prorateData.amount : 1,
    });
  }

  return monthlyLeaves;
}
interface LeaveSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  joinedAt?: string;
}

export function LeaveSimulatorModal({ isOpen, onClose, joinedAt }: LeaveSimulatorModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<"monthly" | "annual">("monthly");
  const prorateSimFetcher = useFetcher<ProrateSimulationResponse>();
  const annualSimFetcher = useFetcher<AnnualSimulationResponse>();

  const isLoading = prorateSimFetcher.state === "loading" || annualSimFetcher.state === "loading";
  const monthlyLeaves = useMemo(
    () => calculateMonthlyLeave(prorateSimFetcher.data, selectedDate?.toISOString()),
    [prorateSimFetcher.data, selectedDate]
  );
  const annualLeaves = useMemo(() => annualSimFetcher.data, [annualSimFetcher.data]);

  // 모달 상태와 날짜 관리를 위한 useEffect
  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(null);
      return;
    }
    if (joinedAt) {
      setSelectedDate(new Date(joinedAt));
    }
  }, [isOpen, joinedAt]);

  // API 요청 관리를 위한 useEffect
  useEffect(() => {
    if (selectedDate && !isLoading) {
      const dateString = selectedDate.toISOString().split("T")[0].replace(/-/g, "");
      prorateSimFetcher.load(`/resources/leave-simulator?type=prorate&joinedAt=${dateString}`);
      annualSimFetcher.load(`/resources/leave-simulator?type=annual&joinedAt=${dateString}`);
    }
  }, [selectedDate]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="연차 시뮬레이터">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <Loading />
          </div>
        )}

        {/* 입사일 선택 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1.5">입사일</label>
          <DatePicker
            isRange={false}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date as Date | null)}
            className="w-full"
            required={false}
            disabled={false}
            excludeWeekends={false}
          />
        </div>

        <div className="space-y-4">
          {/* 비례연차 요약 */}
          {prorateSimFetcher.data && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-sm font-medium mb-2">비례연차 부여 예정</div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{prorateSimFetcher.data.grantAt} 기준</span>
                <span className="text-lg font-semibold text-blue-600">
                  {prorateSimFetcher.data.amount}일
                </span>
              </div>
            </div>
          )}

          {/* 월차 & 연차 상세 */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex border-b">
              <button
                className={`flex-1 px-4 py-2.5 text-sm font-medium border-b-2 ${
                  activeTab === "monthly"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("monthly")}
              >
                월차 내역
              </button>
              <button
                className={`flex-1 px-4 py-2.5 text-sm font-medium border-b-2 ${
                  activeTab === "annual"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("annual")}
              >
                연차 내역
              </button>
            </div>

            <div className="max-h-[280px] overflow-y-auto">
              {activeTab === "monthly" && monthlyLeaves && (
                <div className="p-4 space-y-2">
                  {monthlyLeaves.map((item, index) => (
                    <div
                      key={item.grantAt}
                      className={`p-3 rounded-lg border ${
                        item.isMonthly ? "border-gray-200" : "border-blue-200 bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="text-sm font-medium">
                            {item.isMonthly ? `${index + 1}개월차` : "1년 차"}
                          </div>
                          <div className="text-sm text-gray-500">{item.grantAt}</div>
                        </div>
                        <Badge
                          className={`${
                            item.isMonthly
                              ? "bg-blue-100 text-blue-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {item.isMonthly ? "1일" : `${item.amount}일`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "annual" && annualLeaves && (
                <div className="p-4 space-y-2">
                  {annualLeaves.map((item) => (
                    <div key={item.grantAt} className="p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm text-gray-500">{item.grantAt}</div>
                        <Badge className="bg-blue-100 text-blue-700">{item.amount}일</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
