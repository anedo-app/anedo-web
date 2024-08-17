import React from "react";
import RankedPlayer from "./RankedPlayer";
import {FullPartyUserType} from "@/api/parties/types";

const DetectivesList: React.FC<{detectives: FullPartyUserType[]}> = ({
  detectives,
}) => {
  const rankedDetectives = detectives.filter((a) => a.guessedAt);
  const unRankedDetectives = detectives.filter((a) => !a.guessedAt);

  return (
    <div className="flex flex-col py-4 gap-2">
      {rankedDetectives.map((d, i) => {
        if (i === 0)
          return (
            <RankedPlayer
              rank={1}
              member={d}
              highlight
              info="Premier à avoir trouvé le secret !"
              key={d.uid}
            />
          );
        return <RankedPlayer member={d} rank={i + 1} key={d.uid} />;
      })}
      <div className="flex items-center gap-2 text-black-100">
        <span className="h-px w-full bg-current" />
        <h2 className="text-center shrink-0">N’ont pas trouvés</h2>
        <span className="h-px w-full bg-current" />
      </div>
      {unRankedDetectives.map((d, i) => (
        <RankedPlayer
          member={d}
          rank={i + rankedDetectives.length + 1}
          key={d.uid}
        />
      ))}
    </div>
  );
};

export default DetectivesList;
