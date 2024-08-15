import Tile from "@/components/Tile";
import React, {useState} from "react";
import GuessModal from "./GuessModal";
import {IAnecdoteToGuess} from "@/api/parties/types";

const GuessTile: React.FC<{
  anecdote: IAnecdoteToGuess;
  onAnswer: (type: string) => void;
}> = ({anecdote, onAnswer}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Tile
        className="text-left"
        title={anecdote.value}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <GuessModal
          isOpen={isModalOpen}
          anecdote={anecdote}
          onClose={() => setIsModalOpen(false)}
          onAnswer={onAnswer}
        />
      )}
    </>
  );
};

export default GuessTile;
