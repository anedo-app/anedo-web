import "../App.scss";
import useUser from "@/hooks/useUser";
import useParty from "@/hooks/useParty";
import Loader from "@/components/Loader";
import PartyModule from "@/modules/PartyModule";
import React, {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {IParty} from "@/api/parties/types";
import {useShallow} from "zustand/react/shallow";
import {useNavigate, useParams} from "react-router-dom";
import {
  getAllPartyMembers,
  getParty,
  getUserPartyInfos,
  isUserPartOfParty,
  listenParty,
  listenPartyMembers,
} from "@/api/parties";

const Party: React.FC = () => {
  const navigate = useNavigate();
  const {partyId} = useParams();

  const {user} = useUser(useShallow((s) => ({user: s.user})));
  const {setPartyData, getPartyData} = useParty(
    useShallow((s) => ({
      setPartyData: s.setPartyData,
      getPartyData: s.getPartyData,
    })),
  );

  const storedParty = getPartyData<IParty | undefined>("party");
  const [loading, setLoading] = useState(!storedParty);
  const firstLand = useRef(true);

  const fetchUserPartyInfos = async (party: IParty) => {
    const id = party?.id || partyId;
    if (!id) return;

    return await getUserPartyInfos(id);
  };

  const fetchMembers = async (party: IParty) => {
    if (!party?.id) return;

    const members = await getAllPartyMembers(party.id, party.membersUid);

    setPartyData("members", members);
  };

  const checkUserPartOfParty = async (partyId: string) => {
    const isPartOfParty = await isUserPartOfParty(partyId, user?.uid || "");
    if (!isPartOfParty) {
      toast.error("Tu n'es pas membre de cette partie.");
      navigate("/");
      return true;
    }
  };

  const prepareParty = async (partyId: string) => {
    try {
      if (await checkUserPartOfParty(partyId)) return;

      const partyData = await getParty(partyId);
      const userPartyInfos = await fetchUserPartyInfos(partyData);
      const members = await getAllPartyMembers(
        partyData.id,
        partyData.membersUid,
      );

      setPartyData("", {party: partyData, members, ...userPartyInfos});
      setLoading(false);
      firstLand.current = false;

      const unSubscribe = listenParty(partyId, async (party) => {
        if (firstLand.current) return;

        const userPartyInfos = await fetchUserPartyInfos(party);

        setPartyData("", {party: party, ...userPartyInfos});
        await fetchMembers(party);
      });

      const unSubscribeMembers = listenPartyMembers(partyId, (members) => {
        if (firstLand.current) return;

        setPartyData("members", members);
        if (storedParty) fetchUserPartyInfos(storedParty);
      });

      return () => {
        unSubscribe();
        unSubscribeMembers();
      };
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue pour récupérer la partie.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (!partyId) return navigate("/");

    prepareParty(partyId);

    const unSubscribe = listenParty(partyId, async (party) => {
      if (firstLand.current) return;

      const userPartyInfos = await fetchUserPartyInfos(party);

      setPartyData("", {party: party, ...userPartyInfos});
      await fetchMembers(party);
    });

    const unSubscribeMembers = listenPartyMembers(partyId, (members) => {
      if (firstLand.current) return;

      setPartyData("members", members);
      if (storedParty) fetchUserPartyInfos(storedParty);
    });

    return () => {
      unSubscribe();
      unSubscribeMembers();
    };
  }, []);

  if (loading || storedParty === null)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return <PartyModule />;
};

export default Party;
