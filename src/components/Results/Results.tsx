import { useMemo } from "react";
import { useGlobalProvider } from "../../hooks";
import { View } from "../../types";

export const Results = () => {
  const { userAnswers, results, onSetView } = useGlobalProvider();

  const correctAnswers = useMemo(() => {
    const correctAnswersArr = results.map((result) =>
      result.correct_answer.trim()
    );
    return userAnswers.reduce((previous, current, index) => {
      return correctAnswersArr[index] === current.trim()
        ? previous + 1
        : previous;
    }, 0);
  }, [userAnswers, results]);

  return (
    <div className="container mx-auto max-w-screen-lg py-8">
      <h1 className="text-xl font-bold mb-4">
        Your results: {`${correctAnswers}/${results.length}`}
      </h1>
      {results.map((result, index) => {
        const isCorrect = result.correct_answer.trim() === userAnswers[index];

        return (
          <div
            className="rounded-lg shadow-md p-4 mb-4"
            key={index}
            style={{ backgroundColor: isCorrect ? "#D1FAE5" : "#FECACA" }}
          >
            <p
              className="text-lg font-semibold mb-2"
              dangerouslySetInnerHTML={{ __html: result.question }}
            />
            <div className="text-gray-700">
              <p>Your answer: {userAnswers[index]}</p>
              {!isCorrect && <p>Correct answer: {result.correct_answer}</p>}
            </div>
          </div>
        );
      })}
      <div className="flex justify-center py-4">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-4"
          onClick={() => onSetView(View.Quiz)}
        >
          Start again
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => onSetView(View.Create)}
        >
          New quiz
        </button>
      </div>
    </div>
  );
};
