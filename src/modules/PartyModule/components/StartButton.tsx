import React, {useMemo} from "react";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import {toast} from "react-toastify";
import {PlayCircleIcon} from "@/Icons";
import {startParty} from "@/api/parties";
import {useShallow} from "zustand/react/shallow";

const StartButton: React.FC = () => {
  const {members, partyId} = useParty(
    useShallow((s) => ({
      members: s.members,
      partyId: s.party?.id,
    })),
  );
  const isOwner = useParty((s) => s.computed.isOwner);
  const computedIsOwner = isOwner();

  const canStart = useMemo(
    () => members?.every((m) => m.isReady) && members?.length > 1,
    [members],
  );

  const onStart = async () => {
    try {
      if (partyId) {
        await startParty(partyId);
        toast.success("La partie a été lancée !");
      }
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors du lancement de la partie");
    }
  };
  return (
    <>
      {computedIsOwner && (
        <div className="flex flex-col gap-2">
          <Button
            className="w-full"
            disabled={!canStart}
            icon={PlayCircleIcon}
            onClick={onStart}
          >
            Lancer la partie
          </Button>
          <p className="text-black-100 text-tag text-center">
            La partie ne pourra-t-être lancée que lorsque tous les participants
            auront entrés leurs anecdotes.
          </p>
        </div>
      )}
    </>
  );
};

export default StartButton;
