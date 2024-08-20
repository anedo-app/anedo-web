import React, {useState} from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import InfoBox from "@/components/InfoBox";
import TextField from "@/components/TextField";
import {toast} from "react-toastify";
import {CheckmarkIcon} from "@/Icons";
import {createParty} from "@/api/parties";

const NewPartyModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (partyId: string) => void;
}> = ({isOpen, onClose, onCreate}) => {
  const [partyName, setPartyName] = useState("");
  const [loading, setLoading] = useState(false);

  const createNewParty = async () => {
    try {
      setLoading(true);
      const partyId = await createParty(partyName.trim());
      onCreate(partyId as string);
      setLoading(false);
      onClose();
    } catch (e) {
      setLoading(false);
      console.error(e);
      toast.error("Une erreur est survenue lors de la création de la partie.");
    }
  };

  return (
    <Modal
      title="Nouvelle partie"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8"
      buttons={
        <Button
          icon={CheckmarkIcon}
          disabled={!partyName.trim().length}
          onClick={createNewParty}
          loading={loading}
        >
          Créer la partie
        </Button>
      }
    >
      <InfoBox
        title="Infos pratiques"
        message="Les participants pourront voir le nom de la partie, et vous devrez leur fournir un code afin qu'ils puissent la rejoindre."
      />
      <TextField
        value={partyName}
        onChange={(e) => setPartyName(e.target.value)}
        label="Nom de la partie"
        placeholder="ex: Weekend de folie 2024"
      />
    </Modal>
  );
};

export default NewPartyModal;
