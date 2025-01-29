import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type {
  DashboardBirthday,
  DashboardHoliday,
  DashboardLeave,
} from "~/entities/dashboard/model";
import { Calendar } from "~/features/calendar/components/Calendar";
import { CalendarFilters } from "~/features/calendar/components/CalendarFilters";
import { useCalendarEvents } from "~/features/calendar/hooks/useCalendarEvents";
import type { CalendarEvent, LeaveStatus, LeaveType } from "~/features/calendar/types/event";
import type { BarChartData } from "~/features/chart/components/BarChart";
import { BarChart } from "~/features/chart/components/BarChart";
import {
  getDashboardBirthdays,
  getDashboardHolidays,
  getDashboardLeaves,
} from "~/features/dashboard/api/dashboard.server";
import { CalendarIcon, ChartIcon, FilterIcon } from "~/shared/ui/icons";
import { Widget } from "~/shared/ui/widgets/widget";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const dateParam = url.searchParams.get("date");
  const baseDate = dateParam ? new Date(dateParam) : new Date();
  const prevDateParam = url.searchParams.get("prevDate");

  // 이전 날짜가 있고, 한 달만 차이나는 경우에는 한 달치 데이터만 추가로 가져옴
  let startDate, endDate;

  if (prevDateParam) {
    const prevDate = new Date(prevDateParam);
    const monthDiff =
      baseDate.getMonth() +
      12 * baseDate.getFullYear() -
      (prevDate.getMonth() + 12 * prevDate.getFullYear());

    if (Math.abs(monthDiff) === 1) {
      if (monthDiff > 0) {
        startDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);
        endDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 2, 0);
      } else {
        startDate = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1);
        endDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 0);
      }
    } else {
      startDate = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1);
      endDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 2, 0);
    }
  } else {
    startDate = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1);
    endDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 2, 0);
  }

  const params = {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };

  const [leaves, birthdays, holidays] = await Promise.all([
    getDashboardLeaves(request, params),
    getDashboardBirthdays(request, params),
    getDashboardHolidays(request, params),
  ]);

  // API 응답을 Calendar 컴포넌트의 이벤트 형식으로 변환
  const events: CalendarEvent[] = [
    ...holidays?.map((holiday: DashboardHoliday) => ({
      id: `holiday-${holiday.date}`,
      title: holiday.name,
      date: new Date(holiday.date),
      status: "holiday" as LeaveStatus,
      isHoliday: true,
    })),
    ...birthdays?.map((birthday: DashboardBirthday) => {
      const currentYear = baseDate.getFullYear();
      const [month, day] = birthday.birth.split("-").map(Number);
      const birthDate = new Date(currentYear, month - 1, day);

      return {
        id: `birthday-${birthday.id}`,
        title: `${birthday.name} 생일`,
        date: birthDate,
        profileUrl: birthday.thumbnailPath || "",
        employeeName: birthday.name,
        department: birthday.department.name,
        status: "holiday" as LeaveStatus,
        isBirthday: true,
      };
    }),
    ...leaves.map((leave: DashboardLeave) => ({
      id: leave.leave.id.toString(),
      title: leave.requester.name,
      date: new Date(leave.leave.startedAt),
      profileUrl: leave.requester.thumbnailPath || "",
      employeeId: leave.requester.id.toString(),
      employeeName: leave.requester.name,
      department: leave.requester.departmentId.toString(),
      leaveType: leave.leave.type as LeaveType,
      status: "scheduled" as LeaveStatus,
      description: "",
      requestDate: new Date(leave.leave.startedAt),
    })),
  ];

  const totalEmployees = 20;

  // 차트 데이터 계산
  const leaveStats = leaves.reduce(
    (acc, leave) => {
      const type = leave.leave.type;
      if (type === "full") acc.annual++;
      else if (type === "morning") acc.morning++;
      else if (type === "afternoon") acc.afternoon++;
      return acc;
    },
    {
      annual: 0,
      morning: 0,
      afternoon: 0,
    }
  );

  const chartData: BarChartData[] = [
    {
      label: "출근",
      value: totalEmployees - (leaveStats.annual + leaveStats.morning + leaveStats.afternoon),
    },
    {
      label: "연차",
      value: leaveStats.annual,
    },
    {
      label: "오전",
      value: leaveStats.morning,
    },
    {
      label: "오후",
      value: leaveStats.afternoon,
    },
    {
      label: "기타",
      value: 0,
    },
  ];

  return json({ events, chartData, totalEmployees: 20 });
}

export default function Index() {
  const { chartData, totalEmployees } = useLoaderData<typeof loader>();
  const events = useCalendarEvents();

  const [filters, setFilters] = useState({
    showLeave: true,
    showBirthday: true,
    showHoliday: true,
  });

  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  return (
    <div className="mx-auto sm:px-4">
      <Widget>
        <div className="flex gap-4 flex-col xl:flex-row">
          <div className="flex-1">
            <h2 className="text-base flex items-center gap-2">
              <CalendarIcon />
              캘린더
            </h2>
            <Calendar events={events} filters={filters} />
          </div>
          <div className="grid grid-cols-2 xl:flex xl:flex-col gap-4 xl:w-64">
            <div>
              <h2 className="text-base flex items-center gap-2">
                <FilterIcon />
                보기
              </h2>
              <CalendarFilters filters={filters} onFilterChange={handleFilterChange} />
            </div>
            <div>
              <div className="flex justify-start items-center mb-6">
                <h2 className="text-base flex items-center gap-2 mr-2">
                  <ChartIcon />
                  현황
                </h2>
                <span className="text-sm text-gray-600">{totalEmployees}명</span>
              </div>
              <div className="h-[150px] sm:h-[200px]">
                <BarChart data={chartData} />
              </div>
            </div>
          </div>
        </div>
      </Widget>
    </div>
  );
}
