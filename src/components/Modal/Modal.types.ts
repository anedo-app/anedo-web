import React from "react";

export enum ModalRolesEnum {
  MODAL = "modal",
  ICON = "iconElement",
  TITLE = "titleElement",
  DESCRIPTION = "descriptionElement",
}

export interface ModalProps {
  title: string;
  isOpen: boolean;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
  onClose: () => void;
  closable?: boolean;
  className?: string;
  portalTarget?: string;
}
