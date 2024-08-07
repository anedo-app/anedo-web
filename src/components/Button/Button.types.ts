import React from "react";
import {IIconProps} from "@/Icons/icons.type";

export enum ButtonRolesEnum {
  BUTTON = "button",
  LINK = "link",
  ICON = "iconElement",
}

export enum ButtonVariantEnum {
  PRIMARY = "primary",
  SUCCESS = "success",
  DANGER = "danger",
}
export enum ButtonSizeEnum {
  NORMAL = "normal",
  SMALL = "small",
}

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "success" | "danger";
  size?: "normal" | "small";
  icon?: React.FC<IIconProps>;
  pushed?: boolean;
}
