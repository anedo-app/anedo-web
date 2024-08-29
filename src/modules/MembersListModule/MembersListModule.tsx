import Tabs from "@/components/Tabs";
import React, {useState} from "react";
import useUser from "@/hooks/useUser";
import useParty from "@/hooks/useParty";
import NavBar from "@/components/NavBar";
import Member from "./components/Member";
import {PartyStateEnum} from "@/api/parties/types";

const MembersListModule: React.FC = () => {
  const {members, computed, party} = useParty();
  const {user} = useUser();
  const isOwner = computed.isOwner();

  const [filter, setFilter] = useState("all");

  const filteredMembers = members?.filter((member) => {
    if (filter === "all" || party?.state === PartyStateEnum.PLAYING)
      return true;
    if (filter === "ready") return member.isReady;
    if (filter === "waiting") return !member.isReady;
    return true;
  });

  return (
    <div className="flex flex-col gap-8 h-full">
      <NavBar leftAction="back" name="Les joueurs" />
      {party?.state !== PartyStateEnum.PLAYING && (
        <Tabs
          onChange={setFilter}
          className="w-full"
          tabs={[
            {label: "Tous", value: "all", notification: members?.length},
            {
              label: "Prêts",
              value: "ready",
              notification: members?.filter((member) => member.isReady).length,
            },
            {
              label: "Réfléchissent",
              value: "waiting",
              notification: members?.filter((member) => !member.isReady).length,
            },
          ]}
        />
      )}
      <div className="flex flex-col gap-4 overflow-auto -my-8 -mx-6  py-8 px-8">
        {filteredMembers?.map((member) => (
          <Member
            key={member.uid}
            member={member}
            isOwner={isOwner}
            isCurrentUser={member.uid === user?.uid}
            isPartyStarted={party?.state === PartyStateEnum.PLAYING}
          />
        ))}
      </div>
    </div>
  );
};

export default MembersListModule;
