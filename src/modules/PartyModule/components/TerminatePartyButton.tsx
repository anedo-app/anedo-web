import React, {useState} from "react";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import TerminatePartyModal from "./TerminatePartyModal";
import {ForbiddenIcon} from "@/Icons";

const TerminatePartyButton: React.FC = () => {
  const isOwner = useParty((s) => s.computed.isOwner);
  const party = useParty((s) => s.party);
  const computedIsOwner = isOwner();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!computedIsOwner || !party?.isStarted) return null;

  return (
    <>
      <Button
        className="self-center"
        variant="danger"
        size="small"
        icon={ForbiddenIcon}
        onClick={() => setIsModalOpen(true)}
      >
        Terminer la partie
      </Button>
      {isModalOpen && (
        <TerminatePartyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTerminate={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default TerminatePartyButton;
