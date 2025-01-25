import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/(Public)/PublicLayout";
import AuthLayout from "../layouts/(Auth)/AuthLayout";
import PrivateLayout from "../layouts/(Private)/PrivateLayout";
import ClassManagementLayout from "layouts/(Private)/ClassManagementLayout";
import EditUnitsLayout from "../layouts/(Private)/EditUnitsLayout";
import UnitsLayout from "../layouts/(Private)/UnitsLayout";
import LandingPage from "../pages/(Public)/landing/LandingPage";
import LoginPage from "../pages/(Auth)/login/LoginPage";
import SignupPage from "../pages/(Auth)/signup/SignupPage";
import PrivateRoute from "./PrivateRoute";
import ClassPromptPage from "../pages/(Private)/classPrompt/ClassPromptPage";
import AdminDashboardPage from "../pages/(Private)/adminDashboard/AdminDashboardPage";
import MemberManagePage from "./../pages/(Private)/classManagement/MemberManagePage";
import EditUnitDetailPage from "./../pages/(Private)/classManagement/units-edit/EditUnitDetailPage";
import EditSubunitDetailPage from "./../pages/(Private)/classManagement/units-edit/EditSubunitDetailPage";
import UnitDetailPage from "pages/(Private)/classManagement/units/UnitDetailPage";

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
          {
            path: "members",
            element: <MemberManagePage />,
          },
          {
            path: "units",
            element: <UnitsLayout />,
            children: [
              { path: ":unitId", element: <UnitDetailPage /> },
              {
                path: ":unitId/subunits/:subunitId",
                element: <UnitDetailPage />,
              },
            ],
          },
          {
            path: "units-edit",
            element: <EditUnitsLayout />,
            children: [
              { path: "units/:unitId", element: <EditUnitDetailPage /> },
              {
                path: "units/:unitId/subunits/:subunitId",
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
