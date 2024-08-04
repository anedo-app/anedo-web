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
  variant = "primary",
  size = "normal",
  icon: Icon,
  loading,
  pushed,
  ...props
}) => {
  const {s} = useStyles();

  const classes = s([
    className,
    style.buttonContainer,
    style[size],
    style[variant],
    {
      [style.disabled]: disabled,
      [style.loading]: loading,
      [style.pushed]: disabled || pushed,
    },
  ]);

  const content = () => {
    return (
      <>
        {loading ? (
          <div className={style.loader} />
        ) : (
          Icon && (
            <Icon
              size={size === "small" ? 16 : 24}
              color="currentColor"
              role={ButtonRolesEnum.ICON}
            />
          )
        )}
        {children && <span className={style.content}>{children}</span>}
      </>
    );
  };

  if (href)
    return (
      <a
        className={classes}
        href={href}
        target={target}
        role={ButtonRolesEnum.LINK}
        {...props}
      >
        {content()}
      </a>
    );

  const canClick = () => !disabled || !onClick;

  const onUserClick = () => {
    if (!canClick() || !onClick || pushed || disabled || loading) return;
    onClick();
  };

  return (
    <button
      onClick={onUserClick}
      className={classes}
      disabled={disabled}
      role={ButtonRolesEnum.BUTTON}
      {...props}
    >
      {content()}
    </button>
  );
};

export default Button;
