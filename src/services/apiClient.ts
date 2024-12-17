import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
// const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
// const setAPI = process.env.REACT_APP_BACKEND_PROXY || process.env.REACT_APP_LOCAL_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const apiClient = axios.create({
  baseURL: `${BACKEND_PROXY}/api`,
  timeout: 10000, // 요청 제한 시간 (10초)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      alert('로그인이 필요합니다.');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  },
);

export default apiClient;
