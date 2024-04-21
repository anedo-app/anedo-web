export enum ButtonRolesEnum {
  BUTTON = "button",
  LINK = "link",
}

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  disabled?: boolean;
}
