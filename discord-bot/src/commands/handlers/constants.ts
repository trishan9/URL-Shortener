import config from "@/config";

export const API_ENDPOINTS = {
  CREATE_SHORT_URL: `${config.api.url}/api/URL`,
  REGISTER_URL: `${config.api.url}/api/auth/register`,
  LOGIN_URL: `${config.api.url}/api/auth/login`,
  GET_ME: `${config.api.url}/api/auth/me`,
  REFRESH: `${config.api.url}/api/auth/refresh`,
};

