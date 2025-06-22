import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { getUniqueCategories, getUniqueDifficulties } from '../data/QuizQuestions';

const AddPlayerForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  
  const { saveSettings } = useContext(QuizContext);
  const navigate = useNavigate();

  const categories = getUniqueCategories();
  const difficulties = getUniqueDifficulties();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !difficulty) return;
    saveSettings(name, category, difficulty);
    navigate('/quiz/start');
  };

  return (
    <div className="form-container">
      <h2>Set Up Your Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Player Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Select a category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
            <option value="" disabled>Select difficulty</option>
            {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!name || !category || !difficulty}>
          Start
        </button>
      </form>
    </div>
  );
};

export default AddPlayerForm;