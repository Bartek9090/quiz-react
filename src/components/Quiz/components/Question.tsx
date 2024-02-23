import { QuestionAndAnswers } from "../../../types";
import { Radio } from "../../Radio/Radio";

interface Props {
  result: QuestionAndAnswers;
  name: string;
  isHidden: boolean;
}

export const Question = ({ result, name, isHidden }: Props) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 ${
        isHidden ? "hidden" : "block"
      }`}
    >
      <header
        className="text-lg font-semibold mb-4"
        dangerouslySetInnerHTML={{ __html: result.question }}
      />
      <div className="space-y-2">
        <Radio
          name={name}
          options={result.answers.map((answer) => ({
            value: answer.trim(),
            label: answer.trim(),
          }))}
        />
      </div>
      <footer className="mt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit answer
        </button>
      </footer>
    </div>
  );
};
