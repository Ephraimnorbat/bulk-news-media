import api from "./client";
import { ENDPOINTS } from "./config";
import { clearTokens, getRefreshToken, setTokens } from "./tokens";
import type { AuthResponse, LeadPayload } from "./types";

export async function login(username: string, password: string) {
  const { data } = await api.post<AuthResponse>(ENDPOINTS.login, {
    username,
    password,
  });
  setTokens(data.access, data.refresh);
  return data;
}

export async function register(payload: {
  username: string;
  email: string;
  password: string;
}) {
  const { data } = await api.post<AuthResponse>(ENDPOINTS.register, payload);
  if (data.access) setTokens(data.access, data.refresh);
  return data;
}

export async function logout() {
  const refresh = getRefreshToken();
  try {
    if (refresh) await api.post(ENDPOINTS.logout, { refresh });
  } finally {
    clearTokens();
  }
}

export async function sendLead(payload: LeadPayload) {
  const { data } = await api.post(ENDPOINTS.leads, payload);
  return data;
}

export async function subscribeNewsletter(email: string) {
  const { data } = await api.post(ENDPOINTS.newsletter, { email });
  return data;
}
