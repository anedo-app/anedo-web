import React, {useState} from "react";
import Modal from "@/components/Modal";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import {TrashIcon} from "@/Icons";
import {deleteParty} from "@/api/parties";

const DeletePartyModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}> = ({isOpen, onClose, onDelete}) => {
  const [loading, setLoading] = useState(false);
  const getPartyData = useParty((s) => s.getPartyData);

  const onPartyDelete = async () => {
    try {
      setLoading(true);
      await deleteParty(getPartyData("party.id"));
      onDelete();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  return (
    <Modal
      title="Supprimer la partie en cours ?"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8"
      closable={!loading}
      buttons={
        <>
          <Button
            icon={TrashIcon}
            variant="danger"
            loading={loading}
            onClick={onPartyDelete}
          >
            Oui je veux supprimer la partie
          </Button>
          <Button disabled={loading} onClick={onClose}>
            Non, annuler
          </Button>
        </>
      }
    >
      <p>
        Es-tu sûr de vouloir supprimer cette partie ? Cette action est
        irréversible.
      </p>
    </Modal>
  );
};

export default DeletePartyModal;
