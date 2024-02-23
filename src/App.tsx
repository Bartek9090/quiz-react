import { useMemo } from "react";
import { useGlobalProvider } from "./hooks";
import { CreateQuiz, Loader, Quiz, Results } from "./components";
import { View } from "./types";

function App() {
  const { showLoader, view } = useGlobalProvider();

  const renderView = useMemo(() => {
    switch (view) {
      case View.Quiz:
        return <Quiz />;
      case View.Done:
        return <Results />;
      default:
        return <CreateQuiz />;
    }
  }, [view]);

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto max-w-screen-lg py-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8 shadow-lg">
          Test Your knowledge
        </h1>
        {renderView}
      </div>
      {showLoader && <Loader />}
    </div>
  );
}

export default App;
