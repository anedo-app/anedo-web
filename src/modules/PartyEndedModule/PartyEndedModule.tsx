import React from "react";
import Tabs from "@/components/Tabs";
import useParty from "@/hooks/useParty";
import InfoBox from "@/components/InfoBox";
import ProLier from "./components/ProLier";
import DetectivesList from "./components/DetectivesList";
import {StarIcon} from "@/Icons";

const PartyEndedModule: React.FC = () => {
  const {members} = useParty();

  if (!members) return;

  const inspecteurs = [...members]?.sort((a, b) =>
    !a?.guessedAt || !b?.guessedAt ? 0 : a?.guessedAt - b?.guessedAt,
  );

  const liers = [...members]?.sort((a, b) =>
    !a?.bustedAt || !b?.bustedAt ? 0 : b?.bustedAt - a?.bustedAt,
  );

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
              value: "detectives",
              content: <DetectivesList detectives={inspecteurs || []} />,
            },
            {
              label: "Menteurs pro",
              value: "liers",
              content: <ProLier members={liers || []} />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default PartyEndedModule;
