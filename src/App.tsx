import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Rules from "./pages/Rules";
import useEnv from "./hooks/useEnv";
import useUser from "./hooks/useUser";
import Profile from "./pages/Profile";
import Layout from "@/components/Layout";
import WaitingScreen from "./pages/WaitingScreen";
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {user} = useUser();

  if (!user) return <Navigate to="/auth" replace />;
  return children;
};
const AuthRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {user} = useUser();

  if (user) return <Navigate to="/" replace />;
  return children;
};

const AppRouter = () => {
  const {isDev} = useEnv();
  if (isDev)
    return (
      <>
        <Route
          path="auth"
          element={
            <AuthRoute>
              <Routes>
                <Route path="/" element={<Auth />} />
              </Routes>
            </AuthRoute>
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/profile" element={<Profile />} />
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
    <>
      <ToastContainer position="top-center" autoClose={5000} theme="colored" />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>{AppRouter()}</Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
