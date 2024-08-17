import useApp from "@/hooks/useApp";
import Tile from "@/components/Tile";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import PartyCard from "./components/PartyCard";
import React, {useEffect, useState} from "react";
import NewPartyModal from "./components/NewPartyModal";
import JoinPartyModal from "./components/JoinPartyModal";
import {listenParties} from "@/api/parties";
import {useNavigate} from "react-router-dom";
import {BookOpenIcon, RewindLeftIcon, UserIcon} from "@/Icons";

const HomeModule: React.FC = () => {
  const navigate = useNavigate();
  const {setAppData, parties} = useApp();
  const {setPartyData} = useParty();

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    setPartyData("party", null);

    listenParties((parties) => setAppData("parties", parties));
  }, []);

  return (
    <div className="h-full flex flex-col justify-between gap-8">
      <NavBar
        rightAction={
          <Button icon={UserIcon} onClick={() => navigate("/profile")} />
        }
      />

      <div className="flex flex-col gap-4">
        <Tile
          title="Créer un partie"
          description="Organisez une session, invitez vos amis et démarrez dès que tout le monde est prêt !"
          onClick={() => setIsNewModalOpen(true)}
        />
        <Tile
          title="Rejoindre une partie"
          description="Rejoignez une partie en utilisant le code et partagez vos anecdotes !"
          onClick={() => setIsJoinModalOpen(true)}
        />
      </div>
      {!!parties?.length && (
        <div className="flex flex-col gap-4">
          <h2 className="text-title">T'es parties</h2>
          {parties.map((party) => (
            <PartyCard
              key={party.id}
              party={party}
              onClick={() => navigate(`/party/${party.id}`)}
            />
          ))}
        </div>
      )}
      <div className="flex w-full justify-between">
        <Button icon={RewindLeftIcon} disabled>
          Archives
        </Button>
        <Button icon={BookOpenIcon} onClick={() => navigate("/rules")}>
          Règles
        </Button>
      </div>
      {isNewModalOpen && (
        <NewPartyModal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          onCreate={(id) => navigate(`/party/${id}`)}
        />
      )}
      {isJoinModalOpen && (
        <JoinPartyModal
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
          onJoin={(id) => navigate(`/party/${id}`)}
        />
      )}
    </div>
  );
};

export default HomeModule;
