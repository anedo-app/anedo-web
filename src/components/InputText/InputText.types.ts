import React from "react";

export enum InputTextRolesEnum {
  INPUT = "input",
  ICON = "iconElement",
  TITLE = "titleElement",
  DESCRIPTION = "descriptionElement",
}

export interface InputTextProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string | undefined;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}
