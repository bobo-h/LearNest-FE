import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InviteClass, joinClass } from "../services/class/inviteService";

export const useInviteClass = () => {
  return useMutation({
    mutationFn: InviteClass,
    onSuccess: (data) => {
      console.log("초대 링크 생성 성공:", data.inviteLink);
    },
    onError: (error: any) => {
      console.error("Create Invite Error:", error);
    },
  });
};

export const useJoinClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, token }: { classId: number; token: string }) =>
      joinClass(classId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userClasses"],
      });
    },
    onError: (error: any) => {
      console.error("Join Class Error:", error);
    },
  });
};
