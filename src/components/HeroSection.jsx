import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>Welcome to QuizMaster</h1>
        <p>Test your knowledge with our fun and challenging quizzes. Are you ready to become a QuizMaster?</p>
        <Link to="/quiz" className="btn btn-primary">
          Start Quiz
        </Link>
      </div>
      <div className="hero-image-container">
      </div>
    </section>
  );
};

export default HeroSection;
