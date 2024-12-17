// types/menu.ts
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
        icon: "/svg/location_away.svg",
        label: "나의 휴가",
        path: "/leaves/my",
      },
      {
        icon: "/svg/houseboat.svg",
        label: "휴가 내역",
        path: "/leaves/history",
      },
      {
        icon: "/svg/task.svg",
        label: "결재 내역",
        path: "/leaves/pending", // 여기를 다시 /leaves/pending으로 변경
        children: [
          {
            icon: "/svg/pending.svg",
            label: "결재 대기",
            path: "/leaves/pending",
          },
          {
            icon: "/svg/completed.svg",
            label: "결재 완료",
            path: "/leaves/completed",
          },
        ],
      },
    ],
  },
] as const;
