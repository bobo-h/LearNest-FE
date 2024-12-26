import React, { useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
import FormRadio from "../common/FormRadio";
import FileInput from "../common/FileInput";
import { useCreateClass } from "../../hooks/useClasses";
import { useClassContext } from "../../contexts/ClassContext";

interface ClassCreateModalProps {
  open: boolean;
  onClose: () => void;
}

interface ClassFormData {
  name: string;
  description?: string;
  visibility: "public" | "private";
  mainImage?: File;
}

const ClassCreateModal: React.FC<ClassCreateModalProps> = ({
  open,
  onClose,
}) => {
  const { handleSubmit, control, reset } = useForm<ClassFormData>({
    defaultValues: {
      visibility: "private",
    },
  });

  const { addClass } = useClassContext();
  const { mutate: createClass, isPending } = useCreateClass();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = (data: ClassFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) {
      formData.append("description", data.description);
    }
    formData.append("visibility", data.visibility);
    if (data.mainImage) {
      formData.append("main_image", data.mainImage);
    }

    createClass(formData, {
      onSuccess: (newClass) => {
        addClass(newClass);
        onClose();
        reset();
        setErrorMessage(null);
      },
      onError: (error: any) => {
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("클래스 생성 중 오류가 발생했습니다.");
        }
      },
    });
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

        {errorMessage && (
          <Typography color="error" sx={{ marginBottom: "16px" }}>
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            control={control}
            label="클래스명"
            rules={{ required: "클래스명을 입력해주세요." }}
          />

          <FormInput
            name="description"
            control={control}
            label="클래스 소개(선택사항)"
          />

          <FileInput
            name="mainImage"
            control={control}
            label="클래스 이미지(선택사항)"
            accept="image/*"
          />

          <Typography variant="subtitle1" sx={{ marginTop: "16px" }}>
            공개 여부
          </Typography>
          <FormRadio
            name="visibility"
            control={control}
            options={[
              { value: "public", label: "공개" },
              { value: "private", label: "비공개" },
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
