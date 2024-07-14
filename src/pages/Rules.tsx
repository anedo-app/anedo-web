import "../App.scss";
import React from "react";
import NavBar from "@/components/NavBar";
import InfoBox from "@/components/InfoBox";

const Rule: React.FC<{
  title: string;
  description: string;
  index: number;
  variant: "purple" | "green" | "yellow";
  className?: string;
}> = ({title, description, index, variant, className}) => {
  const variants = {
    purple: {
      bg: "bg-purple-25",
      index: {
        bg: "bg-purple-100",
        text: "text-purple-25",
      },
    },
    green: {
      bg: "bg-green-25",
      index: {
        bg: "bg-green-100",
        text: "text-green-25",
      },
    },
    yellow: {
      bg: "bg-yellow-25",
      index: {
        bg: "bg-yellow-100",
        text: "text-yellow-25",
      },
    },
  };

  return (
    <div
      className={`${className} ${variants[variant].bg} flex flex-col gap-2 p-4 rounded-lg`}
    >
      <div className="flex gap-2 items-center">
        <p
          className={`${variants[variant].index.bg} ${variants[variant].index.text} p-1 rounded bg-cream-100 aspect-square w-6 flex items-center justify-center`}
        >
          {index}
        </p>
        <h2 className="font-bold">{title}</h2>
      </div>
      <p className="leading-5">{description}</p>
    </div>
  );
};

const Rules: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <NavBar leftAction="back" name="Les règles" />
      <InfoBox
        title="Le principe"
        message="Anedo est un jeu d'enquête conçu pour découvrir les secrets de tous tes amis."
      />
      <div className="flex flex-col gap-4">
        <Rule
          variant="purple"
          index={1}
          title="La préparation"
          description="Tous les joueurs entrent leurs anecdotes, deux vraies et une fausse. Une fois que toutes les anecdotes ont été soumises, le maître du jeu peut lancer la partie."
        />
        <Rule
          variant="green"
          index={2}
          title="La recherche"
          description="Chaque joueur se voit attribuer les trois anecdotes soumises par un autre joueur. Son objectif est de déterminer quelle anecdote est fausse parmi les trois et à qui appartiennent ces anecdotes. En cas de mauvaise réponse, le joueur doit attendre 30 minutes avant de pouvoir soumettre une nouvelle réponse."
        />
        <Rule
          variant="yellow"
          index={3}
          title="La résolution"
          description="Une fois que tous les joueurs ont trouvé leurs anecdotes ou que le temps imparti est écoulé, un classement est généré et la partie se termine."
        />
      </div>
    </div>
  );
};

export default Rules;
