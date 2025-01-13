import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useUnitsWithSubunits } from "../../hooks/useClasses";
import { Unit } from "../../types/classTypes";

interface UnitListProps {
  onSelect: (unit: Unit) => void;
}

const UnitList: React.FC<UnitListProps> = ({ onSelect }) => {
  const { classId } = useParams<{ classId: string }>();
  const {
    data: unitsResponse,
    isLoading,
    error,
  } = useUnitsWithSubunits(Number(classId));

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography>오류가 발생했습니다.</Typography>;

  const units = unitsResponse?.units || [];

  return (
    <Box>
      {units?.length ? (
        <List>
          {units.map((unit) => (
            <ListItemButton key={unit.id} onClick={() => onSelect(unit)}>
              <ListItemText
                primary={unit.name}
                secondary={unit.description || ""}
              />
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Typography>설정된 학습 내용이 없습니다</Typography>
      )}
    </Box>
  );
};

export default UnitList;
