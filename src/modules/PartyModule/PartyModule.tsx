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
import PartyStartedModal from "./components/PartyStartedModal";
import TerminatePartyButton from "./components/TerminatePartyButton";
import QuiteLeavePartyButton from "./components/QuiteLeavePartyButton";
import {toast} from "react-toastify";
import {IParty} from "@/api/parties/types";
import {BookOpenIcon, CopyIcon} from "@/Icons";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {
  getAllPartyMembers,
  getParty,
  getUserPartyInfos,
  listenParty,
  listenPartyMembers,
  setPartyMemberInfos,
} from "@/api/parties";

const PartyModule: React.FC = () => {
  const navigate = useNavigate();
  const {partyId} = useParams();
  const {party, anecdotes, userInfos, setPartyData} = useParty();

  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const [partyStartedModalOpen, setPartyStartedModalOpen] = useState(false);

  const fetchParty = async () => {
    if (!partyId) return;
    const partyData = await getParty(partyId);
    setPartyData("party", partyData);
    return partyData;
  };

  const fetchUserPartyInfos = async ({party}: {party?: IParty}) => {
    const id = party?.id || partyId;
    if (!id) return;
    const {userInfo, anecdotes, anecdotesToGuess} = await getUserPartyInfos(id);
    setPartyData("userInfos", userInfo);
    setPartyData("anecdotes", anecdotes);
    setPartyData("anecdotesToGuess", anecdotesToGuess);
    setPartyStartedModalOpen(
      (party?.isStarted && !userInfo?.startedPlaying) || false,
    );
    setLoadingUser(false);
  };

  const fetchMembers = async (party?: IParty) => {
    if (!party?.id) return;

    const members = await getAllPartyMembers(party.id, party.membersUid);

    setPartyData("members", members);
  };

  const fetchAll = async () => {
    if (!party) setLoading(true);
    try {
      const fetchedParty = await fetchParty();
      await fetchUserPartyInfos({party: fetchedParty});
      setLoading(false);

      fetchMembers(fetchedParty);
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue pour récupérer la partie.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (!partyId) return;

    const unSubscribe = listenParty(partyId, (party) => {
      setPartyData("party", party);
      setPartyStartedModalOpen(party.isStarted && !userInfos?.startedPlaying);
      fetchUserPartyInfos({party});
      fetchMembers(party);
    });

    const unSubscribeMembers = listenPartyMembers(partyId, (members) => {
      setPartyData("members", members);
    });

    fetchAll();
    return () => {
      unSubscribe();
      unSubscribeMembers();
    };
  }, []);

  if (!partyId) return <Navigate to={"/"} replace />;

  if (loading || party === null)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="h-full flex flex-col justify-between gap-6 pb-8">
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
                      onSubmit={() => null}
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
