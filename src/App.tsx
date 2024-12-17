import React from 'react';
import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/appRouter';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
};

export default App;
