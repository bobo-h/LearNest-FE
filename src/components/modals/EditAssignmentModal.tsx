import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
import ContentInput from "../common/ContentInput";
import FileInput from "../common/FileInput";
import { Assignment } from "../../types/unitTypes";

interface AssignmentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (assignment: Assignment) => void;
  assignment?: Assignment | null;
}

const EditAssignmentModal: React.FC<AssignmentModalProps> = ({
  open,
  onClose,
  onSave,
  assignment,
}) => {
  const { control, handleSubmit, reset, setValue, getValues } =
    useForm<Omit<Assignment, "id" | "subunit_id">>();

  useEffect(() => {
    reset({
      title: assignment?.title || "",
      content: assignment?.content || {},
      attachment: assignment?.attachment || "",
    });
  }, [assignment, reset]);

  const handleSave = (data: Omit<Assignment, "id" | "subunit_id">) => {
    const contentValue = getValues("content");
    onSave({
      id: assignment?.id ?? Date.now(),
      subunit_id: assignment?.subunit_id ?? 0,
      ...data,
      content: contentValue,
      type: assignment ? "update" : "create",
    });

    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{assignment ? "과제 수정" : "과제 추가"}</DialogTitle>
      <DialogContent>
        <FormInput
          name="title"
          control={control}
          label="과제 제목"
          rules={{ required: "과제 제목을 입력해주세요." }}
        />
        <ContentInput
          name="content"
          control={control}
          label="과제 내용"
          initialContent={assignment?.content || null}
          onChange={(value) => setValue("content", value)}
        />
        <FileInput name="attachment" control={control} label="첨부 파일" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit(handleSave)} variant="contained">
          {assignment ? "수정 완료" : "추가"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAssignmentModal;
