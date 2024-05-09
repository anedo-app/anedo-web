import Error from "../Error";
import Label from "../Label";
import React, {useId} from "react";
import useStyles from "@/hooks/useStyles";
import TextArea from "../TextArea/TextArea";
import style from "./TextAreaField.module.scss";
import {
  TextAreaFieldProps,
  TextAreaFieldRolesEnum,
} from "./TextAreaField.types";

const TextAreaField: React.FC<TextAreaFieldProps> = ({
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
    <div className={classes} role={TextAreaFieldRolesEnum.TEXT_AREA_FIELD}>
      <Label id={id} label={label} error={!!error} required={required} />
      <TextArea
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

export default TextAreaField;
