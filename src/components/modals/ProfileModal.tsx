import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    onClose();
    logout();
    alert("로그아웃되었습니다.");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "65px",
        right: "15px",
        width: "240px",
        backgroundColor: "#FFF",
        color: "#000",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        zIndex: 10,
      }}
    >
      <Box sx={{ padding: "16px", textAlign: "center" }}>
        <Avatar
          src="/profile-pic-placeholder.jpg"
          sx={{ width: 60, height: 60, margin: "0 auto" }}
        />
        <Typography variant="h6" sx={{ marginTop: "8px" }}>
          {user?.name}
        </Typography>
      </Box>

      <Box sx={{ padding: "8px" }}>
        <Button variant="contained" fullWidth sx={{ marginBottom: "8px" }}>
          내 정보 수정
        </Button>
        <Button variant="contained" fullWidth sx={{ marginBottom: "8px" }}>
          클래스 관리
        </Button>
        <Button variant="outlined" fullWidth onClick={handleLogout}>
          로그아웃
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileModal;
