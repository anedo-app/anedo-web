import React from "react";
import Home from "./pages/Home";
import useEnv from "./hooks/useEnv";
import Layout from "@/components/Layout";
import WaitingScreen from "./pages/WaitingScreen";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const HiddenRoutes = () => {
  const {isDev} = useEnv();
  if (isDev)
    return (
      <>
        <Route index element={<Home />} />
        <Route path="/waiting" element={<WaitingScreen />} />
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
          {HiddenRoutes()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
