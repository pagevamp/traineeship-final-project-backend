import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/features/login/constant";
import { storageUtil } from "@/storage";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const NOTIFICATION_API_URL = process.env.NEXT_PUBLIC_NOTIFICATION_API_BASE_URL;

let isRefreshing = false;
let failedRequestsQueue: {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}[] = [];

// Decode JWT to check expiry
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (err) {
    return true; // Assume token is invalid if decoding fails
  }
};

// Function to create an Axios instance with token handling
const createApiInstance = (baseURL: string | undefined) => {
  const instance = axios.create({ baseURL });

  // Request Interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = storageUtil.get(ACCESS_TOKEN);
      config.headers["X-Client-Portal"] = "user";
      if (token && !isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (!error.response) {
        return;
      }

      const originalRequest: any = error.config;
      const refreshToken = storageUtil.get(REFRESH_TOKEN);

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          if (!refreshToken || isTokenExpired(refreshToken)) {
            throw new Error("No refresh token available");
          }

          const newSession = await updateSession({ refreshToken });

          if (!newSession?.data?.accessToken) {
            throw new Error("Token refresh failed");
          }

          storageUtil.set(ACCESS_TOKEN, newSession.data.accessToken);
          storageUtil.set(REFRESH_TOKEN, newSession.data.refreshToken);

          // Retry queued requests with new token
          failedRequestsQueue.forEach(({ resolve }) =>
            resolve(newSession.data.accessToken)
          );
          failedRequestsQueue = [];

          originalRequest.headers.Authorization = `Bearer ${newSession.data.accessToken}`;
          return instance(originalRequest);
        } catch (refreshError: any) {
          storageUtil.remove(ACCESS_TOKEN);
          storageUtil.remove(REFRESH_TOKEN);

          failedRequestsQueue.forEach(({ reject }) => reject(refreshError));
          failedRequestsQueue = [];

          if (!window.location.pathname.startsWith("/login")) {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
          originalRequest._retry = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create instances for APIs
const api = createApiInstance(BASE_API_URL);
const notificationApi = createApiInstance(NOTIFICATION_API_URL);

async function updateSession(body: any) {
  const response = await fetch(`${BASE_API_URL}/auth/refresh-tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) return null;
  return response.json();
}

export { api, notificationApi };
