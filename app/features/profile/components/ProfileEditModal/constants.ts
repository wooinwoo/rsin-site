import { FormField } from "./types";
import { DEPARTMENT_OPTIONS, POSITION_OPTIONS, MBTI_OPTIONS } from "~/shared/constants/options";

export const FORM_FIELDS: FormField[] = [
  {
    label: "프로필 이미지",
    name: "profileImage",
    type: "image",
    required: false,
  },
  {
    label: "이름",
    name: "name",
    type: "text",
    required: true,
    placeholder: "입력하세요",
  },
  {
    label: "휴대폰 번호",
    name: "phone",
    type: "tel",
    required: true,
    placeholder: "-없이 숫자만 입력",
  },
  {
    label: "이메일",
    name: "email",
    type: "email",
    required: true,
    placeholder: "email@rs-team.com",
  },
  {
    label: "부서",
    name: "departmentId",
    type: "select",
    options: DEPARTMENT_OPTIONS,
    disabled: true,
  },
  {
    label: "직급",
    name: "position",
    type: "select",
    options: POSITION_OPTIONS,
    disabled: true,
  },
  {
    label: "입사일",
    name: "joinedAt",
    type: "date",
    disabled: true,
  },
  {
    label: "생년월일",
    name: "birth",
    type: "date",
  },
  {
    label: "MBTI",
    name: "mbti",
    type: "select",
    options: MBTI_OPTIONS,
  },
];
