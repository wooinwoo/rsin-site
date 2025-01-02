import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { ApiError } from "./errors";
import { RemixRequestConfig } from "./types";

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("API Error Details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      },
    });
    return Promise.reject(ApiError.fromAxiosError(error));
  }
);

instance.interceptors.request.use(async (config: RemixRequestConfig) => {
  if (typeof window === "undefined" && config.headers) {
    const request = config._remix?.request;
    if (request) {
      const apiCookie = request.headers.get("X-API-Cookie");
      if (apiCookie) {
        config.headers.Cookie = apiCookie;
      }
    }
  }
  return config;
});

export const client = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    instance.get(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    instance.post(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    instance.put(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    instance.patch(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    instance.delete(url, config),
};
