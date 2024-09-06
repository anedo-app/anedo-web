import React from "react";
import useParty from "@/hooks/useParty";
import Anecdote from "@/components/Anecdote";
import {getAnecdotes} from "@/api/parties";
import {throwIfUndefined} from "@/types/utils";
import {useShallow} from "zustand/react/shallow";
import {AnecdoteInterface} from "@/api/parties/types";

const PartyWaitingModule: React.FC<{partyId: string}> = ({partyId}) => {
  const {anecdotes, setPartyData} = useParty(
    useShallow((s) => ({
      anecdotes: s.anecdotes,
      setPartyData: s.setPartyData,
    })),
  );

  const onAnecdoteSubmit = async () => {
    const anecdotes = await getAnecdotes(partyId);
    setPartyData("anecdotes", anecdotes);
  };

  throwIfUndefined<AnecdoteInterface[]>(anecdotes);

  return (
    <>
      <h2 className="text-small-title">Tes anecdotes</h2>
      <div className="flex flex-col gap-2">
        {anecdotes.map((a, i) => (
          <Anecdote anecdote={a} key={a.type + i} onSubmit={onAnecdoteSubmit} />
        ))}
      </div>
    </>
  );
};

export default PartyWaitingModule;
