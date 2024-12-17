export interface MenuItem {
  icon: string;
  label: string;
  path: string;
  children?: MenuItem[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

export const MENU_GROUPS: MenuGroup[] = [
  {
    label: "",
    items: [
      {
        icon: "/svg/home.svg",
        label: "홈",
        path: "/",
      },
    ],
  },
  {
    label: "휴가",
    items: [
      {
        icon: "/svg/houseboat.svg",
        label: "휴가 현황",
        path: "/leaves/management/history",
        children: [
          {
            icon: "/svg/calendar.svg",
            label: "휴가 내역",
            path: "/leaves/management/history",
          },
          {
            icon: "/svg/description.svg",
            label: "연차 현황",
            path: "/leaves/management/summary",
          },
        ],
      },
      {
        icon: "/svg/task.svg",
        label: "결재 내역",
        path: "/leaves/approval/pending",
        children: [
          {
            icon: "/svg/pending.svg",
            label: "결재 대기",
            path: "/leaves/approval/pending",
          },
          {
            icon: "/svg/completed.svg",
            label: "결재 완료",
            path: "/leaves/approval/completed",
          },
        ],
      },
    ],
  },
] as const;
