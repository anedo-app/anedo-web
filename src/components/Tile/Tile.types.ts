import React from "react";
import {IIconProps} from "@/Icons/icons.type";

export enum TileRolesEnum {
  TILE = "tile",
  ICON = "iconElement",
  TITLE = "titleElement",
  DESCRIPTION = "descriptionElement",
}

export interface TileProps {
  className?: string;
  title?: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.FC<IIconProps>;
}
