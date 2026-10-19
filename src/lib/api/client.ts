import axios, {
  AxiosHeaders,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_CONFIG, ENDPOINTS } from "./config";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "./tokens";

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

function applyAuthHeader(config: InternalAxiosRequestConfig) {
  const headers = AxiosHeaders.from(config.headers);
  const token = getAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    headers.delete("Authorization");
  }

  config.headers = headers;
  return config;
}

api.interceptors.request.use(
  (config) => {
    const next = applyAuthHeader(config);
    const auth = AxiosHeaders.from(next.headers).get("Authorization");

    if (auth && typeof auth === "string" && !auth.startsWith("Bearer ")) {
      return Promise.reject(
        new Error("Invalid Authorization header. Expected Bearer token."),
      );
    }

    return next;
  },
  (error) => Promise.reject(error),
);

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  const { data } = await axios.post<{ access: string }>(
    `${API_CONFIG.baseURL}${ENDPOINTS.refresh}`,
    { refresh },
    { headers: { "Content-Type": "application/json" } },
  );

  if (!data?.access) return null;
  setTokens(data.access);
  return data.access;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!original || error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const access = await refreshPromise;
      if (!access) {
        clearTokens();
        return Promise.reject(error);
      }
      original.headers = AxiosHeaders.from(original.headers);
      original.headers.set("Authorization", `Bearer ${access}`);
      return api(original);
    } catch (refreshError) {
      clearTokens();
      return Promise.reject(refreshError);
    }
  },
);

export default api;
