import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import EditClassListModal from "./EditClassListModal";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const [openClassList, setOpenClassList] = useState(false);

  const handleLogout = () => {
    logout();
    alert("로그아웃되었습니다.");
    onClose();
  };

  const handleOpenClassList = () => {
    setOpenClassList(true);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "280px",
            borderRadius: "12px",
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", pb: 1 }}>
          프로필
        </DialogTitle>
        <DialogContent
          sx={{
            textAlign: "center",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="/profile-pic-placeholder.jpg"
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <Typography variant="h6" sx={{ mb: 2 }}>
            {user?.name}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 2,
            "& > *": {
              margin: "0 9px",
              width: "90%",
            },
          }}
        >
          <Button variant="contained" fullWidth>
            내 정보 수정
          </Button>
          <Button variant="contained" fullWidth onClick={handleOpenClassList}>
            나의 클래스
          </Button>
          <Button variant="outlined" fullWidth onClick={handleLogout}>
            로그아웃
          </Button>
          <Button fullWidth onClick={handleClose} sx={{ color: "gray" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      {/* 나의 클래스 모달 */}
      <EditClassListModal
        open={openClassList}
        onClose={() => setOpenClassList(false)}
      />
    </>
  );
};

export default ProfileModal;
