import React from "react";
import { AxiosError } from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패 시 1회 재시도
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    },
  },
});

queryClient.getQueryCache().subscribe((event) => {
  if (event?.type === "observerResultsUpdated") {
    const query = event?.query;
    const error = query?.state.error;

    if (error instanceof AxiosError) {
      const responseError = error.response?.data as { message?: string };
      const errorMessage =
        responseError?.message || "데이터 로드 중 문제가 발생했습니다.";

      console.error("Query error:", errorMessage);

      if (error.response?.status === 401) {
        window.location.replace("/login");
      } else {
        alert(errorMessage);
      }
    } else {
      console.error("Unknown error:", error);
    }
  }
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
