import React, {useState} from "react";
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
}) => {
  const {s} = useStyles();
  const [keyDown, setKeyDown] = useState(false);

  const classes = s([
    className,
    style.buttonContainer,
    style[size],
    style[variant],
    {
      [style.disabled]: disabled,
      [style.keyDown]: keyDown || disabled,
    },
  ]);

  const content = () => {
    return (
      <>
        {Icon && (
          <Icon
            size={size === "small" ? 16 : 24}
            color="currentColor"
            role={ButtonRolesEnum.ICON}
          />
        )}
        <span className={style.content}>{children}</span>
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
      >
        {content()}
      </a>
    );

  const canClick = () => !disabled || !onClick;

  const onUserClick = () => {
    if (!canClick() || !onClick) return;
    onClick();
  };

  const onKey = (e: React.KeyboardEvent, type: "down" | "up") => {
    if (e.key === " " || e.key === "Enter") {
      if (type === "down") setKeyDown(true);
      else setKeyDown(false);
    }
  };

  return (
    <button
      onClick={onUserClick}
      onMouseDown={() => setKeyDown(true)}
      onMouseUp={() => setKeyDown(false)}
      onKeyDown={(e) => onKey(e, "down")}
      onKeyUp={(e) => onKey(e, "up")}
      className={classes}
      disabled={disabled}
      role={ButtonRolesEnum.BUTTON}
    >
      {content()}
    </button>
  );
};

export default Button;
