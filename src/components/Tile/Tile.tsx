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
  icon: Icon,
}) => {
  const {s} = useStyles();
  const [keyDown, setKeyDown] = React.useState(false);

  const classes = s([
    className,
    style.tileContainer,
    {
      [style.disabled]: disabled,
      [style.keyDown]: keyDown || disabled,
    },
  ]);

  const onUserClick = () => {
    if (disabled) return;
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
      role={TileRolesEnum.TILE}
    >
      {Icon && (
        <Icon size={24} color="currentColor" role={TileRolesEnum.ICON} />
      )}
      <div className={style.content}>
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
      </div>
    </button>
  );
};

export default Tile;
