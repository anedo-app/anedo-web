import React from "react";
import Tile from "@/components/Tile";
import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import {useNavigate} from "react-router-dom";
import {BookOpenIcon, RewindLeftIcon, UserIcon} from "@/Icons";

const HomeModule: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col justify-between">
      <NavBar
        rightAction={
          <Button icon={UserIcon} onClick={() => navigate("/profile")} />
        }
      />

      <div className="flex flex-col gap-4">
        <Tile
          title="Créer un partie"
          description="Organisez une session, invitez vos amis et démarrez dès que tout le monde est prêt !"
          onClick={() => {}}
        />
        <Tile
          title="Rejoindre une partie"
          description="Rejoignez une partie en utilisant le code et partagez vos anecdotes !"
          onClick={() => {}}
        />
      </div>
      <div className="flex w-full justify-between">
        <Button icon={RewindLeftIcon} disabled>
          Archives
        </Button>
        <Button icon={BookOpenIcon} onClick={() => navigate("/rules")}>
          Règles
        </Button>
      </div>
    </div>
  );
};

export default HomeModule;
