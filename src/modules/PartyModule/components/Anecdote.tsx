import React, {useState} from "react";
import Button from "@/components/Button";
import NewAnecdoteModal from "./NewAnecdoteModal";
import {EditIcon} from "@/Icons";
import {AnecdoteInterface} from "@/api/parties/types";

const Anecdote: React.FC<{
  anecdote: AnecdoteInterface;
  onSubmit: (a: string) => void;
  className?: string;
}> = ({anecdote, onSubmit, className = ""}) => {
  const {type, value} = anecdote;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={`${className} ${value ? (type === "false" ? "bg-yellow-50" : "bg-pink-50") : "bg-grey-100"} p-3 rounded-lg flex flex-col gap-3`}
    >
      <div className="flex justify-between items-center relative">
        <p className="font-bold">
          {type === "false" ? "Anecdote fausse" : "Anecdote vraie"}
        </p>
        {value && (
          <Button
            className="absolute right-0"
            size="small"
            icon={EditIcon}
            onClick={() => setIsModalOpen(true)}
          />
        )}
      </div>
      {value ? (
        <p className="text-small-title whitespace-break-spaces break-words w-full">
          {value}
        </p>
      ) : (
        <Button onClick={() => setIsModalOpen(true)}>Completer</Button>
      )}
      {isModalOpen && (
        <NewAnecdoteModal
          anecdote={anecdote}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default Anecdote;
