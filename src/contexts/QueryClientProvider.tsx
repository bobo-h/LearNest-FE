import React from "react";
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

    if (error) {
      console.error("Query error:", error);
      alert("데이터를 로드하는 도중 문제가 발생했습니다.");
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
