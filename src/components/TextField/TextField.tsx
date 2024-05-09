import Error from "../Error";
import Label from "../Label";
import React, {useId} from "react";
import InputText from "../InputText";
import useStyles from "@/hooks/useStyles";
import style from "./TextField.module.scss";
import {TextFieldProps, TextFieldRolesEnum} from "./TextField.types";

const TextField: React.FC<TextFieldProps> = ({
  className,
  value,
  error,
  label,
  required,
  ...props
}) => {
  const {s} = useStyles();
  const id = useId();

  const classes = s([className, style.container]);

  return (
    <div className={classes} role={TextFieldRolesEnum.TEXTFIELD}>
      <Label id={id} label={label} error={!!error} required={required} />
      <InputText
        id={id}
        value={value}
        error={!!error}
        required={required}
        {...props}
      />
      <Error error={error} />
    </div>
  );
};

export default TextField;
