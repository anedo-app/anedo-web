import React from "react";
import style from "./InfoBox.module.scss";
import useStyles from "@/hooks/useStyles";
import {IIconProps} from "@/Icons/icons.type";
import {InfoBoxProps, InfoBoxRolesEnum} from "./InfoBox.types";
import {
  AlertCircleIcon,
  CheckmarkIcon,
  CloseIcon,
  ForbiddenIcon,
} from "@/Icons";

const InfoBox: React.FC<InfoBoxProps> = ({
  className,
  variant = "default",
  title,
  message,
  icon: Icon,
  onClose,
}) => {
  const {s} = useStyles();

  const classes = s([className, style.container, style[variant]]);

  const BoxIcon = (props: IIconProps) => {
    if (Icon) return <Icon {...props} />;
    switch (variant) {
      case "warning":
        return <AlertCircleIcon {...props} />;
      case "danger":
        return <ForbiddenIcon {...props} />;
      case "success":
        return <CheckmarkIcon {...props} />;
      default:
        return undefined;
    }
  };

  return (
    <div className={classes} role={InfoBoxRolesEnum.CONTAINER}>
      <BoxIcon
        className={style.icon}
        size={24}
        style={{fill: "currentcolor"}}
      />
      <div className={style.content}>
        {title && <h4>{title}</h4>}
        {message && <p>{message}</p>}
      </div>
      {onClose && (
        <button
          className={style.closeButton}
          onClick={onClose}
          aria-label="Fermer"
        >
          <CloseIcon size={16} style={{fill: "currentcolor"}} />
        </button>
      )}
    </div>
  );
};

export default InfoBox;
