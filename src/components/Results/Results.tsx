import { useMemo } from "react";
import { useGlobalProvider } from "../../hooks";
import { View } from "../../types";

export const Results = () => {
  const { userAnswers, results, onSetView } = useGlobalProvider();

  const correctAnswersCount = useMemo(() => {
    return results.reduce((count, result, index) => {
      return result.correct_answer.trim() === userAnswers[index]
        ? count + 1
        : count;
    }, 0);
  }, [userAnswers, results]);

  const incorrectAnswersCount = useMemo(() => {
    return userAnswers.length - correctAnswersCount;
  }, [userAnswers, correctAnswersCount]);

  const totalQuestions = useMemo(() => {
    return results.length;
  }, [results]);

  const correctAnswersShare = useMemo(() => {
    return Math.round((correctAnswersCount / totalQuestions) * 100);
  }, [correctAnswersCount, totalQuestions]);

  const incorrectAnswersShare = useMemo(() => {
    return 100 - correctAnswersShare;
  }, [correctAnswersShare]);

  return (
    <div className="container mx-auto max-w-screen-lg ">
      <h1 className="text-xl flex font-bold mb-4 text-white justify-center">
        Your results: {`${correctAnswersCount}/${totalQuestions}`}
      </h1>
      <div
        id="summary-stats "
        className="text-white flex items-center flex-col"
      >
        <p className="bg-green-500 text-center w-1/2">
          <span className="number ">{correctAnswersShare}%</span>
          <span className="text"> answered correctly</span>
        </p>
        <p className="bg-red-500 text-center w-1/2 my-1">
          <span className="number">{incorrectAnswersShare}%</span>
          <span className="text"> answered incorrectly</span>
        </p>
      </div>
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
