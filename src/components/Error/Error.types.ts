export enum ErrorRolesEnum {
  ERROR = "error",
}

export interface ErrorProps {
  error: string | undefined;
  className?: string;
}
