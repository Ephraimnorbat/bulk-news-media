import { API_CONFIG } from "./config";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(API_CONFIG.accessTokenKey);
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}

export function subscribeToAuthChanges(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  window.addEventListener("bnm-auth-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("bnm-auth-change", onChange);
  };
}

export function getServerAuthSnapshot(): boolean {
  return false;
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(API_CONFIG.refreshTokenKey);
}

export function setTokens(access: string, refresh?: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(API_CONFIG.accessTokenKey, access);
  if (refresh) {
    window.localStorage.setItem(API_CONFIG.refreshTokenKey, refresh);
  }
  window.dispatchEvent(new Event("bnm-auth-change"));
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(API_CONFIG.accessTokenKey);
  window.localStorage.removeItem(API_CONFIG.refreshTokenKey);
  window.dispatchEvent(new Event("bnm-auth-change"));
}
