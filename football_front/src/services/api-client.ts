import axios from 'axios';
import Cookies from 'js-cookie';
import {parseExpirationInDays} from '../utils/dateUtils';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const JWT_TOKEN_EXPIRES = import.meta.env.VITE_JWT_TOKEN_EXPIRES;
// const BASE_URL = "node91.cs.colman.ac.il";
// const JWT_TOKEN_EXPIRES = '1h';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = Cookies.get('access_token');

      if (accessToken && config && config.url && !config.url.includes('auth/logout')) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh_token');

      if (refreshToken) {
        try {
          const response = await axios.post<{ accessToken: string; refreshToken: string }>(`${BASE_URL}/auth/refresh`, {refreshToken});

          const newAccessToken = response.data.accessToken;
          Cookies.set('access_token', newAccessToken, {expires: parseExpirationInDays(JWT_TOKEN_EXPIRES)});
          Cookies.set('refresh_token', response.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
        }
      }
    }
    return Promise.reject(error);
  }
);

export {axiosInstance};
