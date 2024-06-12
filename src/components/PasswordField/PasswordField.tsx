import Error from "../Error";
import Label from "../Label";
import Button from "../Button";
import InputText from "../InputText";
import useStyles from "@/hooks/useStyles";
import style from "./PasswordField.module.scss";
import React, {useEffect, useId, useMemo, useState} from "react";
import {EyeIcon, EyeOffIcon} from "@/Icons";
import {
  PasswordFieldErrorEnum,
  PasswordFieldProps,
  PasswordFieldRolesEnum,
} from "./PasswordField.types";

const PasswordErrorsWording = {
  short: "The password must be at least 8 characters long",
  uppercase: "The password must contain at least one uppercase letter",
  lowercase: "The password must contain at least one lowercase letter",
  number: "The password must contain at least one number",
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  className,
  value,
  error: externalError,
  label,
  required,
  disabled,
  noError,
  onError,
  onValidation,
  ...props
}) => {
  const {s} = useStyles();
  const id = useId();

  const classes = s([className, style.container]);

  const [showPassword, setShowPassword] = useState(false);

  const [internalError, setInternalError] = useState<string | undefined>();

  const passwordError = () => {
    if (!value || noError) return "";
    if (value.length < 8) return PasswordFieldErrorEnum.SHORT;
    if (!/[A-Z]/.test(value)) return PasswordFieldErrorEnum.UPPERCASE;
    if (!/[a-z]/.test(value)) return PasswordFieldErrorEnum.LOWERCASE;
    if (!/[0-9]/.test(value)) return PasswordFieldErrorEnum.NUMBER;
  };

  useEffect(() => {
    const e = passwordError();

    onValidation?.(!e);

    if (e) setInternalError(PasswordErrorsWording[e]);
    else setInternalError(undefined);

    if (onError) onError(e);
  }, [value]);

  const hasError = useMemo(
    () => !disabled && (!!internalError || !!externalError),
    [disabled, internalError, externalError],
  );

  const errorText = useMemo(() => {
    if (disabled) return "";
    if (internalError) return internalError;
    if (externalError) return externalError;
    return "";
  }, [disabled, internalError, externalError]);

  return (
    <div className={classes} role={PasswordFieldRolesEnum.FIELD}>
      <Label id={id} label={label} error={hasError} required={required} />
      <div className={style.input}>
        <InputText
          id={id}
          value={value}
          error={hasError}
          required={required}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          {...props}
        />
        {!disabled && (
          <Button
            icon={showPassword ? EyeOffIcon : EyeIcon}
            size="small"
            onClick={() => setShowPassword((e) => !e)}
          />
        )}
      </div>
      <Error error={errorText} />
    </div>
  );
};

export default PasswordField;
