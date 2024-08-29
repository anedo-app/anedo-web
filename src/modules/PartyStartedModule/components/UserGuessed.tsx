import React, {useState} from "react";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import EndIllustration from "../assets/END.png";
import {toast} from "react-toastify";
import {updateParty} from "@/api/parties";
import {IParty, PartyStateEnum} from "@/api/parties/types";

const UserGuessed: React.FC = () => {
  const {userInfos, members, getPartyData} = useParty();

  const canEndParty = members?.every((m) => m.guessed) && userInfos?.isHost;
  const [loading, setLoading] = useState(false);

  const onPartyTermination = async () => {
    try {
      setLoading(true);
      const party = getPartyData<IParty>("party");
      await updateParty({...party, state: PartyStateEnum.FINISHED});
      setLoading(false);
    } catch (e) {
      toast.error("Une erreur est survenue");
      setLoading(false);
      console.error(e);
    }
  };

  if (canEndParty)
    return (
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-small-title">L'enquête est terminée !</h2>
        <p>
          Tous les joueurs ont terminé leur enquête. Tu peux maintenant fermer
          la partie pour accéder aux statistiques.
        </p>
        <Button onClick={onPartyTermination} loading={loading}>
          Terminer l'enquête
        </Button>
        <img src={EndIllustration} alt="Illustration de fin" />
      </div>
    );

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
