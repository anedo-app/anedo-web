import React from "react";
import style from "./Layout.module.scss";
import useStyles from "@/hooks/useStyles";
import {Outlet} from "react-router-dom";

const Layout: React.FC<{className?: string}> = ({className = ""}) => {
  const {s} = useStyles();
  return (
    <div className={s([style.inner, className])}>
      <Outlet />
    </div>
  );
};

export default Layout;
