import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';

const getMotivationalMessage = (percentage) => {
  if (percentage === 100) return "Flawless Victory! You're a Quiz Champion!";
  if (percentage >= 80) return "Excellent work! You really know your stuff.";
  if (percentage >= 50) return "Good job! A solid performance.";
  if (percentage >= 20) return "You're getting there! Keep practicing.";
  return "More caffeine, maybe? Don't worry, try again!";
};

const Scores = ({ score, totalQuestions, totalTime }) => {
  const navigate = useNavigate();
  const { quizSettings, resetQuizSettings } = useContext(QuizContext);

  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const message = getMotivationalMessage(percentage);

  const handlePlayAgain = () => {
    resetQuizSettings(); 
    navigate('/quiz');   
  };

  const handleGoHome = () => {
    navigate('/'); 
  };

  const handleViewLeaderboard = () => {
    navigate('/leaderboard'); 
  };

  return (
    <div className="score-summary-container">
      <h2>{message}</h2>
      <h3>Well done, {quizSettings.name}!</h3>
      <div className="summary-details">
        <p >Your Final Score: <strong>{score} / {totalQuestions}</strong></p>
        <p>Total Time Taken: <strong>{totalTime} seconds</strong></p>
      </div>
      <div className="summary-actions">
        <button className="btn btn-primary" onClick={handlePlayAgain}>
          Play Again
        </button>
        <button className="btn" onClick={handleViewLeaderboard}>
          View Leaderboard
        </button>
        <button className="btn" onClick={handleGoHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Scores;