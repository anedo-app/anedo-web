import React from "react";
import EndIllustration from "../assets/END.png";

const UserGuessed: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h2 className="text-small-title">Tu as fini ton enquête !</h2>
      <p>
        Attendons que chaque joueur ait terminé pour pouvoir accéder aux
        statistiques.
      </p>
      <img src={EndIllustration} alt="Illustration de fin" />
    </div>
  );
};

export default UserGuessed;
