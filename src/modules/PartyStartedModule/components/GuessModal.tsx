import Tile from "@/components/Tile";
import React, {useState} from "react";
import Modal from "@/components/Modal";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";
import Anecdote from "@/components/Anecdote";
import {toast} from "react-toastify";
import {makeAGuess} from "@/api/parties";
import {IAnecdoteToGuess} from "@/api/parties/types";
import {ArrowLeftIcon, ArrowRightIcon, CheckmarkIcon} from "@/Icons";

const GuessModal: React.FC<{
  isOpen: boolean;
  anecdote: IAnecdoteToGuess;
  onClose: () => void;
  onAnswer: (type: string) => void;
}> = ({isOpen, anecdote, onClose, onAnswer}) => {
  const {party, members, userInfos} = useParty();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const submitAnecdote = async () => {
    try {
      if (!party || !selectedMember) return;
      setLoading(true);
      const response = await makeAGuess({
        partyId: party.id,
        anecdotesOwnerUid: selectedMember,
        anecdoteId: anecdote.id,
      });
      onAnswer(response.type);
      setLoading(false);
      onClose();
    } catch (e) {
      toast.error("Une erreur est survenue");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const membersPages = Math.ceil((members?.length || 0) / 3);

  return (
    <Modal
      title="Devine qui c’est ?"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8"
      buttons={
        <>
          <Button
            icon={CheckmarkIcon}
            onClick={submitAnecdote}
            loading={loading}
            disabled={!selectedMember}
          >
            C'est mon dernier mot
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <p>
          Si tu penses que c'est cette anecdote parmi les trois qui est la
          fausse, à qui l'attribues-tu ?
        </p>
        <Anecdote
          anecdote={{
            type: "false",
            id: "",
            value: anecdote.value,
          }}
          canEdit={false}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {[...(members || [])]
            ?.filter((e) => e.uid !== userInfos?.uid)
            .splice(currentIndex * 3, 3)
            .map((m) => (
              <Tile
                className="flex-grow min-w-24"
                key={m.uid}
                onClick={() => setSelectedMember(m.uid)}
                small
                pushed={m.uid === selectedMember}
              >
                <Avatar src={m.photoURL} isSmall />
                {m.displayName}
              </Tile>
            ))}
        </div>
        {membersPages > 1 && (
          <div className="flex items-center justify-center w-full gap-8">
            <Button
              icon={ArrowLeftIcon}
              size="small"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
            />
            <div className="flex gap-4 ">
              {[...Array(membersPages)].map((_, i) => (
                <span
                  key={i}
                  className={`${currentIndex === i ? "bg-purple-125" : "bg-purple-25"} w-2 h-2 block bg-purple-25 rounded-full`}
                />
              ))}
            </div>
            <Button
              icon={ArrowRightIcon}
              size="small"
              onClick={() => setCurrentIndex(currentIndex + 1)}
              disabled={currentIndex === membersPages - 1}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GuessModal;
