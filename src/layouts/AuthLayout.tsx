import React from "react";
import { Box, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f5f7",
        padding: "16px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "32px",
        }}
        onClick={() => navigate("/")}
      >
        LearNest
      </Typography>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
