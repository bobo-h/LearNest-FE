import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUnitsWithDetails,
  batchProcessUnits,
} from "../services/unit/unitService";
import { Unit } from "../types/unitTypes";

export const useGetUnitsWithDetails = (classId: number) => {
  return useQuery({
    queryKey: ["units", classId],
    queryFn: () => getUnitsWithDetails(classId),
    enabled: !!classId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBatchProcessUnits = (classId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (units: Unit[]) => batchProcessUnits(classId, units),
    onSuccess: () => {
      // 단원과 소단원 데이터를 캐시에서 무효화
      queryClient.invalidateQueries({
        queryKey: ["units", classId],
      });
    },
    onError: (error: any) => {
      console.error("Error updating units and subunits:", error);
    },
  });
};
