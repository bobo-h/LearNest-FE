import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Submission, SubmissionFormData } from "../../types/submissionTypes";
import {
  useCreateSubmission,
  useUpdateSubmission,
} from "../../hooks/useSubmission";
import { useForm } from "react-hook-form";
import ContentInput from "./../common/ContentInput";
import FileInput from "./../common/FileInput";
import SubmissionStatusChip from "./../common/SubmissionStatusChip";

interface EditSubmissionModalProps {
  open: boolean;
  onClose: () => void;
  classId: number;
  assignmentId: number;
  submission?: Submission;
}

const EditSubmissionModal: React.FC<EditSubmissionModalProps> = ({
  open,
  onClose,
  classId,
  assignmentId,
  submission,
}) => {
  const { control, handleSubmit, setValue, reset, getValues } =
    useForm<SubmissionFormData>();

  useEffect(() => {
    if (open) {
      reset({
        content: submission?.content || {},
        attachment: submission?.attachment || null,
      });
    }
  }, [open, submission, reset]);

  const { mutate: createSubmission, isPending: isSubmitting } =
    useCreateSubmission();
  const { mutate: updateSubmission, isPending: isUpdating } =
    useUpdateSubmission();

  const onSubmit = () => {
    const submissionData: SubmissionFormData = {
      content: getValues("content"),
      attachment: getValues("attachment"),
    };

    if (submission) {
      updateSubmission(
        {
          classId,
          assignmentId,
          submissionId: submission.id,
          submissionData,
        },
        {
          onSuccess: () => {
            alert("과제가 성공적으로 수정되었습니다.");
            onClose();
          },
        }
      );
    } else {
      createSubmission(
        { classId, assignmentId, submissionData },
        {
          onSuccess: () => {
            alert("과제가 성공적으로 제출되었습니다.");
            onClose();
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{submission ? "과제 수정" : "과제 제출"}</DialogTitle>
      <DialogContent>
        {submission && (submission.status || submission.feedback) && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              backgroundColor: "grey.100",
            }}
          >
            {submission.status && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: submission.feedback ? 2 : 0,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  제출 상태
                </Typography>
                <SubmissionStatusChip status={submission.status} />
              </Box>
            )}
            {submission.feedback && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  피드백
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    minWidth: "50%",
                    textAlign: "right",
                  }}
                >
                  {submission.feedback}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        <ContentInput
          name="content"
          control={control}
          label="과제 내용"
          initialContent={submission?.content || null}
          onChange={(value) => setValue("content", value)}
        />
        <FileInput name="attachment" control={control} label="첨부 파일" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          취소
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          disabled={isSubmitting || isUpdating}
        >
          {isSubmitting || isUpdating
            ? "처리 중..."
            : submission
            ? "수정하기"
            : "제출하기"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSubmissionModal;
