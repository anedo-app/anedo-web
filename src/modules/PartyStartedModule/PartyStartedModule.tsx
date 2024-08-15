import React, {useState} from "react";
import useParty from "@/hooks/useParty";
import GuessTile from "./components/GuessTile";
import CountDown from "./components/CountDown";
import TooSoonModal from "./components/TooSoonModal";
import WrongAnswerModal from "./components/WrongAnswerModal";
import RightAnswerModal from "./components/RightAnswerModal";

const PartyStartedModule: React.FC = () => {
  const {anecdotesToGuess} = useParty();

  const [isWrongAnswerModalOpen, setIsWrongAnswerModalOpen] = useState(false);
  const [isRightAnswerModalOpen, setIsRightAnswerModalOpen] = useState(false);
  const [isTooSoonModalOpen, setIsTooSoonModalOpen] = useState(false);

  const onAnswer = (type: string) => {
    if (type === "too-early") setIsTooSoonModalOpen(true);
    else if (type === "incorrect") setIsWrongAnswerModalOpen(true);
    else setIsRightAnswerModalOpen(true);
  };

  return (
    <>
      <CountDown />
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
        {isRightAnswerModalOpen && (
          <RightAnswerModal
            isOpen={isRightAnswerModalOpen}
            onClose={() => setIsRightAnswerModalOpen(false)}
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
