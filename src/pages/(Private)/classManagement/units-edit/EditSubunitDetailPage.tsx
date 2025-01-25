import React, { useEffect, Dispatch, SetStateAction } from "react";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import FormInput from "../../../../components/common/FormInput";
import FileInput from "../../../../components/common/FileInput";
import { Unit, Subunit } from "../../../../types/unitTypes";
import ContentInput from "./../../../../components/common/ContentInput";

interface OutletContext {
  units: Unit[];
  setUnits: Dispatch<SetStateAction<Unit[]>>;
  selectedSubunitId: number | null;
}

const EditSubunitDetailPage: React.FC = () => {
  const { units, setUnits, selectedSubunitId } =
    useOutletContext<OutletContext>();
  const { control, reset } = useForm();

  const currentSubunit = units
    .flatMap((unit) => unit.subunits)
    .find((subunit) => subunit.id === selectedSubunitId);

  useEffect(() => {
    if (currentSubunit) {
      reset({
        name: currentSubunit.name || "",
        description: currentSubunit.description || "",
        content: currentSubunit.content || {},
        materials_path: currentSubunit.materials_path || "",
      });
    }
  }, [reset, currentSubunit]);

  const handleChange = (field: keyof Subunit, value: string | object) => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === currentSubunit?.unit_id
          ? {
              ...unit,
              subunits: unit.subunits.map((subunit) =>
                subunit.id === selectedSubunitId
                  ? {
                      ...subunit,
                      [field]: value,
                      type: subunit.type || "update",
                    }
                  : subunit
              ),
            }
          : unit
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
      <FormInput
        name="name"
        control={control}
        label="소단원 이름"
        rules={{ required: "소단원 이름을 입력해주세요." }}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <FormInput
        name="description"
        control={control}
        label="간단한 소단원 설명"
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <ContentInput
        name="content"
        control={control}
        label="소단원 내용"
        initialContent={currentSubunit.content || []}
        onChange={(deltaContent) => {
          handleChange("content", deltaContent);
        }}
      />

      {/* 자료 업로드 */}
      <FileInput
        name="materials_path"
        control={control}
        label="자료 업로드"
        // onChange={(e) => handleChange("materials_path", e.target.value)}
      />
    </Box>
  );
};

export default EditSubunitDetailPage;
