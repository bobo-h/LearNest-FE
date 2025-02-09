import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Typography, Button, IconButton, Chip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Unit, Subunit, Assignment } from "../../../../types/unitTypes";
import FormInput from "../../../../components/common/FormInput";
import FileInput from "../../../../components/common/FileInput";
import ContentInput from "../../../../components/common/ContentInput";
import EditAssignmentModal from "../../../../components/modals/EditAssignmentModal";

interface OutletContext {
  units: Unit[];
  setUnits: Dispatch<SetStateAction<Unit[]>>;
  selectedSubunitId: number | null;
}

const EditSubunitDetailPage: React.FC = () => {
  const { units, setUnits, selectedSubunitId } =
    useOutletContext<OutletContext>();
  const { control, reset } = useForm();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const currentSubunit = units
    .flatMap((unit) => unit.subunits)
    .find((subunit) => subunit.id === selectedSubunitId);

  useEffect(() => {
    if (currentSubunit) {
      reset({
        name: currentSubunit.name || "",
        description: currentSubunit.description || "",
        content: currentSubunit.content || null,
        materials_path: currentSubunit.materials_path || "",
      });
    }
  }, [reset, currentSubunit]);

  const handleChange = (
    field: keyof Subunit,
    value: string | object | null
  ) => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === currentSubunit?.unit_id
          ? {
              ...unit,
              subunits: unit.subunits.map((subunit) =>
                subunit.id === selectedSubunitId
                  ? {
                      ...subunit,
                      [field]: value,
                      type: subunit.type || "update",
                    }
                  : subunit
              ),
            }
          : unit
      )
    );
  };

  const openAddAssignmentModal = () => {
    setSelectedAssignment(null);
    setModalOpen(true);
  };

  const openEditAssignmentModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setModalOpen(true);
  };

  const handleSaveAssignment = (
    assignmentData: Omit<Assignment, "subunit_id">
  ) => {
    if (!currentSubunit) return;

    const updatedAssignment: Assignment = {
      ...assignmentData,
      subunit_id: currentSubunit.id,
      id: selectedAssignment ? selectedAssignment.id : Date.now(),
    };

    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === currentSubunit.unit_id
          ? {
              ...unit,
              subunits: unit.subunits.map((subunit) =>
                subunit.id === selectedSubunitId
                  ? {
                      ...subunit,
                      assignments: subunit.assignments
                        ? [
                            ...subunit.assignments.filter(
                              (a) => a.id !== updatedAssignment.id
                            ),
                            updatedAssignment,
                          ]
                        : [updatedAssignment],
                      type: subunit.type || "update",
                    }
                  : subunit
              ),
            }
          : unit
      )
    );

    setModalOpen(false);
  };

  const handleDeleteAssignment = (assignmentId: number, isNew: boolean) => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === currentSubunit?.unit_id
          ? {
              ...unit,
              subunits: unit.subunits.map((subunit) =>
                subunit.id === selectedSubunitId
                  ? {
                      ...subunit,
                      assignments: subunit.assignments
                        ? subunit.assignments
                            .map((assignment) =>
                              assignment.id === assignmentId
                                ? isNew
                                  ? undefined
                                  : { ...assignment, type: "delete" }
                                : assignment
                            )
                            .filter((a): a is Assignment => Boolean(a))
                        : [],
                      type: subunit.type || "update",
                    }
                  : subunit
              ),
            }
          : unit
      )
    );
  };

  if (!currentSubunit) {
    return <Typography>소단원을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        소단원 상세 정보
      </Typography>
      <FormInput
        name="name"
        control={control}
        label="소단원 이름"
        rules={{ required: "소단원 이름을 입력해주세요." }}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <FormInput
        name="description"
        control={control}
        label="간단한 소단원 설명"
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <ContentInput
        name="content"
        control={control}
        label="소단원 내용"
        initialContent={currentSubunit.content || null}
        onChange={(deltaContent) => {
          handleChange("content", deltaContent);
        }}
      />

      <FileInput
        name="materials_path"
        control={control}
        label="자료 업로드"
        // onChange={(e) => handleChange("materials_path", e.target.value)}
      />

      <Button
        variant="outlined"
        sx={{ marginTop: 2 }}
        onClick={openAddAssignmentModal}
      >
        과제 추가
      </Button>
      <Box sx={{ marginTop: 2 }}>
        {currentSubunit.assignments?.map(
          (assignment, index) =>
            assignment.type !== "delete" && (
              <Box
                key={assignment.id}
                sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
              >
                <Chip label={`과제${index + 1}`} sx={{ marginRight: 1 }} />
                <Typography sx={{ flexGrow: 1 }}>{assignment.title}</Typography>
                <IconButton onClick={() => openEditAssignmentModal(assignment)}>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() =>
                    handleDeleteAssignment(
                      assignment.id,
                      assignment.type === "create"
                    )
                  }
                >
                  <Delete />
                </IconButton>
              </Box>
            )
        )}
      </Box>
      <EditAssignmentModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAssignment}
        assignment={selectedAssignment}
      />
    </Box>
  );
};

export default EditSubunitDetailPage;
