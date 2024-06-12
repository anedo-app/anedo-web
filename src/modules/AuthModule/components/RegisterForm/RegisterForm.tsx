import Button from "@/components/Button";
import style from "./RegisterForm.module.scss";
import TextField from "@/components/TextField";
import EmailField from "@/components/EmailField";
import PasswordField from "@/components/PasswordField";
import React, {useEffect, useMemo, useState} from "react";
import useFormEmptyFields from "@/hooks/useFormEmptyFields";

const RegisterForm: React.FC<{onAuthSwitch: () => void}> = ({onAuthSwitch}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

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

  const onSubmit = () => {
    setShowEmptyFields(true);

    if (!isFormValid) return;

    console.warn("submit", {name, email, password, passwordConfirmation});
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
      <div className={style.authSwitch}>
        <p>Déjà un compte ?</p>
        <button onClick={onAuthSwitch}>S’identifier</button>
      </div>
    </div>
  );
};

export default RegisterForm;
