import "../App.scss";
import useParty from "@/hooks/useParty";
import NavBar from "@/components/NavBar";
import Loader from "@/components/Loader";
import React, {useEffect, useState} from "react";
import PartyCard from "@/modules/HomeModule/components/PartyCard";
import {toast} from "react-toastify";
import {getParties} from "@/api/parties";
import {useNavigate} from "react-router-dom";
import {IParty, PartyStateEnum} from "@/api/parties/types";

const Archives: React.FC = () => {
  const navigate = useNavigate();
  const {resetPartyData} = useParty();

  const [parties, setParties] = useState<IParty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArchivedParties = async () => {
    try {
      setLoading(true);
      setParties(await getParties([["state", "==", PartyStateEnum.FINISHED]]));
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetPartyData();
    fetchArchivedParties();
  }, []);

  return (
    <div className="flex flex-col gap-8 h-full">
      <NavBar leftAction="back" name="Archives" />
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {parties.map((p) => (
            <PartyCard party={p} onClick={() => navigate(`/party/${p.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Archives;
