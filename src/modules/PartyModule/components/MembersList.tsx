import React from "react";
import Tag from "@/components/Tag";
import useParty from "@/hooks/useParty";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import {EyeIcon} from "@/Icons";
import {useNavigate} from "react-router-dom";

const MembersList: React.FC = () => {
  const navigate = useNavigate();
  const {party, members} = useParty();

  const tagContent = () => {
    if (party?.isStarted)
      return members
        ? `${members.filter((m) => m.guessed).length} / ${members.length} trouvées`
        : "Calculs...";

    return members && members?.length > 1
      ? `${members.filter((m) => m.isReady).length} / ${members.length} prêts`
      : "En attente";
  };

  if (!members) return null;

  return (
    <div className="flex flex-col font-bold gap-4">
      <div className="flex w-full justify-between items-center">
        <h3>
          {party?.isStarted ? "Avancement de l’enquête" : "Liste des joueurs"}
        </h3>
        <Tag text={tagContent()} />
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
