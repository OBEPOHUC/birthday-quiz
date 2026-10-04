import { type IQuestion } from "../data/questions";

interface ICategoryColumnProps {
  category: string;
  questions: IQuestion[];
  answeredIds: number[];
  onSelectQuestion: (id: number) => void;
}

export const CategoryColumn = ({
  category,
  questions,
  answeredIds,
  onSelectQuestion,
}: ICategoryColumnProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-amber-500 font-serif text-center text-lg min-h-[3rem]">
        {category}
      </h2>
      <div className="flex flex-col gap-2">
        {questions.map((q) => {
          const isAnswered = answeredIds.includes(q.id);
          return (
            <button
              key={q.id}
              disabled={isAnswered}
              onClick={() => onSelectQuestion(q.id)}
              className={`border-2 rounded p-3 text-center transition-colors ${
                isAnswered
                  ? "border-gray-700 text-gray-700 cursor-not-allowed"
                  : "border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-black"
              }`}
            >
              ?
            </button>
          );
        })}
      </div>
    </div>
  );
};
