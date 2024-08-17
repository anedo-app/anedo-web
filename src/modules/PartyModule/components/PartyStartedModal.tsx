import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import StartIllustration from "../assets/START.png";
import {StarIcon} from "@/Icons";

const PartyStartedModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({isOpen, onClose}) => (
  <Modal
    title="Début de la partie !"
    onClose={onClose}
    isOpen={isOpen}
    className="flex flex-col gap-8 text-center"
    closable={false}
    buttons={
      <Button icon={StarIcon} onClick={onClose}>
        C’est parti pour l’enquête !
      </Button>
    }
  >
    <p>
      La partie a commencé ! <br /> <br />
      Trouve à quel participant appartiennent les anecdotes et repère laquelle
      est fausse.
    </p>
    <img
      src={StartIllustration}
      className="max-w-32 mx-auto"
      alt="Illustration de fin"
    />
  </Modal>
);

export default PartyStartedModal;
