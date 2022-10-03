import axios, { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    request<P = unknown, R = Promise<P>>(config: AxiosRequestConfig): R;
    get<P = unknown, R = Promise<P>>(url: string, config?: AxiosRequestConfig): R;
    delete<P = unknown, R = Promise<P>>(url: string, config?: AxiosRequestConfig): R;
    head<P = unknown, R = Promise<P>>(url: string, config?: AxiosRequestConfig): R;
    post<P = unknown, R = Promise<P>>(url: string, data?: unknown, config?: AxiosRequestConfig): R;
    put<P = unknown, R = Promise<P>>(url: string, data?: unknown, config?: AxiosRequestConfig): R;
    patch<P = unknown, R = Promise<P>>(url: string, data?: unknown, config?: AxiosRequestConfig): R;
  }
}
