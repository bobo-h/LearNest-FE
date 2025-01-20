import React, { Dispatch, SetStateAction } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Typography, Button } from "@mui/material";
import FormInput from "../../../../components/common/FormInput";
import FileInput from "../../../../components/common/FileInput";
import { Subunit } from "../../../../types/unitTypes";

interface OutletContext {
  subunits: Subunit[];
  setSubunits: Dispatch<SetStateAction<Subunit[]>>;
}

const EditSubunitDetailPage: React.FC = () => {
  const { subunitId: subunitIdParams } = useParams<{ subunitId: string }>();
  const { subunits, setSubunits } = useOutletContext<OutletContext>();
  const subunitId = Number(subunitIdParams);
  const { control } = useForm();

  const currentSubunit = subunits.find((subunit) => subunit.id === subunitId);

  const handleChange = (field: keyof Subunit, value: string) => {
    setSubunits((prevSubunits) =>
      prevSubunits.map((subunit) =>
        subunit.id === subunitId ? { ...subunit, [field]: value } : subunit
      )
    );
  };

  if (!currentSubunit) {
    return <Typography>소단원을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        소단원 상세 정보
      </Typography>

      {/* 소단원 이름 */}
      <FormInput
        name="name"
        control={control}
        label="소단원 이름"
        defaultValue={currentSubunit.name || ""}
        rules={{ required: "소단원 이름을 입력해주세요." }}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      {/* 소단원 설명 */}
      <FormInput
        name="description"
        control={control}
        label="간단한 소단원 설명"
        defaultValue={currentSubunit.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      {/* 소단원 콘텐츠 */}
      <FormInput
        name="content"
        control={control}
        label="소단원 콘텐츠"
        defaultValue={currentSubunit.content || ""}
        onChange={(e) => handleChange("content", e.target.value)}
      />

      {/* 자료 업로드 */}
      <FileInput
        name="materials_path"
        control={control}
        label="자료 업로드"
        // defaultValue={currentSubunit.materials_path || ""}
        // onChange={(e) => handleChange("materials_path", e.target.value)}
      />
    </Box>
  );
};

export default EditSubunitDetailPage;
