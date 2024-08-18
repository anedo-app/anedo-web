import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Join from "./pages/Join";
import Rules from "./pages/Rules";
import Party from "./pages/Party";
import useEnv from "./hooks/useEnv";
import useUser from "./hooks/useUser";
import Profile from "./pages/Profile";
import Layout from "@/components/Layout";
import MembersList from "./pages/MembersList";
import WaitingScreen from "./pages/WaitingScreen";
import {ToastContainer} from "react-toastify";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

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
        <Route path="/join/:partyId" element={<Join />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/party/:partyId" element={<Party />} />
                <Route path="/members-list" element={<MembersList />} />
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

const router = createBrowserRouter(
  createRoutesFromElements(<Route element={<Layout />}>{AppRouter()}</Route>),
);

const App: React.FC = () => {
  const {appVersion, isDev} = useEnv();
  return (
    <div className="root" id="rootTemplate">
      <React.StrictMode>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          theme="colored"
        />
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </React.StrictMode>
      <p className="version">
        {appVersion}
        {isDev && " dev"}
      </p>
    </div>
  );
};

export default App;
