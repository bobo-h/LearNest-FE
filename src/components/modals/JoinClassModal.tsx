import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useJoinClass } from "../../hooks/useInvites";

interface JoinClassModalProps {
  open: boolean;
  onClose: () => void;
}

const JoinClassModal: React.FC<JoinClassModalProps> = ({ open, onClose }) => {
  const [inviteLink, setInviteLink] = useState<string>("");
  const { mutate: joinClass, isPending } = useJoinClass();

  useEffect(() => {
    if (!open) {
      setInviteLink("");
    }
  }, [open]);

  const handleJoin = () => {
    if (inviteLink.trim() === "") {
      alert("초대 링크를 입력해주세요.");
      return;
    }
    try {
      const urlParts = inviteLink.split("/");
      const classId = parseInt(urlParts[urlParts.length - 3], 10);
      const token = urlParts[urlParts.length - 1];

      if (isNaN(classId) || !token) {
        alert("초대 링크가 올바르지 않습니다.");
        return;
      }

      joinClass(
        { classId, token },
        {
          onSuccess: () => {
            alert("클래스 참가에 성공했습니다!");
            setInviteLink("");
            onClose();
          },
          onError: (error: any) => {
            if (error.response?.data?.message) {
              alert(error.response.data.message);
            } else {
              alert("클래스 참가에 실패했습니다. 다시 시도해주세요.");
            }
          },
        }
      );
    } catch (error) {
      console.error("초대 링크 파싱 오류:", error);
      alert("초대 링크가 올바르지 않습니다.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>초대 링크 입력</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ marginBottom: "16px" }}>
          초대 링크를 입력하여 클래스에 참가하세요.
        </Typography>
        <TextField
          fullWidth
          label="초대 링크"
          variant="outlined"
          value={inviteLink}
          onChange={(e) => setInviteLink(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          취소
        </Button>
        <Button
          onClick={handleJoin}
          variant="contained"
          color="primary"
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={20} /> : null}
        >
          참가하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinClassModal;
