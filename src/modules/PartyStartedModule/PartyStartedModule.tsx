import React, {useState} from "react";
import useParty from "@/hooks/useParty";
import GuessTile from "./components/GuessTile";
import CountDown from "./components/CountDown";
import UserGuessed from "./components/UserGuessed";
import TooSoonModal from "./components/TooSoonModal";
import WrongAnswerModal from "./components/WrongAnswerModal";
import WrightAnswerModal from "./components/WrightAnswerModal";
import {useShallow} from "zustand/react/shallow";

const PartyStartedModule: React.FC = () => {
  const {anecdotesToGuess, guessed, nextGuessTime} = useParty(
    useShallow((s) => ({
      anecdotesToGuess: s.anecdotesToGuess,
      guessed: s.userInfos?.guessed,
      nextGuessTime: s.userInfos?.nextGuessTime,
    })),
  );

  const [isWrongAnswerModalOpen, setIsWrongAnswerModalOpen] = useState(false);
  const [isWrightAnswerModalOpen, setIsWrightAnswerModalOpen] = useState(false);
  const [isTooSoonModalOpen, setIsTooSoonModalOpen] = useState(false);

  const onAnswer = (type: string) => {
    if (type === "too-early") setIsTooSoonModalOpen(true);
    else if (type === "correct") {
      setIsWrightAnswerModalOpen(true);
    } else setIsWrongAnswerModalOpen(true);
  };

  if (guessed) return <UserGuessed />;

  return (
    <>
      <CountDown nextGuessTime={nextGuessTime} />
      <div className="flex flex-col gap-4">
        <h2 className="text-small-title">
          Laquelle de ces anecdotes est fausse ?
        </h2>
        <div className="flex flex-col gap-2">
          {anecdotesToGuess?.map((a) => (
            <GuessTile anecdote={a} key={a.id} onAnswer={onAnswer} />
          ))}
        </div>
        {isWrongAnswerModalOpen && (
          <WrongAnswerModal
            isOpen={isWrongAnswerModalOpen}
            onClose={() => setIsWrongAnswerModalOpen(false)}
          />
        )}
        {isWrightAnswerModalOpen && (
          <WrightAnswerModal
            isOpen={isWrightAnswerModalOpen}
            onClose={() => setIsWrightAnswerModalOpen(false)}
          />
        )}
        {isTooSoonModalOpen && (
          <TooSoonModal
            isOpen={isTooSoonModalOpen}
            onClose={() => setIsTooSoonModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default PartyStartedModule;
