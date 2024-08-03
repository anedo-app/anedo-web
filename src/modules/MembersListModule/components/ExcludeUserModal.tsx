import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import {TrashIcon} from "@/Icons";
import {FullPartyUserType} from "@/api/parties/types";

const ExcludeUserModal: React.FC<{
  member: FullPartyUserType;
  isOpen: boolean;
  onClose: () => void;
  onExclude: (uid: string) => void;
}> = ({member, isOpen, onClose, onExclude}) => {
  return (
    <Modal
      title="Exclure un joueur"
      isOpen={isOpen}
      onClose={onClose}
      buttons={
        <>
          <Button
            icon={TrashIcon}
            onClick={() => onExclude(member.uid)}
            variant="danger"
          >
            Oui, ma sentence est irrévocable
          </Button>
          <Button onClick={onClose}>Non, annuler</Button>
        </>
      }
    >
      <p className="text-center">
        Es-tu sûr de vouloir exclure{" "}
        <span className="font-bold">{member.displayName}</span> ? Cette action
        est irréversible.
      </p>
    </Modal>
  );
};

export default ExcludeUserModal;
