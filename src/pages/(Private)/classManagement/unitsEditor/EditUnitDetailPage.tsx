import React from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Button } from "@mui/material";
import FormInput from "../../../../components/common/FormInput";

interface UnitFormValues {
  name: string;
  description: string | null;
}

const EditUnitDetailPage: React.FC = () => {
  const { control, handleSubmit } = useForm<UnitFormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSave = () => {
    // 저장 로직 추가 예정
    console.log("Unit details saved");
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
          단원 상세 정보
        </Typography>
        <FormInput label="단원 이름" name="name" control={control} />
        <FormInput label="단원 설명" name="description" control={control} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", margin: 2 }}>
        <Button variant="contained" onClick={handleSave}>
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default EditUnitDetailPage;
