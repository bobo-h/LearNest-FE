import React, { useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetUnitsWithSubunits } from "../../hooks/useUnits";
import { useUnitContext } from "../../contexts/UnitContext";
import { Unit } from "../../types/unitTypes";

interface UnitListProps {
  onSelect: (unit: Unit) => void;
}

const UnitList: React.FC<UnitListProps> = ({ onSelect }) => {
  const { classId } = useParams<{ classId: string }>();
  const {
    data: unitsResponse,
    isLoading,
    error,
  } = useGetUnitsWithSubunits(Number(classId));
  const { setUnits } = useUnitContext();

  useEffect(() => {
    if (unitsResponse?.units) {
      setUnits(unitsResponse.units);
    }
  }, [unitsResponse, setUnits]);

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography>오류가 발생했습니다.</Typography>;

  const units = unitsResponse?.units || [];

  return (
    <Box>
      {units.length > 0 ? (
        <List>
          {units.map((unit) => (
            <React.Fragment key={unit.id}>
              <ListItemButton onClick={() => onSelect(unit)}>
                <ListItemText
                  primary={unit.name}
                  secondary={unit.description || ""}
                />
              </ListItemButton>
              {unit.subunits && unit.subunits.length > 0 && (
                <List sx={{ pl: 4 }}>
                  {unit.subunits.map((subunit) => (
                    <ListItem key={subunit.id}>
                      <ListItemText primary={subunit.name} />
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography>설정된 학습 내용이 없습니다</Typography>
      )}
    </Box>
  );
};

export default UnitList;
