import { Delta } from "quill";

export interface Submission {
  type?: "create" | "update" | "delete";
  id: number;
  assignment_id: number;
  content: Delta | null;
  attachment?: string | null;
  status?: "PENDING" | "IN_PROGRESS" | "RETRY" | "PASS" | "FAIL";
  feedback?: string | null;
  submitted_at?: Date;
  reviewed_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubmissionFormData {
  content: Delta;
  attachment?: string | null;
}

export interface FeedbackData {
  feedback?: string | null;
  status: "PENDING" | "IN_PROGRESS" | "RETRY" | "PASS" | "FAIL";
}
