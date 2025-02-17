import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { useGetUnitsWithDetails } from "../../../../hooks/useUnits";
import { useGetSubmissionsByMember } from "../../../../hooks/useSubmission";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import SubmissionStatus from "./../../../../components/common/SubmissionStatus";
import AssignmentModal from "./../../../../components/modals/AssignmentModal";
import FeedbackSubmissionModal from "./../../../../components/modals/FeedbackSubmissionModal";

const MemberManagePage: React.FC = () => {
  const { classId: class_id, userId: user_id } = useParams<{
    classId: string;
    userId: string;
  }>();

  const classId = Number(class_id);
  const userId = Number(user_id);

  const { data: unitsData, isLoading: isUnitsLoading } =
    useGetUnitsWithDetails(classId);
  const {
    data: submissionData,
    isLoading: isSubmissionsLoading,
    refetch,
  } = useGetSubmissionsByMember(classId, userId);

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(
    null
  );
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(
    null
  );
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleOpenAssignmentModal = (assignment: any) => {
    setSelectedAssignment(assignment);
    setIsAssignmentModalOpen(true);
  };

  const handleCloseAssignmentModal = () => {
    setSelectedAssignment(null);
    setIsAssignmentModalOpen(false);
  };

  const handleOpenFeedbackModal = (submission: any) => {
    setSelectedSubmission(submission);
    setIsFeedbackModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setSelectedSubmission(null);
    setIsFeedbackModalOpen(false);
  };

  const units = unitsData?.units ?? [];
  const submissions = submissionData?.submissions ?? [];

  const submissionsByAssignmentId = useMemo(() => {
    return submissions.reduce<Record<number, (typeof submissions)[number]>>(
      (acc, submission) => {
        acc[submission.assignment_id] = submission;
        return acc;
      },
      {}
    );
  }, [submissions]);

  if (isUnitsLoading || isSubmissionsLoading) {
    return <div>Loading...</div>;
  }

  if (units.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h5">
          클래스 관리에서 학습 설정을 해주세요.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>단원</TableCell>
              <TableCell>소단원</TableCell>
              <TableCell>학습률</TableCell>
              <TableCell>과제</TableCell>
              <TableCell>제출 상태(피드백)</TableCell>
              <TableCell>제출 일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((unit) => {
              const unitRowSpan = unit.subunits.reduce(
                (acc, subunit) => acc + (subunit.assignments?.length || 1),
                0
              );

              if (unit.subunits.length === 0) {
                return (
                  <TableRow key={unit.id}>
                    <TableCell>{unit.name}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                );
              }

              return unit.subunits.map((subunit, subunitIndex) => {
                const subunitRowSpan = subunit.assignments?.length || 1;
                const assignments = subunit.assignments ?? [];

                if (assignments.length === 0) {
                  return (
                    <TableRow key={subunit.id}>
                      {subunitIndex === 0 && (
                        <TableCell rowSpan={unitRowSpan}>{unit.name}</TableCell>
                      )}
                      <TableCell>{subunit.name}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  );
                }

                return assignments.map((assignment, index) => {
                  const latestSubmission =
                    submissionsByAssignmentId[assignment.id] || null;

                  return (
                    <TableRow key={assignment.id}>
                      {subunitIndex === 0 && index === 0 && (
                        <TableCell rowSpan={unitRowSpan}>{unit.name}</TableCell>
                      )}

                      {index === 0 && (
                        <TableCell rowSpan={subunitRowSpan}>
                          {subunit.name}
                        </TableCell>
                      )}
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Chip
                          label={`과제 ${index + 1}`}
                          color="default"
                          variant="filled"
                          onClick={() => handleOpenAssignmentModal(assignment)}
                          sx={{
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            backgroundColor: "primary.contrastText",
                            color: "primary.main",
                            border: "1px solid",
                            borderColor: "primary.main",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "primary.main",
                              color: "primary.contrastText",
                            },
                          }}
                        />
                      </TableCell>
                      {latestSubmission ? (
                        <>
                          <TableCell
                            onClick={() =>
                              handleOpenFeedbackModal(latestSubmission)
                            }
                          >
                            <SubmissionStatus
                              assignmentId={assignment.id}
                              submission={latestSubmission}
                            />
                          </TableCell>
                          <TableCell>
                            {dayjs(latestSubmission.updated_at).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>-</TableCell>
                          <TableCell>-</TableCell>
                        </>
                      )}
                    </TableRow>
                  );
                });
              });
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedAssignment && (
        <AssignmentModal
          open={isAssignmentModalOpen}
          onClose={handleCloseAssignmentModal}
          assignment={selectedAssignment}
        />
      )}

      {selectedSubmission && (
        <FeedbackSubmissionModal
          open={isFeedbackModalOpen}
          onClose={handleCloseFeedbackModal}
          classId={classId}
          assignmentId={selectedSubmission.assignment_id}
          submission={selectedSubmission}
        />
      )}
    </>
  );
};

export default MemberManagePage;
