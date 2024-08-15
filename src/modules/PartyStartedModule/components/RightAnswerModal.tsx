import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

const RightAnswerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({isOpen, onClose}) => {
  return (
    <Modal
      title="Bonne réponse !"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8"
      buttons={<Button onClick={onClose}>Super giga cool</Button>}
    >
      <p>
        Tu as identifié l'anecdote fausse et la personne a qui elle appartenait
        !
        <br />
        <br />
        Tu es vraiment un boss !
      </p>
    </Modal>
  );
};

export default RightAnswerModal;
