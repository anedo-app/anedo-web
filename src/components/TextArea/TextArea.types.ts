import React from "react";

export enum TextAreaRolesEnum {
  TEXT_AREA = "text-area",
}

export interface TextAreaProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  value: string | undefined;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  className?: string;
}
