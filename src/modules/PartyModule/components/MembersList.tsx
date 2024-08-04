import Tag from "@/components/Tag";
import React, {useEffect} from "react";
import useParty from "@/hooks/useParty";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import {EyeIcon} from "@/Icons";
import {useNavigate} from "react-router-dom";
import {useShallow} from "zustand/react/shallow";
import {getAllPartyMembers} from "@/api/parties";

const MembersList: React.FC = () => {
  const navigate = useNavigate();

  const membersUid = useParty(useShallow((s) => s.party?.membersUid));
  const {party, members, setPartyData} = useParty();

  const tagContent =
    membersUid && membersUid?.length > 1
      ? `${membersUid.length} prêts`
      : "En attente";

  const fetchMembers = async () => {
    if (!membersUid || !party?.id) return;

    const members = await getAllPartyMembers(party.id, membersUid);

    setPartyData("members", members);
  };

  useEffect(() => {
    fetchMembers();
  }, [membersUid]);

  if (!members) return null;

  return (
    <div className="flex flex-col font-bold gap-4">
      <div className="flex w-full justify-between items-center">
        <h3>Liste des joueurs</h3>
        <Tag text={tagContent} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          {members.map((member) => (
            <Avatar
              key={member.uid}
              src={member.photoURL || ""}
              isSmall
              className="-mr-2"
            />
          ))}
        </div>
        <Button
          icon={EyeIcon}
          onClick={() =>
            navigate(`/members-list`, {
              state: {members},
            })
          }
        />
      </div>
    </div>
  );
};

export default MembersList;
