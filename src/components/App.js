import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const url = "http://localhost:4000/questions"
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function questionsUpdate(formData) {
    fetch(url, {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: [
          formData.answer1,
          formData.answer2,
          formData.answer3,
          formData.answer4,
        ],
        correctIndex: formData.correctIndex,
      }),
    })
      .then((res) => res.json())
      .then((data) => setQuestions([...questions, data]));
  }

  function questionsDelete(id) { 
    const updatedList = questions.filter((question) => question.id !== id);
    fetch(`${url}/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
    .then(() => setQuestions(updatedList));
  }

  function changeAnswer(updatedList) {
    const updatedLists = questions.map((question) => {
      if (updatedList.id === question.id) {
        return updatedList;
      } else {
        return question;
      }
    });
    setQuestions(updatedLists);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm updateQuestions={questionsUpdate} changeAnswer={changeAnswer} /> : <QuestionList questions={questions} questionsDelete={questionsDelete} />}
    </main>
  );
}

export default App;
