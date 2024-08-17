import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import InfoBox from "@/components/InfoBox";

const WrongAnswerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({isOpen, onClose}) => {
  return (
    <Modal
      title="Réponse fausse !"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8"
      buttons={<Button onClick={onClose}>Dommage je triste</Button>}
    >
      <p>
        Misère... Soit cette anecdote n'est pas fausse pour ce joueur, soit ce
        joueur n'est pas celui que tu cherches.
        <br />
        <br />
        Reviens dans 30 minutes pour une nouvelle tentative.
      </p>
      <InfoBox message="Prends note de tes précédents essais ! Cela t'évitera de proposer à nouveau les mêmes choses." />
    </Modal>
  );
};

export default WrongAnswerModal;
