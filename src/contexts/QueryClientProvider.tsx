import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

const errorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    const responseError = error.response?.data as { message?: string };
    const errorMessage =
      responseError?.message || "데이터 로드 중 문제가 발생했습니다.";

    console.error("Query error:", errorMessage);
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패 시 1회 재시도
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    },
    mutations: {
      onError: errorHandler,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      errorHandler(error);
    },
  }),
});

const CustomQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
