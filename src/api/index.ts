import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
// const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
const setAPI = process.env.REACT_APP_BACKEND_PROXY || process.env.REACT_APP_LOCAL_BACKEND;
// const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const apiClient = axios.create({
  baseURL: `${setAPI}/api`,
  timeout: 10000, // 요청 제한 시간 (10초)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = sessionStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 만료된 토큰, 401 에러 등 처리
    if (error.response?.status === 401) {
      alert('로그인이 필요합니다.');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
