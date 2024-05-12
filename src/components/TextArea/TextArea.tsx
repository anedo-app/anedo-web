import React from "react";
import useStyles from "@/hooks/useStyles";
import style from "./TextArea.module.scss";
import {TextAreaProps, TextAreaRolesEnum} from "./TextArea.types";

const TextArea: React.FC<TextAreaProps> = ({
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
    <textarea
      {...props}
      value={value}
      onChange={onChange}
      className={classes}
      disabled={disabled}
      role={TextAreaRolesEnum.TEXT_AREA}
    />
  );
};

export default TextArea;
