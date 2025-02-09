import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";
import ContentInput from "../common/ContentInput";
import { Assignment } from "../../types/assignmentTypes";

interface AssignmentModalProps {
  open: boolean;
  onClose: () => void;
  assignment: Assignment;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({
  open,
  onClose,
  assignment,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* 과제 제목 */}
      <DialogTitle>{assignment.title}</DialogTitle>

      {/* 과제 내용 & 첨부파일 */}
      <DialogContent dividers>
        {/* 과제 내용 표시 */}
        <ContentInput
          name="assignment-content"
          initialContent={assignment.content}
          readOnly={true}
        />

        {/* 첨부파일이 있을 경우 다운로드 링크 표시 */}
        {assignment.attachment && (
          <Box sx={{ marginTop: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              첨부파일
            </Typography>
            <Link
              href={assignment.attachment}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ wordBreak: "break-all" }}
            >
              {assignment.attachment.split("/").pop() || "파일 다운로드"}
            </Link>
          </Box>
        )}
      </DialogContent>

      {/* 모달 액션 버튼 */}
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentModal;
