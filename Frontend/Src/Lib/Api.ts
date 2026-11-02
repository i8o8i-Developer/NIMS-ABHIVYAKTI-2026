import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { Logger } from "@/Lib/Logger";

const TOKEN_KEY = "abhivyakti_staff_token";
const REFRESH_KEY = "abhivyakti_staff_refresh";

export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let inMemoryToken: string | null = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

export const SetAccessToken = (token: string | null) => {
  inMemoryToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("abhivyakti_staff_user");
    }
  }
};

export const GetAccessToken = (): string | null => {
  if (!inMemoryToken && typeof window !== "undefined") {
    inMemoryToken = localStorage.getItem(TOKEN_KEY);
  }
  return inMemoryToken;
};

// Request Interceptor To Attach Bearer Token
Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = GetAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor For Token Refresh
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

Api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const currentToken = GetAccessToken();

      if (!currentToken) {
        return Promise.reject(error);
      }

      try {
        const storedRefresh = typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null;
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || "/api"}/auth/refresh/`,
          storedRefresh ? { refresh: storedRefresh } : {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data?.access;
        const newRefreshToken = refreshResponse.data?.refresh;
        if (newRefreshToken && typeof window !== "undefined") {
          localStorage.setItem(REFRESH_KEY, newRefreshToken);
        }

        if (newAccessToken) {
          SetAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Api(originalRequest);
        }
      } catch (refreshError) {
        SetAccessToken(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem(REFRESH_KEY);
        }
        if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }
    }

    return Promise.reject(error);
  }
);
