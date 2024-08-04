import React from "react";

export enum InputTextRolesEnum {
  INPUT = "input",
  ICON = "iconElement",
  TITLE = "titleElement",
  DESCRIPTION = "descriptionElement",
}

export interface InputTextProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string | undefined;
  placeholder?: string;
  error?: boolean;
  className?: string;
}
