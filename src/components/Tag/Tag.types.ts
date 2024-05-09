import React from "react";
import {IIconProps} from "@/Icons/icons.type";

export enum TagRolesEnum {
  TAG = "tag",
  ICON = "iconElement",
  CLOSE = "close",
}

export interface TagProps {
  className?: string;
  text: string;
  onClose?: () => void;
  icon?: React.FC<IIconProps>;
}
