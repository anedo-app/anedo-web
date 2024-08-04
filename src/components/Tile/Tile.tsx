import React from "react";
import style from "./Tile.module.scss";
import useStyles from "@/hooks/useStyles";
import {TileProps, TileRolesEnum} from "./Tile.types";

const Tile: React.FC<TileProps> = ({
  className,
  onClick,
  disabled,
  description,
  title,
  children,
  small,
  icon: Icon,
}) => {
  const {s} = useStyles();

  const classes = s([
    className,
    style.tileContainer,
    {
      [style.disabled]: disabled,
      [style.small]: small,
      [style.keyDown]: disabled,
    },
  ]);

  const onUserClick = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <button
      onClick={onUserClick}
      className={classes}
      disabled={disabled}
      role={TileRolesEnum.TILE}
    >
      {Icon && (
        <Icon size={24} color="currentColor" role={TileRolesEnum.ICON} />
      )}
      {children}
      {(title || description) && (
        <div className={style.content}>
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
        </div>
      )}
    </button>
  );
};

export default Tile;
