import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px 16px 16px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src="/LogoName.png"
          alt="LearNest Logo"
          sx={{ height: 50, cursor: "pointer", marginRight: 8 }}
          onClick={() => navigate("/")}
        />
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Typography
            variant="subtitle1"
            sx={{ cursor: "pointer" }}
            onClick={() => console.log("기능 클릭됨")}
          >
            기능
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ cursor: "pointer" }}
            onClick={() => console.log("요금 클릭됨")}
          >
            요금
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "16px" }}>
        <Button variant="text" onClick={() => navigate("/login")}>
          로그인
        </Button>
        <Button variant="contained" onClick={() => navigate("/signup")}>
          시작하기
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
