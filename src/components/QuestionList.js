import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, questionDelete}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((item) => {
        return (
          <QuestionItem question={item} key={item.id} questionDelete={questionDelete} />
        );
      })}
      </ul>
    </section>
  );
}

export default QuestionList;
