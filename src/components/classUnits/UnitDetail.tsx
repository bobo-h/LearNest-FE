import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Unit } from "../../types/classTypes";

interface UnitDetailProps {
  unit: Unit | null; // 선택된 단원 정보
}

const UnitDetail: React.FC<UnitDetailProps> = ({ unit }) => {
  if (!unit) {
    return <Typography>단원을 선택하세요</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6">{unit.name}</Typography>
      <Typography variant="body2" sx={{ opacity: 0.7, marginBottom: 2 }}>
        {unit.description}
      </Typography>
      <Typography variant="subtitle1">소단원 목록:</Typography>
      {unit.subunits?.length ? (
        <List>
          {unit.subunits.map((subunit) => (
            <ListItem key={subunit.id}>
              <ListItemText
                primary={subunit.name}
                secondary={subunit.description || ""}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>설정된 소단원이 없습니다</Typography>
      )}
    </Box>
  );
};

export default UnitDetail;
