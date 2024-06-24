export enum PasswordFieldRolesEnum {
  FIELD = "field",
}

export enum PasswordFieldErrorEnum {
  SHORT = "short",
  UPPERCASE = "uppercase",
  LOWERCASE = "lowercase",
  NUMBER = "number",
  SPECIAL = "special",
}

export type PasswordFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  value: string | undefined;
  label?: string;
  error?: string;
  noError?: boolean;
  onError?: (error?: string) => void;
  onValidation?: (isValid: boolean) => void;
};
