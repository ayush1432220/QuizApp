import React, { createContext, useState, useEffect, useCallback } from 'react'; 

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizSettings, setQuizSettings] = useState(() => {
    const savedSettings = localStorage.getItem('quizSettings');
    return savedSettings ? JSON.parse(savedSettings) : { name: '', category: '', difficulty: '' };
  });

  const [quizResults, setQuizResults] = useState(() => {
    try {
      const savedResults = localStorage.getItem('quizResults');
      return savedResults ? JSON.parse(savedResults) : [];
    } catch (error) {
      console.error("Failed to parse quiz results from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('quizSettings', JSON.stringify(quizSettings));
  }, [quizSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('quizResults', JSON.stringify(quizResults));
    } catch (error) {
      console.error("Failed to save quiz results to localStorage. Data might be too large.", error);
    }
  }, [quizResults]);

  const saveSettings = (name, category, difficulty) => {
    setQuizSettings({ name, category, difficulty });
  };

  
  const saveResults = useCallback((score, totalQuestions, totalTime) => {
    if (!quizSettings.name) {
        console.error("Attempted to save results without player name.");
        return;
    }
      
    const newResult = {
      ...quizSettings,
      score,
      totalQuestions,
      totalTime,
      date: new Date().toISOString()
    };
    setQuizResults(prevResults => [...prevResults, newResult]);
  }, [quizSettings]); 

  const resetQuizSettings = () => {
    setQuizSettings({ name: '', category: '', difficulty: '' });
  };

  const value = {
    quizSettings,
    saveSettings,
    quizResults,
    saveResults,
    resetQuizSettings,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};