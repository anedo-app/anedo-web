import Logo from "@/components/Logo";
import React, {useState} from "react";
import Button from "@/components/Button";
import style from "./AuthModule.module.scss";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import {GoogleLogoIcon} from "@/Icons";

const AuthModule: React.FC = () => {
  const [authState, setAuthState] = useState<"login" | "register">("login");
  return (
    <div className={style.container}>
      <div className={style.heading}>
        <Logo className={style.logo} />
        <h1>Bienvenue</h1>
        <p>Identifiez vous ou créez un compte pour continuer. </p>
      </div>
      {authState === "register" && (
        <RegisterForm onAuthSwitch={() => setAuthState("login")} />
      )}
      {authState === "login" && (
        <LoginForm onAuthSwitch={() => setAuthState("register")} />
      )}

      <hr className={style.divider} />

      <Button icon={GoogleLogoIcon} className={style.google}>
        Continuer avec Google
      </Button>
    </div>
  );
};

export default AuthModule;
