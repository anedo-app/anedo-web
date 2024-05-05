import React from "react";
import style from "./Label.module.scss";
import useStyles from "@/hooks/useStyles";
import {LabelProps, LabelRolesEnum} from "./Label.types";

const Label: React.FC<LabelProps> = ({
  className,
  disabled,
  error,
  id,
  label,
  required,
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
    label && (
      <label htmlFor={id} className={classes} role={LabelRolesEnum.LABEL}>
        {label}{" "}
        {required && (
          <span className={style.required} role={LabelRolesEnum.REQUIRED}>
            *
          </span>
        )}
      </label>
    )
  );
};

export default Label;
