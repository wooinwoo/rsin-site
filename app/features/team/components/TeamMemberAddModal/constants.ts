import { FormField } from "./types";

export const DEPARTMENT_OPTIONS = [
  { value: "개발팀", label: "개발팀" },
  { value: "인사팀", label: "인사팀" },
  { value: "마케팅팀", label: "마케팅팀" },
  { value: "기획팀", label: "기획팀" },
];

export const POSITION_OPTIONS = [
  { value: "사원", label: "사원" },
  { value: "대리", label: "대리" },
  { value: "과장", label: "과장" },
  { value: "차장", label: "차장" },
  { value: "부장", label: "부장" },
];

export const MBTI_OPTIONS = [
  { value: "ISTJ", label: "ISTJ" },
  { value: "ISFJ", label: "ISFJ" },
  { value: "INFJ", label: "INFJ" },
  { value: "INTJ", label: "INTJ" },
  { value: "ISTP", label: "ISTP" },
  { value: "ISFP", label: "ISFP" },
  { value: "INFP", label: "INFP" },
  { value: "INTP", label: "INTP" },
  { value: "ESTP", label: "ESTP" },
  { value: "ESFP", label: "ESFP" },
  { value: "ENFP", label: "ENFP" },
  { value: "ENTP", label: "ENTP" },
  { value: "ESTJ", label: "ESTJ" },
  { value: "ESFJ", label: "ESFJ" },
  { value: "ENFJ", label: "ENFJ" },
  { value: "ENTJ", label: "ENTJ" },
];

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
