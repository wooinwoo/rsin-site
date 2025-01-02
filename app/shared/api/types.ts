import type { InternalAxiosRequestConfig } from "axios";

export interface RemixRequestConfig extends InternalAxiosRequestConfig {
  _remix?: {
    request: Request; // 기본 Web API Request 타입
  };
}
