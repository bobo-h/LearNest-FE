import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {
  useGetClassMembers,
  useRemoveClassMember,
} from "../../hooks/useClasses";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import ConfirmDialog from "./../common/ConfirmDialog";

interface ClassMemberModalProps {
  open: boolean;
  onClose: () => void;
  classId: number;
}

const EditClassMemberModal: React.FC<ClassMemberModalProps> = ({
  open,
  onClose,
  classId,
}) => {
  const { data: membersData, isLoading } = useGetClassMembers(classId);
  const { mutate: removeMember, isPending } = useRemoveClassMember();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleRemoveMember = (userId: number) => {
    setSelectedUserId(userId);
    setConfirmOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedUserId !== null) {
      removeMember(
        { classId, userId: selectedUserId },
        {
          onSuccess: () => {
            alert("멤버가 성공적으로 삭제되었습니다.");
            setConfirmOpen(false);
          },
        }
      );
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          클래스 멤버 관리
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : membersData?.members?.length ? (
            <List>
              {membersData.members.map((member) => (
                <ListItem
                  key={member.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveMember(member.user_id);
                      }}
                      disabled={isPending}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={member.user.name}
                    secondary={`역할: ${member.role}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography textAlign="center" color="textSecondary">
              멤버가 없습니다.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmRemove}
        title="멤버 내보내기"
        message="해당 멤버를 정말로 내보내시겠습니까?"
      />
    </>
  );
};

export default EditClassMemberModal;
