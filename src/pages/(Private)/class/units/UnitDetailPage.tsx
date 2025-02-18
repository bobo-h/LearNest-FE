import React, { useState } from "react";
import {
  Box,
  Typography,
  Link,
  Chip,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { Description } from "@mui/icons-material";
import { Unit, Subunit } from "../../../../types/unitTypes";
import { Assignment } from "../../../../types/assignmentTypes";
import { useOutletContext } from "react-router-dom";
import { useClassContext } from "../../../../contexts/ClassContext";
import { isStudent } from "../../../../utils/roleUtils";
import ContentInput from "../../../../components/common/ContentInput";
import AssignmentModal from "./../../../../components/modals/AssignmentModal";
import SubmissionStatus from "./../../../../components/common/SubmissionStatus";

interface OutletContext {
  selectedUnit: Unit | null;
  selectedSubunit: Subunit | null;
}

const UnitDetailPage: React.FC = () => {
  const { selectedUnit, selectedSubunit } = useOutletContext<OutletContext>();
  const { selectedClass } = useClassContext();

  const [openAssignmentModal, setOpenAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const handleOpenAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setOpenAssignmentModal(true);
  };

  const handleCloseAssignment = () => {
    setOpenAssignmentModal(false);
    setSelectedAssignment(null);
  };

  if (!selectedUnit) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h5">단원이 설정되지 않았습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ccc",
          height: "10%", // 화면의 10%만 차지
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {selectedUnit.name}
        </Typography>
        {selectedUnit.description && (
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {selectedUnit.description}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: 2,
          overflowY: "auto", // 소단원 내용이 길 경우 스크롤
        }}
      >
        {selectedSubunit ? (
          <>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              {selectedSubunit.name}
            </Typography>

            {selectedSubunit.description && (
              <Typography
                variant="body2"
                sx={{ opacity: 0.8, marginBottom: 2 }}
              >
                {selectedSubunit.description}
              </Typography>
            )}

            {selectedSubunit.content && (
              <ContentInput
                name="content"
                initialContent={selectedSubunit.content}
                readOnly={true}
              />
            )}

            {selectedSubunit.materials_path && (
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  첨부파일
                </Typography>
                <Link
                  href={selectedSubunit.materials_path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedSubunit.materials_path.split("/").pop() ||
                    "첨부파일"}
                </Link>
              </Box>
            )}
            {selectedSubunit.assignments &&
              selectedSubunit.assignments.length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    과제 목록
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {selectedSubunit.assignments.map(
                      (assignment, index) =>
                        assignment.type !== "delete" && (
                          <Box
                            key={assignment.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: 1,
                              borderRadius: 1,
                              backgroundColor: "#f9f9f9",
                            }}
                          >
                            <Chip
                              label={`과제${index + 1}`}
                              sx={{ marginRight: 1 }}
                              color="default"
                              variant="outlined"
                            />
                            <Typography sx={{ flexGrow: 1 }}>
                              {assignment.title}
                            </Typography>
                            <Tooltip title="과제 보기">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenAssignment(assignment)}
                              >
                                <Description fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            {isStudent(selectedClass) && (
                              <SubmissionStatus assignmentId={assignment.id} />
                            )}
                          </Box>
                        )
                    )}
                  </Box>
                </Box>
              )}
          </>
        ) : (
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            소단원이 설정되지 않았습니다.
          </Typography>
        )}
      </Box>
      {selectedAssignment && (
        <AssignmentModal
          open={openAssignmentModal}
          onClose={handleCloseAssignment}
          assignment={selectedAssignment}
        />
      )}
    </Box>
  );
};

export default UnitDetailPage;
