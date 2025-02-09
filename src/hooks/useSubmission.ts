import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubmission,
  createSubmission,
  updateSubmission,
  deleteSubmission,
  provideFeedback,
} from "../services/submission/submissionService";
import { SubmissionFormData, FeedbackData } from "../types/submissionTypes";

export const useGetSubmission = (classId: number, assignmentId: number) => {
  return useQuery({
    queryKey: ["submission", classId, assignmentId],
    queryFn: () => getSubmission({ classId, assignmentId }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubmission,
    onSuccess: (_, { classId, assignmentId }) => {
      queryClient.invalidateQueries({
        queryKey: ["submission", classId, assignmentId],
      });
    },
    onError: (error: any) => {
      console.error("Create Submission Error:", error);
    },
  });
};

export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubmission,
    onSuccess: (_, { classId, assignmentId }) => {
      queryClient.invalidateQueries({
        queryKey: ["submission", classId, assignmentId],
      });
    },
    onError: (error: any) => {
      console.error("Update Submission Error:", error);
    },
  });
};

export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubmission,
    onSuccess: (_, { classId, assignmentId }) => {
      queryClient.invalidateQueries({
        queryKey: ["submission", classId, assignmentId],
      });
    },
    onError: (error: any) => {
      console.error("Delete Submission Error:", error);
    },
  });
};

export const useProvideFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: provideFeedback,
    onSuccess: (_, { classId, assignmentId }) => {
      queryClient.invalidateQueries({
        queryKey: ["submission", classId, assignmentId],
      });
    },
    onError: (error: any) => {
      console.error("Provide Feedback Error:", error);
    },
  });
};
