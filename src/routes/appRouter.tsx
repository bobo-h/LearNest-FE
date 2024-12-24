import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import LandingPage from "../pages/(Public)/landing/LandingPage";
import LoginPage from "../pages/(Auth)/login/LoginPage";
import SignupPage from "../pages/(Auth)/signup/SignupPage";
import DashboardPage from "../pages/(Private)/dashboard/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import AdminDashboardPage from "./../pages/(Private)/adminDashboard/AdminDashboardPage";

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
    path: "/dashboard",
    element: <PrivateLayout />,
    children: [{ path: "", element: <DashboardPage /> }],
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
