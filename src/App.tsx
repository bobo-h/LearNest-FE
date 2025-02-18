import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ClassProvider } from "contexts/ClassContext";
import AppRouter from "./routes/AppRouter";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ClassProvider>
        <RouterProvider router={AppRouter} />
      </ClassProvider>
    </AuthProvider>
  );
};

export default App;
