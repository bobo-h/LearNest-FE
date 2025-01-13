import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ClassManagementLayout from "layouts/ClassManagementLayout";
import UnitsEditorLayout from "./../layouts/UnitsEditorLayout";
import LandingPage from "../pages/(Public)/landing/LandingPage";
import LoginPage from "../pages/(Auth)/login/LoginPage";
import SignupPage from "../pages/(Auth)/signup/SignupPage";
import PrivateRoute from "./PrivateRoute";
import ClassPromptPage from "../pages/(Private)/classPrompt/ClassPromptPage";
import AdminDashboardPage from "../pages/(Private)/adminDashboard/AdminDashboardPage";
import MemberManagePage from "./../pages/(Private)/classManagement/MemberManagePage";
import UnitsManagePage from "./../pages/(Private)/classManagement/UnitsManagePage";
import EditUnitDetailPage from "./../pages/(Private)/classManagement/unitsEditor/EditUnitDetailPage";
import EditSubunitDetailPage from "./../pages/(Private)/classManagement/unitsEditor/EditSubunitDetailPage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ path: "", element: <LandingPage /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
  {
    path: "/app",
    element: <PrivateLayout />,
    children: [
      { path: "main", element: <ClassPromptPage /> },
      {
        path: "class-management/:classId",
        element: <ClassManagementLayout />,
        children: [
          { path: "members", element: <MemberManagePage /> },
          { path: "units", element: <UnitsManagePage /> },
          {
            path: "units-edit",
            element: <UnitsEditorLayout />,
            children: [
              { path: "unit/:unitId/detail", element: <EditUnitDetailPage /> },
              {
                path: "unit/:unitId/subunit/:subunitId/detail",
                element: <EditSubunitDetailPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <PrivateRoute allowedRoles={["admin"]} />,
        children: [{ path: "", element: <AdminDashboardPage /> }],
      },
    ],
  },
]);

export default AppRouter;
