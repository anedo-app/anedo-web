import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

const TooSoonModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({isOpen, onClose}) => {
  return (
    <Modal
      title="Tu ne peux pas encore proposer une réponse"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8 text-center"
      buttons={<Button onClick={onClose}>D'accord, à plus tard !</Button>}
    >
      <p>
        Tu as déjà proposé une réponse. Tu pourras en proposer une nouvelle dans
        30 minutes.
      </p>
    </Modal>
  );
};

export default TooSoonModal;
