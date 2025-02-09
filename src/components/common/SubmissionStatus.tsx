import React, { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { isStudent } from "../../utils/roleUtils";
import { useClassContext } from "../../contexts/ClassContext";
import { useGetSubmission } from "../../hooks/useSubmission";
import SubmissionStatusChip from "./SubmissionStatusChip";
import EditSubmissionModal from "../modals/EditSubmissionModal";

interface SubmissionStatusProps {
  assignmentId: number;
}

const SubmissionStatus: React.FC<SubmissionStatusProps> = ({
  assignmentId,
}) => {
  const { selectedClass } = useClassContext();
  const isUserStudent = isStudent(selectedClass);

  const { data: submission, isLoading } = useGetSubmission(
    selectedClass?.id!,
    assignmentId
  );

  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const handleOpenSubmitModal = () => setOpenSubmitModal(true);
  const handleCloseSubmitModal = () => setOpenSubmitModal(false);

  if (!selectedClass) return null;
  if (!isUserStudent) return null;
  if (isLoading) {
    return <CircularProgress size={20} />;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {!submission ? (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpenSubmitModal}
        >
          제출하기
        </Button>
      ) : submission.status !== "PASS" ? (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpenSubmitModal}
        >
          수정하기
        </Button>
      ) : null}
      {submission && (
        <SubmissionStatusChip status={submission.status ?? "PENDING"} />
      )}
      <EditSubmissionModal
        open={openSubmitModal}
        onClose={handleCloseSubmitModal}
        classId={selectedClass.id}
        assignmentId={assignmentId}
        submission={submission}
      />
    </Stack>
  );
};

export default SubmissionStatus;
