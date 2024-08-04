import useParty from "@/hooks/useParty";
import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import Loader from "@/components/Loader";
import Anecdote from "./components/Anecdote";
import React, {useEffect, useState} from "react";
import MembersList from "./components/MembersList";
import QuiteLeavePartyButton from "./components/QuiteLeavePartyButton";
import {toast} from "react-toastify";
import {getParty, getUserPartyInfos} from "@/api/parties";
import {BookOpenIcon, CopyIcon, PlayCircleIcon} from "@/Icons";
import {Navigate, useNavigate, useParams} from "react-router-dom";

const PartyModule: React.FC = () => {
  const navigate = useNavigate();
  const {partyId} = useParams();
  const {party, anecdotes, setPartyData} = useParty();
  const isOwner = useParty((s) => s.computed.isOwner);
  const computedIsOwner = isOwner();

  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const fetchParty = async () => {
    try {
      if (!partyId) return;
      const partyData = await getParty(partyId);
      setPartyData("party", partyData);

      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue pour récupérer la partie.");
      navigate("/");
    }
  };

  const fetchUserPartyInfos = async (quiet: boolean = false) => {
    try {
      if (!partyId) return;
      if (!quiet && !party) setLoadingUser(true);
      const {userInfo, anecdotes} = await getUserPartyInfos(partyId);
      setPartyData("userInfos", userInfo);
      setPartyData("anecdotes", anecdotes);
      setLoadingUser(false);
    } catch (e) {
      setLoadingUser(false);
      console.error(e);
    }
  };

  useEffect(() => {
    if (!party) setLoading(true);
    fetchParty();
    fetchUserPartyInfos();
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
          <div className="flex gap-4 items-center justify-center">
            <p className="text-black-100">#{party.id}</p>
            <Button
              size="small"
              icon={CopyIcon}
              onClick={() => navigator.clipboard.writeText(party.id)}
            />
          </div>
        </div>
        <MembersList />
        {computedIsOwner && (
          <div className="flex flex-col gap-2">
            <Button
              className="w-full"
              disabled={!party.canStart}
              icon={PlayCircleIcon}
            >
              Lancer la partie
            </Button>
            <p className="text-black-100 text-tag text-center">
              La partie ne pourra-t-être lancée que lorsque tous les
              participants auront entrés leurs anecdotes.
            </p>
          </div>
        )}
        {!loadingUser && (
          <div className="flex flex-col gap-4">
            <h2 className="text-small-title">Tes anecdotes</h2>
            <div className="flex flex-col gap-2">
              {anecdotes?.map((a, i) => (
                <Anecdote
                  anecdote={a}
                  key={a.type + i}
                  onSubmit={() => fetchUserPartyInfos(true)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <QuiteLeavePartyButton />
    </div>
  );
};

export default PartyModule;
