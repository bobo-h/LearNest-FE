import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
import FormRadio from "../common/FormRadio";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useCreateClass, useUpdateClass } from "../../hooks/useClasses";
import { ClassFormData } from "./../../types/classTypes";

interface EditClassModalProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: ClassFormData & { id?: number };
}

const EditClassModal: React.FC<EditClassModalProps> = ({
  open,
  onClose,
  mode,
  initialData,
}) => {
  const { handleSubmit, control, reset, setValue } = useForm<ClassFormData>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      visibility: initialData?.visibility || "private",
    },
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setValue("name", initialData.name);
      setValue("description", initialData.description);
      setValue("visibility", initialData.visibility);
    }
  }, [mode, initialData, setValue]);

  const { mutate: createClass, isPending: isCreating } = useCreateClass();
  const { mutate: updateClass, isPending: isUpdating } = useUpdateClass();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ClassFormData) => {
    try {
      let mainImageUrl = initialData?.mainImageUrl;

      const fileInput =
        document.querySelector<HTMLInputElement>("#mainImageFile");
      const file = fileInput?.files?.[0];

      if (file) {
        mainImageUrl = await uploadToCloudinary(file);
      }

      if (mode === "create") {
        createClass(
          { ...data, mainImageUrl },
          {
            onSuccess: () => {
              alert("클래스가 생성되었습니다.");
              onClose();
              reset();
              setErrorMessage(null);
            },
            onError: (error: any) => {
              setErrorMessage(
                error.response?.data?.message || "클래스 생성 중 오류 발생"
              );
            },
          }
        );
      } else {
        if (!initialData?.id) return;
        updateClass(
          { classId: initialData.id, classData: { ...data, mainImageUrl } },
          {
            onSuccess: () => {
              alert("클래스가 수정되었습니다.");
              handleClose();
            },
            onError: (error: any) => {
              setErrorMessage(
                error.response?.data?.message || "클래스 수정 중 오류 발생"
              );
            },
          }
        );
      }
    } catch (error) {
      setErrorMessage("이미지 업로드에 실패했습니다.");
    }
  };

  const handleClose = () => {
    reset();
    setErrorMessage(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          {mode === "create" ? "클래스 생성" : "클래스 수정"}
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

          <input id="mainImageFile" type="file" accept="image/*" />

          <Typography variant="caption" color="textSecondary" display="block">
            대표 이미지를 업로드하세요. (예: 클래스 로고 또는 커버 이미지)
          </Typography>

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
            disabled={isCreating || isUpdating}
          >
            {mode === "create" ? "생성하기" : "수정하기"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditClassModal;
