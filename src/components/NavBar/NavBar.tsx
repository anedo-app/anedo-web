import Logo from "../Logo";
import Button from "../Button";
import React, {ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {ArrowLeftIcon, HomeIcon} from "@/Icons";

const NavBar: React.FC<{
  className?: string;
  leftAction?: "back" | "home" | "none";
  rightAction?: ReactNode;
  name?: string;
}> = ({className = "", name, leftAction = "none", rightAction}) => {
  const navigate = useNavigate();
  return (
    <div className={`${className} flex justify-between items-center w-full`}>
      {leftAction === "none" && <div className="w-12" />}
      {leftAction === "home" && (
        <Button icon={HomeIcon} onClick={() => navigate("/")} />
      )}
      {leftAction === "back" && (
        <Button icon={ArrowLeftIcon} onClick={() => navigate(-1)} />
      )}
      {name ? (
        <h1 className="text-title font-heading">{name}</h1>
      ) : (
        <Logo className="h-10" />
      )}
      {rightAction || <div className="w-12" />}
    </div>
  );
};

export default NavBar;
