import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions, onDeleteQuestion, onUpdateQuestion }) {

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:4000/questions", { signal: controller.signal })
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch questions:", error);
        }
      });

    return () => {
      controller.abort(); 
    };
  }, [setQuestions]);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteQuestion(id));
  }

  function handleUpdate(updatedQuestion) {
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: updatedQuestion.correctIndex,
      }),
    })
      .then(response => response.json())
      .then(() => onUpdateQuestion(updatedQuestion));
  }

  return (
    <section>
      <h1>Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;