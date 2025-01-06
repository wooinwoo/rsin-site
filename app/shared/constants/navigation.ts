import { FC } from "react";
import { IconProps } from "~/shared/ui/icons/types";
import { HomeIcon, HouseboatIcon, ProfileIcon, TaskIcon } from "~/shared/ui/icons";

const BASE_URL = process.env.NODE_ENV === "production" ? "https://d-site-rsin.rsteam.co.kr" : "";

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
        path: `${BASE_URL}/`,
      },
    ],
  },
  {
    label: "휴가",
    items: [
      {
        icon: HouseboatIcon,
        label: "연차 현황",
        path: `${BASE_URL}/leaves/management/summary`,
      },
      {
        icon: TaskIcon,
        label: "결재 내역",
        path: `${BASE_URL}/leaves/approval/pending`,
        children: [
          {
            icon: "/svg/pending.svg",
            label: "결재 대기",
            path: `${BASE_URL}/leaves/approval/pending`,
          },
          {
            icon: "/svg/completed.svg",
            label: "결재 완료",
            path: `${BASE_URL}/leaves/approval/completed`,
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
        path: `${BASE_URL}/team/management/list`,
        children: [],
      },
    ],
  },
] as const;
