import React from "react";
import RankedPlayer from "./RankedPlayer";
import {FullPartyUserType} from "@/api/parties/types";

const ProLier: React.FC<{members: FullPartyUserType[]}> = ({members}) => {
  const rankedMembers = members.filter((a) => a.busted);
  const notFoundMembers = members.filter((a) => !a.busted);

  return (
    <div className="flex flex-col py-4 gap-2">
      {notFoundMembers.map((d) => (
        <RankedPlayer
          rank={1}
          member={d}
          highlight
          info="Est resté incognito jusqu’au bout"
        />
      ))}
      <div className="flex items-center gap-2 text-black-100">
        <span className="h-px w-full bg-current" />
        <h2 className="text-center shrink-0">Ont été démasqué</h2>
        <span className="h-px w-full bg-current" />
      </div>
      {rankedMembers.map((d, i) => (
        <RankedPlayer member={d} rank={i + 2} />
      ))}
    </div>
  );
};

export default ProLier;
