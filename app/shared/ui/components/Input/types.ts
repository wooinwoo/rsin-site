export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 입력 필드의 값
   */
  value: string;

  /**
   * 값이 변경될 때 호출되는 함수
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * 플레이스홀더
   */
  placeholder?: string;

  /**
   * 추가 클래스명
   */
  className?: string;

  /**
   * 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 입력 타입 (text, email, tel, password 등)
   */
  type?: string;
}
