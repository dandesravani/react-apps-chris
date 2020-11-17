import React, { useCallback } from 'react';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import { shuffle } from 'lodash';
import './App.css';

export default function App() {
  const [question, setQuestion] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState('any');
  const [selectedAnswer, setSelectedAnswer] = React.useState('');
  const [isCorrect, setIsCorrect] = React.useState(null);
  const [correct, setCorrect] = React.useState(0);
  const [wrong, setWrong] = React.useState(0);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAnswerSelect = (choosenAnswer) => {
    if (choosenAnswer === question?.answer) {
      setIsCorrect(true);
      setCorrect((correct) => correct + 1);
    } else {
      setIsCorrect(false);
      setWrong((wrong) => wrong + 1);
    }
  };

  console.log(question);

  const getQuestion = useCallback(() => {
    setIsCorrect(null);
    let url = 'https://opentdb.com/api.php?amount=1';

    if (selectedCategory !== 'any') url += `&category=${selectedCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const question = data.results[0];
        setQuestion({
          question: question.question,
          answer: question.correct_answer,
          choices: shuffle([
            question.correct_answer,
            ...question.incorrect_answers,
          ]),
        });
      })
      .catch(console.error);
  }, [selectedCategory]);

  React.useEffect(() => {
    getQuestion();
  }, [getQuestion, selectedCategory]);

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && (
        <ResultModal
          isCorrect={isCorrect}
          getQuestion={getQuestion}
          question={question}
        />
      )}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector
          category={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <Scoreboard correct={correct} wrong={wrong} />
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        {question && (
          <Question question={question} onAnswerSelect={handleAnswerSelect} />
        )}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button onClick={getQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}
