import useUser from "@/hooks/useUser";
import React, {useEffect} from "react";
import Loader from "@/components/Loader";
import {joinParty} from "@/api/parties";
import {useNavigate, useParams} from "react-router-dom";

const Join: React.FC = () => {
  const navigate = useNavigate();
  const {partyId} = useParams<{partyId: string}>();

  const {user} = useUser();

  const addUserToParty = async () => {
    if (partyId) {
      await joinParty(partyId, user?.uid);
      navigate(`/party/${partyId}`);
    }
  };

  useEffect(() => {
    if (!partyId) navigate("/");
    if (!user?.uid) return navigate(`/auth?redirect=/join/${partyId}`);

    addUserToParty();
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full justify-center items-center">
      <p className="text-small-title text-center">
        Tu vas bientôt rejoindre la partie...
      </p>
      <Loader />
    </div>
  );
};

export default Join;
