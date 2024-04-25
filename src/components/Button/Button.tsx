import React from "react";
import style from "./Button.module.scss";
import useStyles from "@/hooks/useStyles";
import {ButtonProps, ButtonRolesEnum} from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  href,
  target,
  disabled,
}) => {
  const {s} = useStyles();

  const classes = s([
    className,
    style.buttonContainer,
    {
      [style.disabled]: disabled,
    },
  ]);

  const content = () => {
    return <span className={style.content}>{children}</span>;
  };

  if (href)
    return (
      <a
        className={classes}
        href={href}
        target={target}
        role={ButtonRolesEnum.LINK}
      >
        {content()}
      </a>
    );

  const canClick = () => !disabled;
  const onUserClick = () => canClick() && onClick && onClick();

  return (
    <button
      onClick={onUserClick}
      className={classes}
      disabled={disabled}
      role={ButtonRolesEnum.BUTTON}
    >
      {content()}
    </button>
  );
};

export default Button;
