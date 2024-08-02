export enum TextAreaFieldRolesEnum {
  TEXT_AREA_FIELD = "text-area-field",
}

export interface TextAreaFieldProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  value: string | undefined;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
