export enum LabelRolesEnum {
  LABEL = "label",
  REQUIRED = "required",
}

export interface LabelProps {
  label: string | undefined;
  id?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  className?: string;
}
