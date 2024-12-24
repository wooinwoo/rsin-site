import { FormField } from "./types";
import { DEPARTMENT_OPTIONS, POSITION_OPTIONS, MBTI_OPTIONS } from "~/shared/constants/options";

export const FORM_FIELDS: FormField[] = [
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
    placeholder: "국가번호, -없이 숫자만 입력",
  },
  {
    label: "이메일",
    name: "email",
    type: "email",
    required: true,
    placeholder: "myemail@rs-team.com",
  },
  {
    label: "부서",
    name: "department",
    type: "select",
    required: true,
    options: DEPARTMENT_OPTIONS,
  },
  {
    label: "직급",
    name: "position",
    type: "select",
    required: true,
    options: POSITION_OPTIONS,
  },
  {
    label: "입사일",
    name: "joinDate",
    type: "date",
    required: true,
  },
  {
    label: "중간관리자 여부",
    name: "isManager",
    type: "toggle",
  },
  {
    label: "생년월일",
    name: "birthDate",
    type: "date",
  },
  {
    label: "MBTI",
    name: "mbti",
    type: "select",
    options: MBTI_OPTIONS,
  },
];
