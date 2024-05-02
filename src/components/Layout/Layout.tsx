import React from "react";
import useEnv from "@/hooks/useEnv";
import style from "./Layout.module.scss";
import {Outlet} from "react-router-dom";

const Layout: React.FC = () => {
  const {appVersion} = useEnv();
  return (
    <div className={style.root}>
      <div className={style.inner}>
        <Outlet />
      </div>
      <p className="version">{appVersion}</p>
    </div>
  );
};

export default Layout;
