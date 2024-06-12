import React, {useState} from "react";
import Button from "@/components/Button";
import style from "./LoginForm.module.scss";
import EmailField from "@/components/EmailField";
import PasswordField from "@/components/PasswordField";
import useFormEmptyFields from "@/hooks/useFormEmptyFields";
import {useCookies} from "react-cookie";

const LoginForm: React.FC<{onAuthSwitch: () => void}> = ({onAuthSwitch}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookie] = useCookies(["user"]);

  const {isFieldEmpty, hasEmptyFields, setShowEmptyFields} = useFormEmptyFields(
    {
      email,
      password,
    },
  );

  const onSubmit = () => {
    setShowEmptyFields(true);

    if (hasEmptyFields) return;

    setCookie("user", email);
  };

  return (
    <div className={style.container}>
      <EmailField
        value={email}
        label="Email d’influenceur"
        placeholder="josh.grosbg@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
        error={isFieldEmpty("email") ? "Ce champ est obligatoire" : undefined}
        noError
      />
      <PasswordField
        value={password}
        label="Ton mot de passe"
        placeholder="************"
        onChange={(e) => setPassword(e.target.value)}
        error={
          isFieldEmpty("password") ? "Ce champ est obligatoire" : undefined
        }
        noError
      />

      <Button onClick={onSubmit}>M’identifier</Button>
      <div className={style.authSwitch}>
        <p>Pas encore de compte ?</p>
        <button onClick={onAuthSwitch}>S’inscrire</button>
      </div>
    </div>
  );
};

export default LoginForm;
