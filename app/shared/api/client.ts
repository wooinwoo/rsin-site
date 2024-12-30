import axios, { AxiosError } from "axios";
import { ApiError } from "./errors";

type AxiosCustomResponse<T> = T;

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      url: config.url,
      baseURL: config.baseURL,
      method: config.method,
    });
    return config;
  },
  (error) => {
    return Promise.reject(ApiError.fromAxiosError(error));
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(ApiError.fromAxiosError(error));
  }
);

export const client = {
  get: <T>(url: string, config?: any): Promise<AxiosCustomResponse<T>> => instance.get(url, config),
  post: <T>(url: string, data?: any, config?: any): Promise<AxiosCustomResponse<T>> =>
    instance.post(url, data, config),
  put: <T>(url: string, data?: any, config?: any): Promise<AxiosCustomResponse<T>> =>
    instance.put(url, data, config),
  patch: <T>(url: string, data?: any, config?: any): Promise<AxiosCustomResponse<T>> =>
    instance.patch(url, data, config),
  delete: <T>(url: string, config?: any): Promise<AxiosCustomResponse<T>> =>
    instance.delete(url, config),
};
