import React from "react";
import colors from "@/styles/colors";
import style from "./Error.module.scss";
import useStyles from "@/hooks/useStyles";
import {AlertCircleIcon} from "@/Icons";
import {ErrorProps, ErrorRolesEnum} from "./Error.types";

const Error: React.FC<ErrorProps> = ({className, error}) => {
  const {s} = useStyles();

  const classes = s([className, style.container]);

  return (
    error && (
      <span className={classes} role={ErrorRolesEnum.ERROR}>
        <AlertCircleIcon
          size={16}
          color={colors["orange-125"]}
          className={style.icon}
        />
        <p>{error}</p>
      </span>
    )
  );
};

export default Error;
