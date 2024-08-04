import React, {useState} from "react";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import QuitePartyModal from "./QuitePartyModal";
import DeletePartyModal from "./DeletePartyModal";
import {useNavigate} from "react-router-dom";
import {LogOutIcon, TrashIcon} from "@/Icons";

const QuiteLeavePartyButton: React.FC = () => {
  const isOwner = useParty((s) => s.computed.isOwner);
  const computedIsOwner = isOwner();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        className="self-center"
        variant="danger"
        size="small"
        icon={computedIsOwner ? TrashIcon : LogOutIcon}
        onClick={() => setIsModalOpen(true)}
      >
        {computedIsOwner ? "Supprimer la partie" : "Quitter la partie"}
      </Button>
      {isModalOpen &&
        (computedIsOwner ? (
          <DeletePartyModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onDelete={() => navigate("/")}
          />
        ) : (
          <QuitePartyModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onQuite={() => navigate("/")}
          />
        ))}
    </>
  );
};

export default QuiteLeavePartyButton;
