import Logo from "@/components/Logo";
import React, {useState} from "react";
import useUser from "@/hooks/useUser";
import Button from "@/components/Button";
import style from "./AuthModule.module.scss";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import {GoogleLogoIcon} from "@/Icons";
import {FirebaseError} from "firebase/app";

const AuthModule: React.FC = () => {
  const {loginWithGoogle} = useUser();
  const [authState, setAuthState] = useState<"login" | "register">("login");

  const googleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (e) {
      if (e instanceof FirebaseError) console.error(e.code, e.message);
    }
  };

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

      <Button
        icon={GoogleLogoIcon}
        className={style.google}
        onClick={googleLogin}
      >
        Continuer avec Google
      </Button>
    </div>
  );
};

export default AuthModule;
