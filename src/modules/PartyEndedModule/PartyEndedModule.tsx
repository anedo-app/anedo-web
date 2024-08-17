import React from "react";
import Tabs from "@/components/Tabs";
import useParty from "@/hooks/useParty";
import InfoBox from "@/components/InfoBox";
import ProLier from "./components/ProLier";
import DetectivesList from "./components/DetectivesList";
import {StarIcon} from "@/Icons";

const PartyEndedModule: React.FC = () => {
  const {members} = useParty();

  const inspecteurs = members?.sort((a, b) => {
    if (!a.guessedAt || !b.guessedAt) return 0;
    if (a.guessedAt > b.guessedAt) return 1;
    if (a.guessedAt < b.guessedAt) return -1;
    return 0;
  });

  const liers = members?.sort((a, b) => {
    if (!a.bustedAt || !b.bustedAt) return 0;
    if (a.bustedAt > b.bustedAt) return 1;
    if (a.bustedAt < b.bustedAt) return -1;
    return 0;
  });

  return (
    <>
      <InfoBox
        title="La partie est terminée"
        message="La partie sera archivée, tu pourras y accéder à tout moment depuis l'accueil en cliquant sur le bouton “Archives”."
        variant="success"
        icon={StarIcon}
      />
      <div>
        <Tabs
          tabs={[
            {
              label: "Inspecteurs",
              value: "classement",
              content: <DetectivesList detectives={inspecteurs || []} />,
            },
            {
              label: "Menteurs pro",
              value: "classement",
              content: <ProLier members={liers || []} />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default PartyEndedModule;
