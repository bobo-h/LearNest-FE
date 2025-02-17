import { Delta } from "quill";

export interface SubmissionResponse {
  status: string;
  message: string;
  submissions: Submission[];
}

export interface Submission {
  type?: "create" | "update" | "delete";
  id: number;
  assignment_id: number;
  content: Delta | null;
  attachment: string | null;
  status: "PENDING" | "IN_PROGRESS" | "RETRY" | "PASS" | "FAIL";
  feedback: string | null;
  reviewed_at: Date | null;
  created_at?: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface SubmissionFormData {
  content: Delta;
  attachment?: string | null;
}

export interface FeedbackData {
  feedback?: string | null;
  status: "PENDING" | "IN_PROGRESS" | "RETRY" | "PASS" | "FAIL";
}
