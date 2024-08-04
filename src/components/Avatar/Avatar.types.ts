export enum AvatarRolesEnum {
  CONTAINER = "container",
  AVATAR = "avatar",
  ERROR = "error",
}

export enum ButtonVariantEnum {
  PRIMARY = "primary",
  WAITING = "waiting",
  READY = "ready",
}

export interface AvatarProps {
  src: string | undefined;
  alt?: string;
  variant?: "primary" | "waiting" | "ready";
  isSmall?: boolean;
  className?: string;
}
