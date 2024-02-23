import { useState } from "react";
import { Formik, Form } from "formik";
import { Select } from "../Select";
import { Input } from "../Input";
import { useGlobalProvider } from "../../hooks";
import {
  QuestionAndAnswers,
  TriviaApiResponse,
  View,
  CreateQuizFormValues,
} from "../../types";
import { createTriviaApiUrl, shuffleArray } from "../../helpers";

const initialValues: CreateQuizFormValues = {
  category: "",
  amount: 5,
  difficulty: "",
  type: "",
};

export const CreateQuiz = () => {
  const { onSetResults, onSetShowLoader, onSetView } = useGlobalProvider();
  const [error, setError] = useState("");

  return (
    <div className="max-w-md mx-auto text-white">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          if (!values.category) {
            setError("Please select a category.");
            return;
          }

          const url = createTriviaApiUrl(values);

          try {
            onSetShowLoader(true);
            const res = await fetch(url);
            const data: TriviaApiResponse = await res.json();
            if (data.response_code === 1) {
              setError("Not enough results. Please try again.");
              return;
            }
            const results: QuestionAndAnswers[] = [];
            for (let i = 0; i < data.results.length; i++) {
              const result = data.results[i];
              results.push({
                question: result.question,
                correct_answer: result.correct_answer,
                answers: shuffleArray([
                  ...result.incorrect_answers,
                  result.correct_answer,
                ]),
              });
            }
            onSetResults(results);
            onSetView(View.Quiz);
          } catch (error) {
            console.log(error);
          } finally {
            actions.setSubmitting(false);
            onSetShowLoader(false);
          }
        }}
      >
        <Form className="space-y-4">
          <Select
            label="Category"
            name="category"
            options={[
              { value: "", label: "Select a category" },
              { value: "16", label: "Board games" },
              { value: "21", label: "Sports" },
              { value: "22", label: "Geography" },
              { value: "27", label: "Animals" },
              { value: "29", label: "Comics" },
            ]}
          />
          <Input
            name="amount"
            label="Number of questions"
            type="number"
            min={5}
            step={1}
          />
          <Select
            label="Difficulty"
            name="difficulty"
            options={[
              { value: "", label: "Any difficulty" },
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
          />
          <Select
            label="Type"
            name="type"
            options={[
              { value: "", label: "Any type" },
              { value: "multiple", label: "Single choice" },
              { value: "boolean", label: "True/False" },
            ]}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create quiz
          </button>
        </Form>
      </Formik>
      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};
