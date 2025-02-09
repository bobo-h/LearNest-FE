import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useInviteClass } from "../../hooks/useInvites";

interface InviteClassModalProps {
  open: boolean;
  onClose: () => void;
  classId: number;
}

const InviteClassModal: React.FC<InviteClassModalProps> = ({
  open,
  onClose,
  classId,
}) => {
  const [inviteLink, setInviteLink] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const { mutate: createInvite, isPending } = useInviteClass();

  useEffect(() => {
    if (!open) {
      setInviteLink("");
      setExpiresAt("");
    }
  }, [open]);

  const handleCreateInvite = () => {
    createInvite(classId, {
      onSuccess: (data) => {
        setInviteLink(data.inviteLink);
        setExpiresAt(data.expires_at);
      },
      onError: (error: any) => {
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("초대 링크 생성에 실패했습니다.");
        }
      },
    });
  };

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      alert("초대 링크가 복사되었습니다!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>초대 링크 생성</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Box
            sx={{
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: inviteLink ? "#f9f9f9" : "#fff",
              textAlign: "center",
            }}
          >
            {inviteLink ? (
              <TextField fullWidth value={inviteLink} variant="outlined" />
            ) : (
              <Typography variant="body1" color="text.secondary">
                초대 링크가 여기에 표시됩니다.
              </Typography>
            )}
          </Box>
          {expiresAt && (
            <Typography variant="body2" color="text.secondary">
              만료일: {new Date(expiresAt).toLocaleString()}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {inviteLink ? (
          <Button onClick={handleCopyLink} variant="contained" color="primary">
            복사하기
          </Button>
        ) : (
          <Button
            onClick={handleCreateInvite}
            variant="contained"
            color="primary"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={20} /> : null}
          >
            생성하기
          </Button>
        )}
        <Button onClick={onClose} color="secondary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteClassModal;
