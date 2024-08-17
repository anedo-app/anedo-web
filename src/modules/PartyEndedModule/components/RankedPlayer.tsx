import React, {useState} from "react";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import InfoBox from "@/components/InfoBox";
import PlayerAnecdotesModal from "./PlayerAnecdotesModal";
import {AwardIcon, BookOpenIcon} from "@/Icons";
import {FullPartyUserType} from "@/api/parties/types";

const RankedPlayer: React.FC<{
  member: FullPartyUserType;
  rank: number;
  highlight?: boolean;
  info?: string;
}> = ({member, rank, highlight, info}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`${highlight ? "bg-cream-100" : ""} flex flex-col gap-3 p-3 rounded-lg`}
    >
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          <AwardIcon size={16} />
          <p>#{rank}</p>
        </div>
        <Avatar src={member.photoURL || ""} />
        <p className="grow">{member.displayName}</p>
        <Button
          icon={BookOpenIcon}
          size="small"
          onClick={() => setModalOpen(true)}
        >
          Anecdotes
        </Button>
      </div>
      {highlight && <InfoBox variant="success" message={info} />}
      {modalOpen && (
        <PlayerAnecdotesModal
          member={member}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RankedPlayer;
