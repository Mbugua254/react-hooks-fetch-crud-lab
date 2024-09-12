import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("list"); 
  const [questions, setQuestions] = useState([]); 

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter(question => question.id !== id)); 
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q)); 
  }

  return (
    <main>
      <nav>
        <button onClick={() => setPage("list")}>View Questions</button>
        <button onClick={() => setPage("form")}>New Question</button>
      </nav>
      {page === "list" ? (
        <QuestionList
          questions={questions}
          setQuestions={setQuestions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      ) : (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      )}
    </main>
  );
}

export default App;