import useUser from "@/hooks/useUser";
import Error from "@/components/Error";
import Button from "@/components/Button";
import style from "./RegisterForm.module.scss";
import TextField from "@/components/TextField";
import EmailField from "@/components/EmailField";
import PasswordField from "@/components/PasswordField";
import useErrorMessages from "@/hooks/useErrorMessages";
import React, {useEffect, useMemo, useState} from "react";
import useFormEmptyFields from "@/hooks/useFormEmptyFields";
import {FirebaseError} from "firebase/app";

const RegisterForm: React.FC<{onAuthSwitch: () => void}> = ({onAuthSwitch}) => {
  const {register} = useUser();
  const {getErrorMessage} = useErrorMessages();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const [error, setError] = useState<string>();

  const [differentPasswords, setDifferentPasswords] = useState(false);

  const {isFieldEmpty, hasEmptyFields, setShowEmptyFields} = useFormEmptyFields(
    {
      name,
      email,
      password,
      passwordConfirmation,
    },
  );

  const isFormValid = useMemo(
    () =>
      !hasEmptyFields && isEmailValid && isPasswordValid && !differentPasswords,
    [hasEmptyFields, isEmailValid, isPasswordValid, differentPasswords],
  );

  const onSubmit = async () => {
    setShowEmptyFields(true);

    if (!isFormValid) return;
    try {
      await register(email, password, name);
    } catch (e) {
      if (e instanceof FirebaseError) setError(getErrorMessage(e));
    }
  };

  useEffect(() => {
    setDifferentPasswords(password !== passwordConfirmation);
  }, [password, passwordConfirmation]);

  return (
    <div className={style.container}>
      <TextField
        value={name}
        label="Ton petit nom"
        placeholder="ex :Josh"
        onChange={(e) => setName(e.target.value)}
        error={isFieldEmpty("name") ? "Ce champ est obligatoire" : undefined}
      />
      <EmailField
        value={email}
        label="Email d’influenceur"
        placeholder="ex : josh.grosbg@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
        error={isFieldEmpty("email") ? "Ce champ est obligatoire" : undefined}
        onValidation={setIsEmailValid}
      />
      <PasswordField
        value={password}
        label="Mot de passe impossible à retenir"
        placeholder="************"
        onChange={(e) => setPassword(e.target.value)}
        error={
          isFieldEmpty("password") ? "Ce champ est obligatoire" : undefined
        }
        onValidation={setIsPasswordValid}
      />
      <PasswordField
        value={passwordConfirmation}
        label="Retape le mot de passe"
        placeholder="************"
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        noError
        error={
          isFieldEmpty("passwordConfirmation")
            ? "Ce champ est obligatoire"
            : differentPasswords
              ? "Les mots de passe ne correspondent pas"
              : undefined
        }
      />
      <Button onClick={onSubmit}>M’inscrire</Button>

      <Error error={error} />

      <div className={style.authSwitch}>
        <p>Déjà un compte ?</p>
        <button onClick={onAuthSwitch}>S’identifier</button>
      </div>
    </div>
  );
};

export default RegisterForm;
