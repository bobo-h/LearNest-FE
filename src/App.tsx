import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ClassProvider } from "./contexts/ClassContext";
import AppRouter from "./routes/AppRouter";
import CustomQueryClientProvider from "contexts/QueryClientProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ClassProvider>
        <CustomQueryClientProvider>
          <RouterProvider router={AppRouter} />
        </CustomQueryClientProvider>
      </ClassProvider>
    </AuthProvider>
  );
};

export default App;
