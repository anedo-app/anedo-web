import React from "react";
import style from "./Tag.module.scss";
import useStyles from "@/hooks/useStyles";
import {CloseIcon} from "@/Icons";
import {TagProps, TagRolesEnum} from "./Tag.types";

const Tag: React.FC<TagProps> = ({className, onClose, text, icon: Icon}) => {
  const {s} = useStyles();

  const classes = s([className, style.container]);

  return (
    <div className={classes} role={TagRolesEnum.TAG}>
      {Icon && <Icon size={16} color="currentColor" role={TagRolesEnum.ICON} />}
      <p className={style.content}>{text}</p>
      {onClose && (
        <button onClick={onClose} className={style.close}>
          <CloseIcon size={16} color="currentColor" role={TagRolesEnum.CLOSE} />
        </button>
      )}
    </div>
  );
};

export default Tag;
