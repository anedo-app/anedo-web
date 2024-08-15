import React, {useState} from "react";
import Modal from "@/components/Modal";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import {ForbiddenIcon} from "@/Icons";
import {updateParty} from "@/api/parties";
import {IParty} from "@/api/parties/types";

const TerminatePartyModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onTerminate: () => void;
}> = ({isOpen, onClose, onTerminate}) => {
  const getPartyData = useParty((s) => s.getPartyData);

  const [loading, setLoading] = useState(false);

  const onPartyDelete = async () => {
    try {
      setLoading(true);
      const party = getPartyData<IParty>("party");
      await updateParty({...party, isFinished: true});
      onTerminate();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  return (
    <Modal
      title="Terminer la partie ?"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8 text-center"
      closable={!loading}
      buttons={
        <>
          <Button
            icon={ForbiddenIcon}
            variant="danger"
            loading={loading}
            onClick={onPartyDelete}
          >
            Oui je veux terminer la partie
          </Button>
          <Button disabled={loading} onClick={onClose}>
            Non, annuler
          </Button>
        </>
      }
    >
      <p>Tous les joueurs n'ont pas encore terminé leur enquête.</p>
      <p>Êtes-vous certain de vouloir mettre un terme à la partie ?</p>
    </Modal>
  );
};

export default TerminatePartyModal;
