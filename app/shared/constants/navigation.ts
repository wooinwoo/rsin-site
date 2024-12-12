// types/menu.ts
interface MenuItem {
  icon: string;
  label: string;
  path: string;
  children?: MenuItem[]; // 서브메뉴 추가
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

// constants/menu.ts
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
        label: "승인 내역",
        path: "/leaves/approval",
        children: [
          {
            icon: "/svg/pending.svg",
            label: "대기 중",
            path: "/leaves/approval/pending",
          },
          {
            icon: "/svg/completed.svg",
            label: "처리 완료",
            path: "/leaves/approval/completed",
          },
        ],
      },
    ],
  },
] as const;
