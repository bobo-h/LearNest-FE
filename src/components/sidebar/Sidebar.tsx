import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import { ExpandLess, ExpandMore, Add, Settings } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import ClassActionButton from "./ClassActionButton";
import { useClassContext } from "../../contexts/ClassContext";
import { useGetUserClasses } from "../../hooks/useClasses";
import { SidebarMenus } from "../../constants/menus";
import { MENU_IDS, SUBMENU_IDS } from "../../constants/menuItems";
import InviteClassModal from "../modals/InviteClassModal";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { selectClass } = useClassContext();
  const { data: classData, isLoading, error } = useGetUserClasses();
  const role = user?.role || "user";
  const { title, menus } = SidebarMenus[role];

  const [openSubItems, setOpenSubItems] = useState<Record<number, boolean>>({});
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleSubMenuToggle = (classId: number) => {
    setOpenSubItems((prev) => ({
      ...prev,
      [classId]: !prev[classId],
    }));
  };

  const handleSubMenuClick = (subMenuId: string, classId: number) => {
    const selectedClass = classData?.created_classes.find(
      (cls) => cls.id === classId
    );
    if (!selectedClass) return;

    selectClass(selectedClass);
    navigate(`/app/class-management/${classId}/${subMenuId}`);
  };

  const getClassData = (id: string) => {
    if (id === MENU_IDS.CREATED_CLASSES) {
      return classData?.created_classes || [];
    }
    if (id === MENU_IDS.JOINED_CLASSES) {
      return classData?.joined_classes || [];
    }
    return [];
  };

  const handleOpenInviteModal = (classId: number) => {
    setSelectedClassId(classId);
    setInviteModalOpen(true);
  };

  const handleCloseInviteModal = () => {
    setInviteModalOpen(false);
  };

  return (
    <Box
      sx={{
        width: "250px",
        height: "100%",
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        border: "1px solid #ccc",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        {title}
      </Typography>
      <List sx={{ flexGrow: 1, overflowY: "auto" }}>
        {menus.map((menu) => (
          <React.Fragment key={menu.id}>
            <Typography
              variant="subtitle1"
              sx={{
                p: 2,
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                borderRadius: "4px",
                mx: 2,
              }}
            >
              {menu.name}
            </Typography>

            <Box sx={{ px: 2 }}>
              {isLoading ? (
                <CircularProgress size={24} />
              ) : error ? (
                <Typography variant="body2" color="error">
                  데이터를 가져오는 중 오류가 발생했습니다.
                </Typography>
              ) : (
                <>
                  {getClassData(menu.id).length > 0 ? (
                    getClassData(menu.id).map((child: any) => (
                      <React.Fragment key={child.id}>
                        <ListItemButton
                          onClick={() => handleSubMenuToggle(child.id)}
                        >
                          <ListItemText primary={child.name} />
                          {menu.subMenu &&
                            menu.subMenu.length > 0 &&
                            (openSubItems[child.id] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            ))}
                        </ListItemButton>

                        <Collapse
                          in={openSubItems[child.id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ pl: 4 }}>
                            {menu.subMenu?.map((subMenu) => (
                              <ListItemButton
                                key={subMenu.id}
                                onClick={() =>
                                  handleSubMenuClick(subMenu.id, child.id)
                                }
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  "&:hover": {
                                    backgroundColor: "action.hover",
                                  },
                                }}
                              >
                                <ListItemText primary={subMenu.name} />
                                {subMenu.id === SUBMENU_IDS.MEMBERS && (
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenInviteModal(child.id);
                                    }}
                                    sx={{
                                      width: 25,
                                      height: 25,
                                      backgroundColor: "secondary.main",
                                      color: "secondary.contrastText",
                                      "&:hover": {
                                        backgroundColor: "secondary.dark",
                                      },
                                    }}
                                  >
                                    <Add sx={{ fontSize: "1rem" }} />
                                  </IconButton>
                                )}
                                {subMenu.id === SUBMENU_IDS.UNITS && (
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("클래스 설정");
                                    }}
                                    sx={{
                                      width: 25,
                                      height: 25,
                                      backgroundColor: "secondary.main",
                                      color: "secondary.contrastText",
                                      "&:hover": {
                                        backgroundColor: "secondary.dark",
                                      },
                                    }}
                                  >
                                    <Settings sx={{ fontSize: "1rem" }} />
                                  </IconButton>
                                )}
                              </ListItemButton>
                            ))}
                          </Box>
                        </Collapse>
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography variant="body2">항목이 없습니다.</Typography>
                  )}
                </>
              )}
            </Box>
          </React.Fragment>
        ))}
      </List>

      {selectedClassId && (
        <InviteClassModal
          open={isInviteModalOpen}
          onClose={handleCloseInviteModal}
          classId={selectedClassId}
        />
      )}

      {role === "user" && (
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          <ClassActionButton />
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
