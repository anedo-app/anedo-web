import React from "react";
import {IIconProps} from "@/Icons/icons.type";

export enum TileRolesEnum {
  TILE = "tile",
  ICON = "iconElement",
  TITLE = "titleElement",
  DESCRIPTION = "descriptionElement",
}

export interface TileProps {
  title?: string;
  description?: string;
  icon?: React.FC<IIconProps>;
  children?: React.ReactNode;
  disabled?: boolean;
  small?: boolean;
  onClick: () => void;
  className?: string;
}
