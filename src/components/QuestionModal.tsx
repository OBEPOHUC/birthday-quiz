import { useState } from "react";
import { type IQuestion } from "../data/questions";
import { type IPlayer } from "../data/players";
import { PlayerButton } from "./PlayerButton";

interface IQuestionModalProps {
  question: IQuestion;
  players: IPlayer[];
  onAnswer: (playerId: number) => void;
  onClose: () => void;
}

export const QuestionModal = ({
  question,
  players,
  onAnswer,
  onClose,
}: IQuestionModalProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredPlayer, setAnsweredPlayer] = useState<string | null>(null);

  const handlePlayerClick = (playerId: number, playerName: string) => {
    onAnswer(playerId);
    setAnsweredPlayer(playerName);
    setShowAnswer(true);
  };

  return (
    <div className="bg-stone-950 min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      <h2 className="text-amber-500 font-serif text-xl">{question.category}</h2>

      <p className="text-white text-3xl font-serif text-center max-w-2xl">
        {question.question}
      </p>

      {!showAnswer ? (
        <div className="grid grid-cols-4 gap-3 max-w-3xl">
          {players.map((p) => (
            <PlayerButton
              key={p.id}
              name={p.name}
              onClick={() => handlePlayerClick(p.id, p.name)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <p className="text-green-500 text-xl font-serif">
            Ответил: {answeredPlayer}
          </p>
          <p className="text-amber-500 text-2xl font-serif">
            Правильный ответ: {question.answer}
          </p>
          <button
            onClick={onClose}
            className="border-2 border-amber-600 text-amber-500 px-6 py-3 rounded hover:bg-amber-600 hover:text-black transition-colors"
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};
