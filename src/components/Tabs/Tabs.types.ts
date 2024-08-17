export enum TabsRolesEnum {
  TABS = "tabs",
  TAB = "tab",
}

export interface Tab {
  label: string;
  value: string;
  content?: React.ReactNode;
  notification?: number;
}

export interface TabsProps {
  tabs: Tab[];
  currentTab?: string;
  onChange?: (value: string) => void;
  className?: string;
}
