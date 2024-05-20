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
  onError?: (error?: string) => void;
};
