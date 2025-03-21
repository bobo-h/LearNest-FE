import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserClasses,
  createClass,
  updateClass,
  deleteClass,
  leaveClass,
  fetchClassMembers,
  removeClassMember,
} from "../services/class/classService";

export const useGetUserClasses = () => {
  return useQuery({
    queryKey: ["userClasses"],
    queryFn: fetchUserClasses,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1,
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClass,
    onSuccess: (newClass) => {
      queryClient.invalidateQueries({
        queryKey: ["userClasses"],
      });
    },
    onError: (error: any) => {
      console.error("Create Class Error:", error);
    },
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userClasses"],
      });
    },
    onError: (error: any) => {
      console.error("Update Class Error:", error);
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userClasses"],
      });
    },
    onError: (error: any) => {
      console.error("Delete Class Error:", error);
    },
  });
};

export const useLeaveClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveClass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userClasses"],
      });
    },
    onError: (error: any) => {
      console.error("Leave Class Error:", error);
    },
  });
};

export const useGetClassMembers = (classId: number) => {
  return useQuery({
    queryKey: ["classMembers", classId],
    queryFn: () => fetchClassMembers(classId),
    enabled: !!classId, // classId가 존재할 때만 실행
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useRemoveClassMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeClassMember,
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({
        queryKey: ["classMembers", classId],
      });
    },
    onError: (error: any) => {
      console.error("Remove Class Member Error:", error);
    },
  });
};
