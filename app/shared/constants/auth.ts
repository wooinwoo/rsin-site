export const PASSWORD_RULES = {
  minLength: 8,
  maxLength: 20,
  requireNumber: true,
  requireSpecialChar: true,
};

export const ERROR_MESSAGES = {
  invalidEmail: "유효한 이메일 주소를 입력해주세요.",
  invalidPassword: "비밀번호는 8-20자의 영문, 숫자, 특수문자를 포함해야 합니다.",
  passwordMismatch: "비밀번호가 일치하지 않습니다.",
  expiredToken: "만료된 링크입니다. 비밀번호 찾기를 다시 시도해주세요.",
  invalidToken: "유효하지 않은 링크입니다. 비밀번호 찾기를 다시 시도해주세요.",
};
