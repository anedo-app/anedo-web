import React, {useState} from "react";
import style from "./Avatar.module.scss";
import useStyles from "@/hooks/useStyles";
import {AvatarProps, AvatarRolesEnum} from "./Avatar.types";

const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  alt,
  variant = "primary",
  isSmall,
}) => {
  const {s} = useStyles();
  const [error, setError] = useState(false);

  const classes = s([
    className,
    style.container,
    style[variant],
    {[style.small]: isSmall},
  ]);

  return (
    <div className={classes} role={AvatarRolesEnum.CONTAINER}>
      {!error && src ? (
        <img
          role={AvatarRolesEnum.AVATAR}
          src={src}
          alt={alt}
          onError={() => setError(true)}
        />
      ) : (
        <p role={AvatarRolesEnum.ERROR}>:3</p>
      )}
    </div>
  );
};

export default Avatar;
