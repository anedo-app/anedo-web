import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import React, {useMemo, useState} from "react";
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

  const [loading, setLoading] = useState(false);

  const canStart = useMemo(
    () => members?.every((m) => m.isReady) && members?.length > 1,
    [members],
  );

  const onStart = async () => {
    setLoading(true);
    try {
      if (partyId) {
        await startParty(partyId);
      }
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors du lancement de la partie");
    } finally {
      setLoading(false);
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
            loading={loading}
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
