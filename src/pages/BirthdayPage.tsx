import { useState } from "react";
import { questions } from "../data/questions";
import { players as initialPlayers } from "../data/players";
import { CategoryColumn } from "../components/CategoryColumn";
import { QuestionModal } from "../components/QuestionModal";
import { ResultsScreen } from "../components/ResultsScreen";

export const BirthdayPage = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [answeredIds, setAnsweredIds] = useState<number[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(
    null,
  );
  const [screen, setScreen] = useState<"menu" | "question" | "results">("menu");

  const categories = [...new Set(questions.map((q) => q.category))];

  const handleSelectQuestion = (id: number) => {
    setCurrentQuestionId(id);
    setScreen("question");
  };

  const handleAnswer = (playerId: number) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, score: p.score + 1 } : p)),
    );
  };

  const handleCloseQuestion = () => {
    if (currentQuestionId !== null) {
      setAnsweredIds((prev) => [...prev, currentQuestionId]);
    }
    setCurrentQuestionId(null);
    setScreen("menu");
  };

  const handleRestart = () => {
    setPlayers(initialPlayers.map((p) => ({ ...p, score: 0 })));
    setAnsweredIds([]);
    setCurrentQuestionId(null);
    setScreen("menu");
  };

  if (screen === "results") {
    return <ResultsScreen players={players} onRestart={handleRestart} />;
  }

  if (screen === "question" && currentQuestionId !== null) {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (!currentQuestion) return null;

    return (
      <QuestionModal
        question={currentQuestion}
        players={players}
        onAnswer={handleAnswer}
        onClose={handleCloseQuestion}
      />
    );
  }

  const allAnswered = answeredIds.length === questions.length;

  return (
    <div className="bg-stone-950 min-h-screen p-6">
      <div className="grid grid-cols-5 gap-4">
        {categories.map((cat) => {
          const categoryQuestions = questions.filter((q) => q.category === cat);
          return (
            <CategoryColumn
              key={cat}
              category={cat}
              questions={categoryQuestions}
              answeredIds={answeredIds}
              onSelectQuestion={handleSelectQuestion}
            />
          );
        })}
      </div>

      {allAnswered && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setScreen("results")}
            className="border-2 border-amber-600 text-amber-500 px-8 py-4 rounded hover:bg-amber-600 hover:text-black transition-colors text-xl font-serif"
          >
            Показать результат
          </button>
        </div>
      )}
    </div>
  );
};
