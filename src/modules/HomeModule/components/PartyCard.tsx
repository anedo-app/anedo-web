import React from "react";
import Button from "@/components/Button";
import {ArrowRightIcon} from "@/Icons";
import {IParty, PartyStateEnum} from "@/api/parties/types";

const PartyCard: React.FC<{party: IParty; onClick: () => void}> = ({
  party,
  onClick,
}) => (
  <div className="p-3 bg-purple-25 rounded-lg flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <h3 className="font-bold">{party.name}</h3>
      <p className="text-purple-100 text-small-stuff">
        {party.state === PartyStateEnum.PLAYING ? "Démarrée" : "En attente"}
      </p>
    </div>
    <div className="flex justify-between items-center">
      <p>{party.membersUid.length} membres</p>
      <Button size="small" icon={ArrowRightIcon} onClick={onClick}>
        Let's go
      </Button>
    </div>
  </div>
);

export default PartyCard;
