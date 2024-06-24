export enum EmailFieldRolesEnum {
  FIELD = "field",
}

export enum EmailFieldErrorEnum {
  INVALID = "invalid",
}

export type EmailFieldProps = React.DetailedHTMLProps<
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
