import { Calendar } from "~/features/calendar/components/Calendar";
import { useEvents } from "~/features/calendar/hooks/useEvents";

// 예시 데이터
const INITIAL_EVENTS = [
  {
    id: "1",
    title: "휴가",
    date: new Date(2024, 2, 15), // 3월 15일
    color: "blue",
  },
  {
    id: "2",
    title: "반차",
    date: new Date(2024, 2, 20), // 3월 20일
    color: "green",
  },
  {
    id: "3",
    title: "연차",
    date: new Date(2024, 2, 22), // 3월 22일
    color: "purple",
  },
];
export default function Index() {
  const { events, addEvent, removeEvent } = useEvents(INITIAL_EVENTS);

  return (
    <div className="container mx-auto p-4">
      <Calendar events={events} />

      {/* 일정 추가 예시 버튼 */}
      <button
        onClick={() => {
          addEvent({
            title: "새 휴가",
            date: new Date(),
            color: "red",
          });
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        오늘 일정 추가
      </button>
    </div>
  );
}
