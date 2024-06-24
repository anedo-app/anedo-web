import {IIconProps} from "@/Icons/icons.type";

export enum InfoBoxRolesEnum {
  CONTAINER = "container",
  INFO_BOX = "InfoBox",
  ERROR = "error",
}

export enum ButtonVariantEnum {
  PRIMARY = "primary",
  WAITING = "waiting",
  READY = "ready",
}

export type InfoBoxProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  icon?: React.FC<IIconProps>;
  variant?: "default" | "warning" | "danger" | "success";
  title?: string;
  message?: string;
  onClose?: () => void;
};
