import React, { Dispatch, SetStateAction } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/common/FormInput";
import { Unit } from "../../../../types/unitTypes";

interface OutletContext {
  units: Unit[];
  setUnits: Dispatch<SetStateAction<Unit[]>>;
}

const EditUnitDetailPage: React.FC = () => {
  const { unitId: unitIdParam } = useParams<{ unitId: string }>();
  const { units, setUnits } = useOutletContext<OutletContext>();
  const unitId = Number(unitIdParam);
  const { control } = useForm();
  const currentUnit = units.find((unit) => unit.id === unitId);

  const handleChange = (field: keyof Unit, value: string) => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === unitId ? { ...unit, [field]: value } : unit
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
        error={undefined}
        defaultValue={currentUnit.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <FormInput
        name="description"
        control={control}
        label="간단한 단원 설명"
        defaultValue={currentUnit.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />
    </Box>
  );
};

export default EditUnitDetailPage;
