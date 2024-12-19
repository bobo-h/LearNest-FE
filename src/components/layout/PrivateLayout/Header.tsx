import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        LearNest
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "#ccc" }}> </Avatar>
        <Typography sx={{ marginLeft: "8px" }}>User Name</Typography>
      </Box>
    </Box>
  );
};

export default Header;
