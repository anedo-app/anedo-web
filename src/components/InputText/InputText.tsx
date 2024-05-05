import React from "react";
import useStyles from "@/hooks/useStyles";
import style from "./InputText.module.scss";
import {InputTextProps, InputTextRolesEnum} from "./InputText.types";

const InputText: React.FC<InputTextProps> = ({
  className,
  value,
  onChange,
  disabled,
  error,
  ...props
}) => {
  const {s} = useStyles();

  const classes = s([
    className,
    style.container,
    {
      [style.disabled]: disabled,
      [style.error]: error,
    },
  ]);

  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      className={classes}
      disabled={disabled}
      role={InputTextRolesEnum.INPUT}
    />
  );
};

export default InputText;
