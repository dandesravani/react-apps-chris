import React from 'react';

export default function Question({ question, onAnswerSelect }) {
  return (
    <div className="question">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />

      {question.choices.map((choice, index) => (
        <button key={index} onClick={() => onAnswerSelect(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
}
