import { Calendar } from "~/features/calendar/components/Calendar";
import { useEvents } from "~/features/calendar/hooks/useEvents";
import { Widget } from "~/shared/ui/widgets/widget";
import { BarChart } from "~/features/chart/components/BarChart";
import { CalendarEvent } from "~/features/calendar/types/event";
import { CalendarFilters } from "~/features/calendar/components/CalendarFilters";
import { CalendarIcon, FilterIcon, ChartIcon } from "~/shared/ui/icons";
import { useState } from "react";

// 예시 데이터
const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "김태완",
    date: new Date(2024, 11, 10),
    leaveType: "full",
    status: "used",
    description: "개인 사유",
    requestDate: new Date(2024, 11, 1),
    approver: "이상철",
    approvedDate: new Date(2024, 11, 2),
  },
  {
    id: "2",
    title: "김민지",
    date: new Date(2024, 11, 10),
    leaveType: "full",
    status: "used",
    description: "연차 사용",
    requestDate: new Date(2024, 11, 1),
    approver: "이상철",
    approvedDate: new Date(2024, 11, 2),
  },
  {
    id: "3",
    title: "우인우",
    date: new Date(2024, 11, 10),
    leaveType: "morning",
    status: "used",
    description: "병원 진료",
    requestDate: new Date(2024, 11, 1),
    approver: "이상철",
    approvedDate: new Date(2024, 11, 2),
  },
  {
    id: "4",
    title: "김태완",
    date: new Date(2024, 11, 20),
    leaveType: "afternoon",
    status: "scheduled",
    description: "개인 일정",
    requestDate: new Date(2024, 11, 15),
    approver: "이상철",
    approvedDate: new Date(2024, 11, 16),
  },
  {
    id: "5",
    title: "박지성",
    date: new Date(2024, 11, 20),
    leaveType: "full",
    status: "scheduled",
    description: "가족 행사",
    requestDate: new Date(2024, 11, 15),
  },
  {
    id: "6",
    title: "김태완",
    date: new Date(2024, 11, 22),
    leaveType: "full",
    status: "pendingApproval",
    description: "연말 휴가",
    requestDate: new Date(2024, 11, 18),
  },
  {
    id: "7",
    title: "이민정",
    date: new Date(2024, 11, 22),
    leaveType: "morning",
    status: "pendingApproval",
    description: "병원 검진",
    requestDate: new Date(2024, 11, 18),
  },
  {
    id: "8",
    title: "손흥민",
    date: new Date(2024, 11, 15),
    leaveType: "afternoon",
    status: "scheduled",
    description: "개인 사유",
    requestDate: new Date(2024, 11, 10),
    approver: "이상철",
    approvedDate: new Date(2024, 11, 11),
  },
];

const chartData = [
  { label: "출근", value: 16, color: "#2563eb" },
  { label: "연차", value: 2, color: "#2563eb" },
  { label: "오전", value: 1, color: "#2563eb" },
  { label: "오후", value: 1, color: "#2563eb" },
  { label: "기타", value: 0, color: "#2563eb" },
];
export default function Index() {
  const { events } = useEvents(INITIAL_EVENTS);
  const [filters, setFilters] = useState({
    showUsed: true,
    showScheduled: true,
    showPending: true,
  });

  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const totalEmployees = 20;

  return (
    <div className="mx-auto sm:px-4">
      <Widget>
        <div className="flex gap-4 flex-col xl:flex-row">
          <div className="flex-1">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <CalendarIcon />
              캘린더
            </h2>
            <Calendar events={events} filters={filters} />
          </div>
          <div className="flex flex-row xl:flex-col xl:w-64 gap-4">
            <div>
              <h2 className="text-base font-semibold flex items-center gap-2">
                <FilterIcon />
                보기
              </h2>
              <CalendarFilters filters={filters} onFilterChange={handleFilterChange} />
            </div>
            <div className="flex-1 sm:px-4 xl:p-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold flex items-center gap-2">
                  <ChartIcon />
                  근태 현황
                </h2>
                <span className="text-sm xs:block hidden text-gray-600">
                  전체 인원 : {totalEmployees}명
                </span>
              </div>
              <div className="h-[150px] sm:h-[200px] ">
                <BarChart data={chartData} />
              </div>
            </div>
          </div>
        </div>
      </Widget>
    </div>
  );
}
