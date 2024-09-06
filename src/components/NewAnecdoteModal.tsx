import React, {useState} from "react";
import Modal from "@/components/Modal";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import InfoBox from "@/components/InfoBox";
import TextAreaField from "@/components/TextAreaField";
import {addAnecdote} from "@/api/parties";
import {CheckmarkIcon, InfoCircleIcon} from "@/Icons";
import {AnecdoteInterface} from "@/api/parties/types";

const NewAnecdoteModal: React.FC<{
  isOpen: boolean;
  anecdote: AnecdoteInterface;
  onClose: () => void;
  onSubmit: () => void;
}> = ({isOpen, anecdote, onClose, onSubmit}) => {
  const {party, anecdotes} = useParty();

  const [value, setValue] = useState(anecdote.value);
  const [loading, setLoading] = useState(false);

  const submitAnecdote = async () => {
    try {
      if (!party) return;
      setLoading(true);
      const userAnecdotes = anecdotes || [];
      const newAnecdote = {...anecdote, value: value.trim()};
      const updatedAnecdotes = userAnecdotes.map((a) =>
        a.id === newAnecdote.id ? newAnecdote : a,
      );
      await addAnecdote(party.id, updatedAnecdotes);
      setLoading(false);
      onSubmit();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title="Ton anecdote"
      onClose={onClose}
      isOpen={isOpen}
      className="flex flex-col gap-8"
      buttons={
        <>
          <Button
            icon={CheckmarkIcon}
            disabled={!value?.trim().length}
            onClick={submitAnecdote}
            loading={loading}
          >
            C'est mon dernier mot
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </>
      }
    >
      <InfoBox
        icon={InfoCircleIcon}
        title="En manque d’inspiration ?"
        message="Choisis quelque chose qui date de ton enfance, ta plus grande peur, quelque chose qui pourrait évoquer l’anecdote de quelqu’un d’autre..."
      />
      <TextAreaField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Donne nous une belle anecdote :"
        placeholder="Écrire ici..."
      />
    </Modal>
  );
};

export default NewAnecdoteModal;
