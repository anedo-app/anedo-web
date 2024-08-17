import React, {useState} from "react";
import Modal from "@/components/Modal";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import {TrashIcon} from "@/Icons";
import {leaveParty} from "@/api/parties";

const QuitePartyModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onQuite: () => void;
}> = ({isOpen, onClose, onQuite}) => {
  const getPartyData = useParty((s) => s.getPartyData);

  const [loading, setLoading] = useState(false);

  const onPartyDelete = async () => {
    try {
      setLoading(true);
      await leaveParty(getPartyData("party.id"));
      onQuite();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  return (
    <Modal
      title="Quitter la partie en cours ?"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8 text-center"
      closable={!loading}
      buttons={
        <>
          <Button
            icon={TrashIcon}
            variant="danger"
            loading={loading}
            onClick={onPartyDelete}
          >
            Oui je veux quitter la partie
          </Button>
          <Button disabled={loading} onClick={onClose}>
            Non, annuler
          </Button>
        </>
      }
    >
      <p>
        Es-tu sûr de vouloir quitter cette partie ? Tu pourras toujours la
        rejoindre plus tard si tu es invité.
      </p>
    </Modal>
  );
};

export default QuitePartyModal;
