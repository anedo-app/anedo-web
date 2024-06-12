import React from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import useEnv from "./hooks/useEnv";
import useUser from "./hooks/useUser";
import Page404 from "./pages/Page404";
import Layout from "@/components/Layout";
import WaitingScreen from "./pages/WaitingScreen";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const user = useUser();

  if (!user) return <Navigate to="/auth" replace />;
  return children;
};
const AuthRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const user = useUser();

  if (user) return <Navigate to="/" replace />;
  return children;
};

const AppRouter = () => {
  const {isDev} = useEnv();
  if (isDev)
    return (
      <>
        <Route path="/*" element={<Page404 />} />
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/waiting" element={<WaitingScreen />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </>
    );
  else
    return (
      <>
        <Route index element={<WaitingScreen />} />
        <Route path="/*" element={<WaitingScreen />} />
      </>
    );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {AppRouter()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
