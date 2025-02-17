import React, { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { isStudent } from "../../utils/roleUtils";
import { useClassContext } from "../../contexts/ClassContext";
import { useGetSubmission } from "../../hooks/useSubmission";
import SubmissionStatusChip from "./SubmissionStatusChip";
import EditSubmissionModal from "../modals/EditSubmissionModal";
import { Submission } from "types/submissionTypes";

interface SubmissionStatusProps {
  assignmentId: number;
  submission?: Submission;
}

const SubmissionStatus: React.FC<SubmissionStatusProps> = ({
  assignmentId,
  submission: passedSubmission,
}) => {
  const { selectedClass } = useClassContext();
  const { data: fetchedSubmission, isLoading } = useGetSubmission(
    selectedClass?.id!,
    assignmentId
  );
  const [openSubmitModal, setOpenSubmitModal] = useState(false);

  const isUserStudent = isStudent(selectedClass);
  const submission = passedSubmission || fetchedSubmission;
  const handleOpenSubmitModal = () => setOpenSubmitModal(true);
  const handleCloseSubmitModal = () => setOpenSubmitModal(false);

  if (!selectedClass) return null;
  if (isLoading && !passedSubmission) {
    return <CircularProgress size={20} />;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {isUserStudent && (
        <>
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
        </>
      )}
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
