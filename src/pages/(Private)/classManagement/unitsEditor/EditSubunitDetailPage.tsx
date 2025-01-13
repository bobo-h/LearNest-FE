import React from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Button } from "@mui/material";
import FormInput from "../../../../components/common/FormInput";
import FileInput from "../../../../components/common/FileInput";

interface SubunitFormValues {
  name: string;
  description: string | null;
  content: string | null;
  materials_path: File | null;
}

const EditSubunitDetailPage: React.FC = () => {
  const { control, handleSubmit } = useForm<SubunitFormValues>({
    defaultValues: {
      name: "",
      description: "",
      content: "",
      materials_path: null,
    },
  });

  const handleSave = () => {
    // 저장 로직 추가 예정
    console.log("Subunit details saved");
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          flex: 1,
          padding: 2,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          소단원 상세 정보
        </Typography>
        <FormInput label="소단원 이름" name="name" control={control} />
        <FormInput label="소단원 설명" name="description" control={control} />
        <FormInput label="소단원 콘텐츠" name="content" control={control} />
        <FileInput
          label="자료 업로드"
          name="materials_path"
          control={control}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Button variant="contained" onClick={handleSave}>
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default EditSubunitDetailPage;
