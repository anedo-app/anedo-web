import React, {useState} from "react";
import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import Anecdote from "./components/Anecdote";
import MembersList from "./components/MembersList";
import StartButton from "./components/StartButton";
import PartyEndedModule from "../PartyEndedModule";
import PartyStartedModule from "../PartyStartedModule";
import PartyStartedModal from "./components/PartyStartedModal";
import TerminatePartyButton from "./components/TerminatePartyButton";
import QuiteLeavePartyButton from "./components/QuiteLeavePartyButton";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {throwIfUndefined} from "@/types/utils";
import {BookOpenIcon, ShareIcon} from "@/Icons";
import {useShallow} from "zustand/react/shallow";
import {IParty, PartyStateEnum} from "@/api/parties/types";
import {getAnecdotes, setPartyMemberInfos} from "@/api/parties";

const PartyModule: React.FC = () => {
  const navigate = useNavigate();
  const {party, anecdotes, userInfos, setPartyData} = useParty(
    useShallow((s) => ({
      party: s.party,
      anecdotes: s.anecdotes,
      userInfos: s.userInfos,
      setPartyData: s.setPartyData,
    })),
  );

  throwIfUndefined<IParty>(party);

  const [partyStartedModalOpen, setPartyStartedModalOpen] = useState(false);

  const onAnecdoteSubmit = async () => {
    const anecdotes = await getAnecdotes(party.id);
    setPartyData("anecdotes", anecdotes);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${party.id}`);
    toast.success("Lien copié dans le presse-papier");
  };

  return (
    <div className="h-full flex flex-col justify-between gap-6">
      <NavBar
        leftAction="home"
        rightAction={
          <Button icon={BookOpenIcon} onClick={() => navigate("/rules")} />
        }
      />
      <div className="grow flex-col flex gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-title text-center">{party.name}</h1>
          {party.state === PartyStateEnum.WAITING && (
            <div className="flex gap-4 items-center justify-center">
              <p className="text-black-100">#{party.id}</p>
              <Button size="small" icon={ShareIcon} onClick={copyShareLink} />
            </div>
          )}
        </div>
        {party.state !== PartyStateEnum.FINISHED && <MembersList />}
        {party.state === PartyStateEnum.WAITING && <StartButton />}

        <div className="flex flex-col gap-4">
          {party.state === PartyStateEnum.FINISHED ? (
            <PartyEndedModule />
          ) : party.state === PartyStateEnum.PLAYING ? (
            <PartyStartedModule />
          ) : (
            <>
              <h2 className="text-small-title">Tes anecdotes</h2>
              <div className="flex flex-col gap-2">
                {anecdotes?.map((a, i) => (
                  <Anecdote
                    anecdote={a}
                    key={a.type + i}
                    onSubmit={onAnecdoteSubmit}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {party.state !== PartyStateEnum.FINISHED && (
        <div className="flex gap-2 justify-center">
          <TerminatePartyButton />
          <QuiteLeavePartyButton />
        </div>
      )}

      {partyStartedModalOpen && (
        <PartyStartedModal
          isOpen={partyStartedModalOpen}
          onClose={() => {
            setPartyMemberInfos(party.id, userInfos?.uid || "", {
              startedPlaying: true,
            });
            setPartyStartedModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default PartyModule;
