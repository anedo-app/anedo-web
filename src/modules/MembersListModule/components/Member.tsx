import React from "react";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import ExcludeUserModal from "./ExcludeUserModal";
import {FullPartyUserType} from "@/api/parties/types";
import {CheckmarkIcon, ForbiddenIcon, LoaderIcon} from "@/Icons";

const Member: React.FC<{
  member: FullPartyUserType;
  isOwner: boolean;
  isCurrentUser: boolean;
}> = ({member, isOwner, isCurrentUser}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex w-full items-center gap-2">
        <Avatar
          src={member.photoURL || ""}
          variant={member.isReady ? "ready" : "waiting"}
        />
        <p>{member.displayName}</p>
        {member.isReady ? (
          <CheckmarkIcon className="fill-green-100 size-6" />
        ) : (
          <LoaderIcon className="fill-yellow-100 size-6" />
        )}
      </div>
      {/* TODO: hidden for now */}
      {false && isOwner && !isCurrentUser && (
        <Button
          size="small"
          icon={ForbiddenIcon}
          onClick={() => setIsOpen(true)}
        >
          Exclure
        </Button>
      )}
      {isOpen && (
        <ExcludeUserModal
          isOpen={isOpen}
          member={member}
          onClose={() => setIsOpen(false)}
          onExclude={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Member;
