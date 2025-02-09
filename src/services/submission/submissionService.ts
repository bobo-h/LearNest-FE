import apiClient from "../apiClient";
import {
  Submission,
  SubmissionFormData,
  FeedbackData,
} from "../../types/submissionTypes";

export const getSubmission = async ({
  classId,
  assignmentId,
}: {
  classId: number;
  assignmentId: number;
}): Promise<Submission> => {
  const response = await apiClient.get(
    `/classes/${classId}/assignments/${assignmentId}/submissions`
  );
  return response.data.data || null;
};

export const createSubmission = async ({
  classId,
  assignmentId,
  submissionData,
}: {
  classId: number;
  assignmentId: number;
  submissionData: SubmissionFormData;
}) => {
  const response = await apiClient.post(
    `/classes/${classId}/assignments/${assignmentId}/submissions`,
    submissionData
  );
  return response.data;
};

export const updateSubmission = async ({
  classId,
  assignmentId,
  submissionId,
  submissionData,
}: {
  classId: number;
  assignmentId: number;
  submissionId: number;
  submissionData: SubmissionFormData;
}) => {
  const response = await apiClient.put(
    `/classes/${classId}/assignments/${assignmentId}/submissions/${submissionId}`,
    submissionData
  );
  return response.data;
};

export const deleteSubmission = async ({
  classId,
  assignmentId,
  submissionId,
}: {
  classId: number;
  assignmentId: number;
  submissionId: number;
}) => {
  const response = await apiClient.delete(
    `/classes/${classId}/assignments/${assignmentId}/submissions/${submissionId}`
  );
  return response.data;
};

export const provideFeedback = async ({
  classId,
  assignmentId,
  submissionId,
  feedbackData,
}: {
  classId: number;
  assignmentId: number;
  submissionId: number;
  feedbackData: FeedbackData;
}) => {
  const response = await apiClient.put(
    `/classes/${classId}/assignments/${assignmentId}/submissions/${submissionId}/feedback`,
    feedbackData
  );
  return response.data;
};
