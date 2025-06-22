import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AddPlayerForm from './components/AddPlayerForm';
import QuizEngine from './components/QuizEngine';
import Leaderboard from './components/LeaderBoard';
import AboutPage from './components/AboutPage';
import NotFound from './components/NotFound'; 
import { QuizProvider } from './context/QuizContext';
import './index.css';

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/quiz" element={<AddPlayerForm />} />
              <Route path="/quiz/start" element={<QuizEngine />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/about" element={<AboutPage />} />
             
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;