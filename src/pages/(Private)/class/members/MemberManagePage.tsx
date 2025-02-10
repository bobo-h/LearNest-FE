import React from "react";
import { Box, Typography } from "@mui/material";

const MemberManagePage: React.FC = () => {
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
        클래스 멤버 별 과제 현황 확인하는 곳
      </Typography>
    </Box>
  );
};

export default MemberManagePage;
