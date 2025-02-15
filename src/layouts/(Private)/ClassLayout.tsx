import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  Outlet,
  useNavigate,
  useLocation,
  useParams,
  matchPath,
} from "react-router-dom";
import { useClassContext } from "../../contexts/ClassContext";
import { CLASS_ROLES } from "constants/role";
import EditClassMemberModal from "../../components/modals/EditClassMemberModal";

const ClassLayout: React.FC = () => {
  const { selectedClass } = useClassContext();
  const { classId } = useParams<{ classId: string }>();

  const [isMemberModalOpen, setMemberModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const editUnitsLayoutRoute = matchPath(
    `/app/classes/${classId}/units/*`,
    location.pathname
  );
  const manageMemberLayoutRoute = matchPath(
    `/app/classes/${classId}/members/*`,
    location.pathname
  );

  const isInstructor = selectedClass?.members?.some(
    (member) => member.role === CLASS_ROLES.INSTRUCTOR
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Box>
          <Typography variant="h6">{selectedClass?.name}</Typography>
          {selectedClass?.description && (
            <Typography
              variant="body2"
              sx={{ color: "primary.contrastText", opacity: 0.8 }}
            >
              {selectedClass.description}
            </Typography>
          )}
        </Box>
        {editUnitsLayoutRoute && isInstructor && (
          <Button variant="contained" onClick={() => navigate("units-edit")}>
            학습 설정
          </Button>
        )}
        {manageMemberLayoutRoute && isInstructor && (
          <Button variant="contained" onClick={() => setMemberModalOpen(true)}>
            멤버 설정
          </Button>
        )}
      </Box>
      <Box sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Box>
      <EditClassMemberModal
        open={isMemberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        classId={Number(classId)}
      />
    </Box>
  );
};

export default ClassLayout;
