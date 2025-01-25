import React, { useEffect, Dispatch, SetStateAction } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/common/FormInput";
import { Unit } from "../../../../types/unitTypes";

interface OutletContext {
  units: Unit[];
  setUnits: Dispatch<SetStateAction<Unit[]>>;
  selectedUnitId: number | null;
}

const EditUnitDetailPage: React.FC = () => {
  const { units, setUnits, selectedUnitId } = useOutletContext<OutletContext>();
  const { control, reset } = useForm();

  const currentUnit = units.find((unit) => unit.id === selectedUnitId);

  useEffect(() => {
    if (currentUnit) {
      reset({
        name: currentUnit.name || "",
        description: currentUnit.description || "",
      });
    }
  }, [currentUnit, reset]);

  const handleChange = (field: keyof Unit, value: string) => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === selectedUnitId
          ? {
              ...unit,
              [field]: value,
              type: unit.type || "update",
            }
          : unit
      )
    );
  };

  if (!currentUnit) {
    return <Typography>단원을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        단원 상세 정보
      </Typography>
      <FormInput
        name="name"
        control={control}
        label="단원 이름"
        rules={{ required: "단원 이름을 입력해주세요." }}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <FormInput
        name="description"
        control={control}
        label="간단한 단원 설명"
        onChange={(e) => handleChange("description", e.target.value)}
      />
    </Box>
  );
};

export default EditUnitDetailPage;
