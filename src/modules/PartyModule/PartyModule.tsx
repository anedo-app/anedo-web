import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import Loader from "@/components/Loader";
import Anecdote from "./components/Anecdote";
import React, {useEffect, useState} from "react";
import MembersList from "./components/MembersList";
import StartButton from "./components/StartButton";
import PartyEndedModule from "../PartyEndedModule";
import PartyStartedModule from "../PartyStartedModule";
import TerminatePartyButton from "./components/TerminatePartyButton";
import QuiteLeavePartyButton from "./components/QuiteLeavePartyButton";
import {toast} from "react-toastify";
import {IParty} from "@/api/parties/types";
import {BookOpenIcon, CopyIcon} from "@/Icons";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {getAllPartyMembers, getParty, getUserPartyInfos} from "@/api/parties";

const PartyModule: React.FC = () => {
  const navigate = useNavigate();
  const {partyId} = useParams();
  const {party, anecdotes, setPartyData} = useParty();

  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const fetchParty = async () => {
    try {
      if (!partyId) return;
      const partyData = await getParty(partyId);
      setPartyData("party", partyData);
      setLoading(false);
      return partyData;
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue pour récupérer la partie.");
      navigate("/");
    }
  };

  const fetchUserPartyInfos = async ({
    quiet = false,
    party,
  }: {
    quiet?: boolean;
    party?: IParty;
  }) => {
    try {
      const id = party?.id || partyId;
      if (!id) return;
      if (!quiet && !party) setLoadingUser(true);
      const {userInfo, anecdotes, anecdotesToGuess} =
        await getUserPartyInfos(id);
      setPartyData("userInfos", userInfo);
      setPartyData("anecdotes", anecdotes);
      setPartyData("anecdotesToGuess", anecdotesToGuess);
      setLoadingUser(false);
    } catch (e) {
      setLoadingUser(false);
      console.error(e);
    }
  };

  const fetchMembers = async (party?: IParty) => {
    if (!party?.id) return;

    const members = await getAllPartyMembers(party.id, party.membersUid);

    setPartyData("members", members);
  };

  const fetchAll = async () => {
    if (!party) setLoading(true);
    const fetchedParty = await fetchParty();
    fetchUserPartyInfos({party: fetchedParty});
    fetchMembers(fetchedParty);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (!partyId) return <Navigate to={"/"} replace />;

  if (loading || party === null)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

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
          {!party.isFinished && (
            <div className="flex gap-4 items-center justify-center">
              <p className="text-black-100">#{party.id}</p>
              <Button
                size="small"
                icon={CopyIcon}
                onClick={() => navigator.clipboard.writeText(party.id)}
              />
            </div>
          )}
        </div>
        {!party.isFinished && <MembersList />}
        {!party.isStarted && <StartButton />}

        <div className="flex flex-col gap-4">
          {!loadingUser &&
            (party.isFinished ? (
              <PartyEndedModule />
            ) : party.isStarted ? (
              <PartyStartedModule />
            ) : (
              <>
                <h2 className="text-small-title">Tes anecdotes</h2>
                <div className="flex flex-col gap-2">
                  {anecdotes?.map((a, i) => (
                    <Anecdote
                      anecdote={a}
                      key={a.type + i}
                      onSubmit={() => fetchUserPartyInfos({quiet: true})}
                    />
                  ))}
                </div>
              </>
            ))}
        </div>
      </div>
      {!party.isFinished && (
        <div className="flex gap-2 justify-center">
          <TerminatePartyButton />
          <QuiteLeavePartyButton />
        </div>
      )}
    </div>
  );
};

export default PartyModule;
