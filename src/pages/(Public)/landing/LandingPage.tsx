import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "170px 16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1000px",
          marginBottom: "80px",
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", marginBottom: "16px" }}
          >
            학습의 경계를 허무는 시작점,
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            모든 배움의 순간을 연결하는 곳.
          </Typography>
        </Box>

        <Box
          component="img"
          src="/Logo.png"
          alt="LearNest Logo"
          sx={{ height: "280px", margin: 8 }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: "80px", marginTop: "16px" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{ flex: 1, height: "60px", width: "200px", fontSize: "20px" }}
        >
          생성하기
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/signup")}
          sx={{ flex: 1, height: "60px", width: "200px", fontSize: "20px" }}
        >
          참여하기
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
