import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserClasses,
  createClass,
  fetchUnitsWithSubunits,
} from "../services/class/classService";

export const useGetUserClasses = () => {
  return useQuery({
    queryKey: ["userClasses"],
    queryFn: fetchUserClasses,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1, // 실패 시 1회 재시도
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClass,
    onSuccess: (newClass) => {
      // 캐시된 클래스 목록을 무효화
      queryClient.invalidateQueries({
        queryKey: ["userClasses"],
      });
    },
    onError: (error: any) => {
      console.error("Create Class Error:", error);
    },
  });
};

export const useUnitsWithSubunits = (classId: number) => {
  return useQuery({
    queryKey: ["units", classId],
    queryFn: () => fetchUnitsWithSubunits(classId),
    enabled: !!classId,
    staleTime: 1000 * 60 * 5,
  });
};
