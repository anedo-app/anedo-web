import useParty from "@/hooks/useParty";
import InfoBox from "@/components/InfoBox";
import React, {useEffect, useRef, useState} from "react";
import {format} from "date-fns";
import {FlagIcon, StarIcon} from "@/Icons";

const CountDown: React.FC = () => {
  const {userInfos} = useParty();

  const nextTime = useRef<number>(userInfos?.nextGuessTime || 0);
  const [timer, setTimer] = useState(
    nextTime.current ? nextTime.current - new Date().getTime() : 0,
  );

  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (interval.current === undefined)
      interval.current = setInterval(() => {
        setTimer(nextTime.current - new Date().getTime());
      }, 1000);

    return () => {
      if (timer <= 0) clearInterval(interval.current);
    };
  }, [userInfos]);

  if (!nextTime.current) return null;

  if (nextTime.current - new Date().getTime() <= 0)
    return (
      <InfoBox
        variant="warning"
        icon={StarIcon}
        title="C'est à toi de jouer !"
      />
    );

  const getTime = () => {
    if (timer < 1 * 60000) return format(timer, "ss") + " secondes";
    return format(timer + 60000, "m") + " minutes";
  };

  return (
    <InfoBox
      variant="success"
      icon={FlagIcon}
      title={"Prochaine tentative dans " + getTime()}
    />
  );
};

export default CountDown;
