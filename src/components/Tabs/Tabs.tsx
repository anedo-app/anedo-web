import Button from "../Button";
import React, {useState} from "react";
import style from "./Tabs.module.scss";
import useStyles from "@/hooks/useStyles";
import {TabsProps, TabsRolesEnum} from "./Tabs.types";

const Tabs: React.FC<TabsProps> = ({className, tabs, onChange}) => {
  const {s} = useStyles();

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={s([className, style.container])} role={TabsRolesEnum.TABS}>
      <div className={style.tabs}>
        {tabs.map((tab, index) => (
          <Button
            key={tab.value}
            className={s([style.tab, {[style.active]: activeTab === index}])}
            role={TabsRolesEnum.TAB}
            pushed={activeTab === index}
            onClick={() => {
              setActiveTab(index);
              onChange(tab.value);
            }}
          >
            <p>{tab.label}</p>
            {!!tab.notification && (
              <span className={style.notification}>{tab.notification}</span>
            )}
          </Button>
        ))}
      </div>
      {tabs[activeTab].content}
    </div>
  );
};

export default Tabs;
