import "../App.scss";
import useUser from "@/hooks/useUser";
import React, {Suspense} from "react";
import useParty from "@/hooks/useParty";
import Loader from "@/components/Loader";
import PartyModule from "@/modules/PartyModule";
import {toast} from "react-toastify";
import {IParty} from "@/api/parties/types";
import {useShallow} from "zustand/react/shallow";
import {Navigate, useParams} from "react-router-dom";
import {
  getAllPartyMembers,
  getParty,
  getUserPartyInfos,
  isUserPartOfParty,
} from "@/api/parties";

let promise: Promise<void> | undefined;
let fetched: boolean;
let error: boolean;

const PartySuspense: React.FC = () => {
  const {partyId} = useParams();

  const user = useUser(useShallow((s) => s.user));
  const setPartyData = useParty(useShallow((s) => s.setPartyData));

  if (error) return <Navigate to="/" replace />;
  if (fetched) return <PartyModule />;
  if (promise) throw promise;

  const fetchUserPartyInfos = async (party: IParty) => {
    const id = party?.id || partyId;
    if (!id) return;
    return await getUserPartyInfos(id);
  };

  const checkUserPartOfParty = async (partyId: string) => {
    const isPartOfParty = await isUserPartOfParty(partyId, user?.uid || "");
    if (!isPartOfParty) {
      toast.error("Tu n'es pas membre de cette partie.");
      return true;
    }
  };

  const prepareParty = async (partyId: string | undefined) => {
    try {
      if (!partyId) {
        error = true;
        return;
      }
      if (await checkUserPartOfParty(partyId)) {
        error = true;
        return;
      }
      const partyData = await getParty(partyId);
      const userPartyInfos = await fetchUserPartyInfos(partyData);
      const members = await getAllPartyMembers(
        partyData.id,
        partyData.membersUid,
      );

      setPartyData("", {party: partyData, members, ...userPartyInfos});
      fetched = true;
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue pour récupérer la partie.");
      error = true;
    }
  };

  promise = prepareParty(partyId);

  throw promise;
};

const PartyPage: React.FC = () => {
  const getPartyData = useParty(useShallow((s) => s.getPartyData));
  const storedParty = getPartyData<IParty | undefined>("party");

  if (!storedParty) {
    promise = undefined;
    fetched = false;
  }

  error = false;

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <PartySuspense />
    </Suspense>
  );
};

export default PartyPage;
