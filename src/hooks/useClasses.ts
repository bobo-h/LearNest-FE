import { useQuery } from "@tanstack/react-query";
import { fetchUserClasses } from "../services/class/classService";

export const useClasses = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userClasses"],
    queryFn: fetchUserClasses,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1, // 실패 시 1회 재시도
  });

  return { data, error, isLoading };
};
