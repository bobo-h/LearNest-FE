import React from "react";
import { Box, Typography } from "@mui/material";

const UnitsEditorLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "background.default",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        학습 설정 하는 곳
      </Typography>
    </Box>
  );
};

export default UnitsEditorLayout;
