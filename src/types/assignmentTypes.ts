import { Delta } from "quill";

export interface Assignment {
  type?: "create" | "update" | "delete";
  id: number;
  subunit_id: number;
  title: string;
  content: Delta | null;
  attachment?: string | null;
}
