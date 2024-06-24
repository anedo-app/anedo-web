import React, {useState} from "react";
import useUser from "@/hooks/useUser";
import Error from "@/components/Error";
import Button from "@/components/Button";
import style from "./LoginForm.module.scss";
import EmailField from "@/components/EmailField";
import PasswordField from "@/components/PasswordField";
import useErrorMessages from "@/hooks/useErrorMessages";
import useFormEmptyFields from "@/hooks/useFormEmptyFields";
import {FirebaseError} from "firebase/app";

const LoginForm: React.FC<{onAuthSwitch: () => void}> = ({onAuthSwitch}) => {
  const {getErrorMessage} = useErrorMessages();
  const {login} = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string>();

  const {isFieldEmpty, hasEmptyFields, setShowEmptyFields} = useFormEmptyFields(
    {
      email,
      password,
    },
  );

  const onSubmit = async () => {
    setShowEmptyFields(true);

    if (hasEmptyFields) return;
    try {
      await login(email, password);
    } catch (e) {
      if (e instanceof FirebaseError) setError(getErrorMessage(e));
    }
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

      <Error error={error} />

      <div className={style.authSwitch}>
        <p>Pas encore de compte ?</p>
        <button onClick={onAuthSwitch}>S’inscrire</button>
      </div>
    </div>
  );
};

export default LoginForm;
