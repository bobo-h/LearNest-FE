import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes/AppRouter";
import CustomQueryClientProvider from "contexts/QueryClientProvider";

const App: React.FC = () => {
  return (
    <CustomQueryClientProvider>
      <AuthProvider>
        <RouterProvider router={AppRouter} />
      </AuthProvider>
    </CustomQueryClientProvider>
  );
};

export default App;
