import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { questionsData } from '../data/QuizQuestions';
import ScoreSummary from './Scores';

const TIMER_SECONDS = 15;
const QUESTIONS_PER_QUIZ = 5;

const shuffleAndTake = (array, num) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const QuizEngine = () => {
  const { quizSettings, saveResults } = useContext(QuizContext);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (!quizSettings.category || !quizSettings.difficulty) {
      navigate('/quiz');
      return;
    }
    const filteredQuestions = questionsData.filter(
      (q) => q.category === quizSettings.category && q.difficulty === quizSettings.difficulty
    );
    const selectedQuestions = shuffleAndTake(filteredQuestions, QUESTIONS_PER_QUIZ);
    if (selectedQuestions.length === 0) {
      alert("Sorry, no questions found for this category and difficulty. Please select another.");
      navigate('/quiz');
      return;
    }
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimer(TIMER_SECONDS);
    setQuizFinished(false);
  }, [quizSettings.name, quizSettings.category, quizSettings.difficulty, navigate]);

  useEffect(() => {
    if (quizFinished || isAnswered || questions.length === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleAnswerSelect(null, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isAnswered, currentQuestionIndex, quizFinished, questions]);



  const handleAnswerSelect = (option, isTimeout = false) => {
    if (isAnswered) return;

    const timeTaken = isTimeout ? TIMER_SECONDS : TIMER_SECONDS - timer;
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = option === currentQ.correctAnswer;
    
    setIsAnswered(true);
    setSelectedAnswer(option);

    const newAnswer = { isCorrect, timeTaken };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
        setTimer(TIMER_SECONDS);
      } else {
        const score = updatedAnswers.filter(a => a.isCorrect).length;
        const totalTime = updatedAnswers.reduce((acc, a) => acc + a.timeTaken, 0);
        
        saveResults(score, questions.length, totalTime);
        
        setQuizFinished(true);
      }
    }, 1500); 
  };

  if (quizFinished) {
    const score = answers.filter(a => a.isCorrect).length;
    const totalTime = answers.reduce((acc, a) => acc + a.timeTaken, 0);
    return (
        <ScoreSummary
            score={score}
            totalQuestions={questions.length}
            totalTime={totalTime}
        />
    );
  }

  if (questions.length === 0) {
    return <div className="container"><h2>Loading Questions...</h2></div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <p>Question {currentQuestionIndex + 1} / {questions.length}</p>
        <div className="timer">Time left: {timer}s</div>
      </div>
      <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
      </div>
      <h2 className="question-text">{currentQuestion.question}</h2>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            let btnClass = 'btn-option';
            if (isAnswered) {
                if (isCorrect) btnClass += ' correct';
                else if (selectedAnswer === option) btnClass += ' incorrect';
            }
            return (
                <button
                    key={index}
                    className={btnClass}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                >
                    {option}
                </button>
            );
        })}
      </div>
    </div>
  );
};

export default QuizEngine;