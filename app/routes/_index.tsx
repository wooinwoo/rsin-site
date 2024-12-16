import { Calendar } from "~/features/calendar/components/Calendar";
import { useEvents } from "~/features/calendar/hooks/useEvents";
import { CalendarEvent } from "~/features/calendar/types/event";
import { Widget } from "~/shared/ui/widgets/widget";
import { BarChart } from "~/features/chart/components/BarChart";

// 예시 데이터
const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "김태완",
    date: new Date(2024, 11, 10), // 12월 10일
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
  { label: "오전반차", value: 1, color: "#2563eb" },
  { label: "오후반차", value: 1, color: "#2563eb" },
  { label: "기타", value: 0, color: "#2563eb" },
];
export default function Index() {
  const { events } = useEvents(INITIAL_EVENTS);

  return (
    <div className="mx-auto sm:px-4">
      <Widget>
        <Calendar events={events} />
        <BarChart data={chartData} height={300} />
      </Widget>
    </div>
  );
}
