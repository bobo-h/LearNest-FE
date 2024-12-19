import React from "react";
import { Box, Typography } from "@mui/material";

const ClassList: React.FC = () => {
  return (
    <Box sx={{ padding: "8px" }}>
      <Typography>클래스 1</Typography>
      <Typography>클래스 2</Typography>
      <Typography>클래스 3</Typography>
    </Box>
  );
};

export default ClassList;
