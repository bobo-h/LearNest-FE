import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
import FormRadio from "../common/FormRadio";
import FileInput from "../common/FileInput";

interface ClassCreateModalProps {
  open: boolean;
  onClose: () => void;
}

interface ClassFormData {
  name: string;
  description?: string;
  visibility: boolean;
  mainImage?: File;
}

const ClassCreateModal: React.FC<ClassCreateModalProps> = ({
  open,
  onClose,
}) => {
  const { handleSubmit, control } = useForm<ClassFormData>({
    defaultValues: {
      name: "",
      description: "",
      visibility: false,
    },
  });

  const onSubmit = (data: ClassFormData) => {
    console.log("클래스 데이터:", data);
    // API 호출 로직 추가
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "16px" }}>
          클래스 생성
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput name="name" control={control} label="클래스명" />

          <FormInput name="description" control={control} label="클래스 소개" />

          <Typography variant="subtitle1" sx={{ marginTop: "16px" }}>
            클래스 이미지
          </Typography>
          <FileInput
            name="mainImage"
            control={control}
            label="이미지 업로드"
            accept="image/*"
          />

          <Typography variant="subtitle1" sx={{ marginTop: "16px" }}>
            공개 여부
          </Typography>
          <FormRadio
            name="visibility"
            control={control}
            options={[
              { value: true, label: "공개" },
              { value: false, label: "비공개" },
            ]}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            생성하기
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ClassCreateModal;
