export interface DashboardLeave {
  document: { status: string };
  leave: {
    id: number;
    type: string;
    startedAt: string;
    endedAt: string;
  };
  requester: {
    id: number;
    name: string;
    departmentId: number;
    position: string;
    thumbnailPath: string;
  };
}

export interface DashboardBirthday {
  id: number;
  name: string;
  birth: string;
  thumbnailPath: string;
  department: {
    id: number;
    name: string;
  };
}

export interface DashboardHoliday {
  name: string;
  date: string;
}

export interface GetDashboardParams {
  startDate?: string;
  endDate?: string;
}

export interface GetDashboardLeavesResponse {
  data: DashboardLeave[];
}

export interface GetDashboardBirthdaysResponse {
  data: DashboardBirthday[];
}

export interface GetDashboardHolidaysResponse {
  data: DashboardHoliday[];
}
