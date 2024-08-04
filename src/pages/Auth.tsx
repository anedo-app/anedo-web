import React from "react";
import AuthModule from "@/modules/AuthModule";
import {Navigate} from "react-router-dom";

const Auth: React.FC = () => {
  if (localStorage.getItem("user")) return <Navigate to="/" replace />;

  return <AuthModule />;
};

export default Auth;
