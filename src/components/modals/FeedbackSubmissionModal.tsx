import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Submission, FeedbackData } from "../../types/submissionTypes";
import { useProvideFeedback } from "../../hooks/useSubmission";
import ContentInput from "../common/ContentInput";

interface FeedbackSubmissionModalProps {
  open: boolean;
  onClose: () => void;
  classId: number;
  assignmentId: number;
  submission: Submission;
}

const FeedbackSubmissionModal: React.FC<FeedbackSubmissionModalProps> = ({
  open,
  onClose,
  classId,
  assignmentId,
  submission,
}) => {
  const { control, handleSubmit, setValue, reset, getValues } =
    useForm<FeedbackData>({
      defaultValues: {
        status: submission.status,
        feedback: submission.feedback || "",
      },
    });

  useEffect(() => {
    if (open) {
      reset({
        status: submission.status,
        feedback: submission.feedback || "",
      });
    }
  }, [open, submission, reset]);

  const { mutate: provideFeedback, isPending } = useProvideFeedback();

  const onSubmit = () => {
    const feedbackData: FeedbackData = {
      status: getValues("status"),
      feedback: getValues("feedback"),
    };

    provideFeedback(
      {
        classId,
        assignmentId,
        submissionId: submission.id,
        feedbackData,
      },
      {
        onSuccess: () => {
          alert("피드백이 성공적으로 저장되었습니다.");
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>학생 과제 피드백</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
          제출된 내용
        </Typography>
        <ContentInput
          name="content"
          initialContent={submission.content}
          readOnly={true}
        />
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>제출 상태</InputLabel>
          <Select
            defaultValue={submission.status}
            onChange={(e) =>
              setValue("status", e.target.value as FeedbackData["status"])
            }
          >
            <MenuItem value="PENDING">PENDING (대기 중)</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS (검토 중)</MenuItem>
            <MenuItem value="RETRY">RETRY (재제출 요청)</MenuItem>
            <MenuItem value="PASS">PASS (통과)</MenuItem>
            <MenuItem value="FAIL">FAIL (실패)</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="피드백"
          multiline
          rows={4}
          fullWidth
          sx={{ mt: 3 }}
          defaultValue={submission.feedback || ""}
          onChange={(e) => setValue("feedback", e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          취소
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          disabled={isPending}
        >
          {isPending ? "처리 중..." : "저장"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackSubmissionModal;
