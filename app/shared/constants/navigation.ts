import { FC } from "react";
import { IconProps } from "~/shared/ui/icons/types";

import { HomeIcon, HouseboatIcon, ProfileIcon, TaskIcon } from "~/shared/ui/icons";
export interface MenuItem {
  icon: FC<IconProps> | string;
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
        icon: HomeIcon,
        label: "홈",
        path: "/",
      },
    ],
  },
  {
    label: "휴가",
    items: [
      {
        icon: HouseboatIcon,
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
        icon: TaskIcon,
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
  {
    label: "팀원",
    items: [
      {
        icon: ProfileIcon,
        label: "팀원 관리",
        path: "/team/management/list",
        children: [],
      },
    ],
  },
] as const;
