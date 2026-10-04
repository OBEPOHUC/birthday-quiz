import { type IPlayer } from "../data/players";

interface IResultsScreenProps {
  players: IPlayer[];
  onRestart: () => void;
}

export const ResultsScreen = ({ players, onRestart }: IResultsScreenProps) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);

  return (
    <div className="bg-stone-950 min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      <h1 className="text-amber-500 font-serif text-4xl text-center">
        Итоги игры
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {top3.map((p, index) => (
          <div
            key={p.id}
            className="border-2 border-amber-600 rounded p-4 flex justify-between items-center"
          >
            <span className="text-amber-500 font-serif text-xl">
              {index + 1}. {p.name}
            </span>
            <span className="text-white font-serif text-xl">
              {p.score}{" "}
              {p.score === 1 ? "балл" : p.score < 5 ? "балла" : "баллов"}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="border-2 border-amber-600 text-amber-500 px-6 py-3 rounded hover:bg-amber-600 hover:text-black transition-colors mt-4"
      >
        Играть снова
      </button>
    </div>
  );
};
