import Modal from "@/components/Modal";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Anecdote from "@/components/Anecdote";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getAnecdotes} from "@/api/parties";
import {AnecdoteInterface, FullPartyUserType} from "@/api/parties/types";

const PlayerAnecdotesModal: React.FC<{
  isOpen: boolean;
  member: FullPartyUserType;
  onClose: () => void;
}> = ({isOpen, onClose, member}) => {
  const {getPartyData} = useParty();

  const [anecdotes, setAnecdotes] = useState<AnecdoteInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserAnecdotes = async () => {
    setLoading(true);
    try {
      const anecdotes = await getAnecdotes(
        getPartyData("party.id"),
        member.uid,
      );
      setAnecdotes(anecdotes);
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de la récupération des anecdotes du joueur");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAnecdotes();
  }, []);

  return (
    <Modal
      title={`Anecdotes de ${member.displayName}`}
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8 items-center"
      buttons={<Button onClick={onClose}>Ma curiosité est satisfaite</Button>}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {anecdotes.map((anecdote) => (
            <Anecdote key={anecdote.id} anecdote={anecdote} canEdit={false} />
          ))}
        </div>
      )}
    </Modal>
  );
};

export default PlayerAnecdotesModal;
