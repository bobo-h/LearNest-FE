import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Divider,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  useGetUserClasses,
  useDeleteClass,
  useLeaveClass,
} from "../../hooks/useClasses";

interface EditClassListModalProps {
  open: boolean;
  onClose: () => void;
}

const EditClassListModal: React.FC<EditClassListModalProps> = ({
  open,
  onClose,
}) => {
  const { data: classData, isLoading } = useGetUserClasses();
  const { mutate: deleteClass } = useDeleteClass();
  const { mutate: leaveClass } = useLeaveClass();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [confirmType, setConfirmType] = useState<"delete" | "leave" | null>(
    null
  );

  if (isLoading) return <Typography>로딩 중...</Typography>;

  const handleConfirmOpen = (classId: number, type: "delete" | "leave") => {
    setSelectedClassId(classId);
    setConfirmType(type);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setSelectedClassId(null);
    setConfirmType(null);
  };

  const handleConfirmAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (confirmType === "delete" && selectedClassId !== null) {
      deleteClass(selectedClassId);
    } else if (confirmType === "leave" && selectedClassId !== null) {
      leaveClass(selectedClassId);
    }
    handleConfirmClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            나의 클래스
          </Typography>

          <Box sx={{ my: 2, p: 2, bgcolor: "#F5F5F5", borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              생성한 클래스
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {classData?.created_classes.length ? (
              classData.created_classes.map((cls) => (
                <Paper
                  key={cls.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    my: 1,
                  }}
                  elevation={2}
                >
                  <Typography fontWeight="bold">{cls.name}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleConfirmOpen(cls.id, "delete")}
                  >
                    삭제
                  </Button>
                </Paper>
              ))
            ) : (
              <Typography color="textSecondary">
                생성한 클래스가 없습니다.
              </Typography>
            )}
          </Box>

          <Box sx={{ my: 2, p: 2, bgcolor: "#E3F2FD", borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              참가한 클래스
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {classData?.joined_classes.length ? (
              classData.joined_classes.map((cls) => (
                <Paper
                  key={cls.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    my: 1,
                  }}
                  elevation={2}
                >
                  <Typography fontWeight="bold">{cls.name}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirmOpen(cls.id, "leave");
                    }}
                  >
                    나가기
                  </Button>
                </Paper>
              ))
            ) : (
              <Typography color="textSecondary">
                참여한 클래스가 없습니다.
              </Typography>
            )}
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={onClose}
          >
            닫기
          </Button>
        </Box>

        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
          <DialogTitle>확인</DialogTitle>
          <DialogContent>
            <Typography>
              {confirmType === "delete"
                ? "해당 클래스를 정말로 삭제하시겠습니까?"
                : "해당 클래스를 정말로 나가시겠습니까?"}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleConfirmClose();
              }}
              color="primary"
            >
              취소
            </Button>
            <Button onClick={handleConfirmAction} variant="contained">
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Modal>
  );
};

export default EditClassListModal;
