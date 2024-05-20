import Error from "../Error";
import Label from "../Label";
import InputText from "../InputText";
import useStyles from "@/hooks/useStyles";
import style from "./EmailField.module.scss";
import React, {useEffect, useId, useMemo, useState} from "react";
import {EmailFieldProps, EmailFieldRolesEnum} from "./EmailField.types";

const EmailField: React.FC<EmailFieldProps> = ({
  className,
  value,
  error: externalError,
  label,
  required,
  onError,
  disabled,
  ...props
}) => {
  const {s} = useStyles();
  const id = useId();

  const classes = s([className, style.container]);

  const [internalError, setInternalError] = useState<string | undefined>();

  const emailError = () => {
    if (!value) return "";
    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return "This is not a valid email";
  };

  useEffect(() => {
    const e = emailError();
    if (e) setInternalError(e);
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
    <div className={classes} role={EmailFieldRolesEnum.FIELD}>
      <Label id={id} label={label} error={hasError} required={required} />
      <InputText
        id={id}
        value={value}
        error={hasError}
        required={required}
        type="email"
        disabled={disabled}
        {...props}
      />
      <Error error={errorText} />
    </div>
  );
};

export default EmailField;
