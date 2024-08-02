import React, {useEffect} from "react";
import style from "./Modal.module.scss";
import useStyles from "@/hooks/useStyles";
import {createPortal} from "react-dom";
import {ModalProps, ModalRolesEnum} from "./Modal.types";

const Modal: React.FC<ModalProps> = ({
  className,
  onClose,
  closable = true,
  title,
  children,
  buttons,
  portalTarget = "#rootTemplate",
}) => {
  const {s} = useStyles();

  const target = document.getElementById(portalTarget) || document.body;

  const classes = s([className, style.content]);

  const onUserClick = () => {
    if (!closable) return;
    onClose();
  };

  useEffect(() => {
    target.style.overflow = "hidden";
    return () => {
      target.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div className={style.modalContainer} role={ModalRolesEnum.MODAL}>
      <div className={style.backdrop} onClick={onUserClick} />
      <div className={style.modal}>
        <h3 className={style.title}>{title}</h3>
        {children && <div className={classes}>{children}</div>}
        {buttons && <div className={style.buttons}>{buttons}</div>}
      </div>
    </div>,
    target,
  );
};

export default Modal;
