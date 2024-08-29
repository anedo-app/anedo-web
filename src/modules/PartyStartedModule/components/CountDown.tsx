import InfoBox from "@/components/InfoBox";
import React, {useEffect, useRef, useState} from "react";
import {format} from "date-fns";
import {FlagIcon, StarIcon} from "@/Icons";

const CountDown: React.FC<{nextGuessTime: number | undefined}> = ({
  nextGuessTime = 0,
}) => {
  const [timer, setTimer] = useState(
    nextGuessTime ? nextGuessTime - new Date().getTime() : 0,
  );

  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (interval.current === undefined && nextGuessTime) {
      interval.current = setInterval(() => {
        setTimer(nextGuessTime - new Date().getTime());
      }, 1000);
    }

    if (timer <= 0) {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [nextGuessTime]);

  if (!nextGuessTime) return null;

  if (nextGuessTime - new Date().getTime() <= 0)
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

const MemoCountDown = React.memo(CountDown);

export default MemoCountDown;
