import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import ConfettiExplosion, {ConfettiProps} from "react-confetti-explosion";
const confettiConfig: ConfettiProps = {
  style: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  force: 0.4,
  duration: 5000,
  particleCount: 100,
  width: 600,
};

const WrightAnswerModal: React.FC<{
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
      <ConfettiExplosion {...confettiConfig} />
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

export default WrightAnswerModal;
