import React, {useState} from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import InfoBox from "@/components/InfoBox";
import TextField from "@/components/TextField";
import {toast} from "react-toastify";
import {CheckmarkIcon} from "@/Icons";
import {joinParty} from "@/api/parties";

const JoinPartyModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onJoin: (partyId: string) => void;
}> = ({isOpen, onClose, onJoin}) => {
  const [partyCode, setPartyCode] = useState("");
  const [loading, setLoading] = useState(false);

  const joinNewParty = async () => {
    try {
      setLoading(true);
      await joinParty(partyCode);
      onJoin(partyCode);
      setLoading(false);
      onClose();
    } catch (e) {
      setLoading(false);
      console.error(e);
      toast.error("Une erreur est survenue pour rejoindre la partie.");
    }
  };
  return (
    <Modal
      title="Rejoindre une partie"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8"
      buttons={
        <Button
          icon={CheckmarkIcon}
          disabled={!partyCode.length}
          onClick={joinNewParty}
          loading={loading}
        >
          Rejoindre la partie
        </Button>
      }
    >
      <InfoBox
        title="Infos pratiques"
        message="Cet identifiant te sera donné par un des joueurs de la partie."
      />
      <TextField
        value={partyCode}
        onChange={(e) => setPartyCode(e.target.value)}
        label="Identifiant de la partie :"
        placeholder="ex: TYV54E"
      />
    </Modal>
  );
};

export default JoinPartyModal;
