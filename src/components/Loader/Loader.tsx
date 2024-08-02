import React from "react";
import style from "./Loader.module.scss";
import useStyles from "@/hooks/useStyles";

const Loader: React.FC<{className?: string}> = ({className = ""}) => {
  const {s} = useStyles();
  return <div className={s([className, style.loader])} />;
};

export default Loader;
