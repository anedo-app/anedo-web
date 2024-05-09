export enum TextFieldRolesEnum {
  TEXT_FIELD = "text-field",
}

export interface TextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string | undefined;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
