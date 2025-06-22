import React, { useContext, useState, useMemo } from 'react';
import { QuizContext } from '../context/QuizContext';

const LeaderBoard = () => {
  const { quizResults } = useContext(QuizContext);
  const [sortKey, setSortKey] = useState('score');

  const sortedResults = useMemo(() => {
    if (!Array.isArray(quizResults)) {
      return [];
    }
    return quizResults
      .filter(result => typeof result.score !== 'undefined' && result.totalQuestions)
      .sort((a, b) => {
        if (sortKey === 'score') {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          return a.totalTime - b.totalTime;
        } else {
          if (a.totalTime !== b.totalTime) {
            return a.totalTime - b.totalTime;
          }
          return b.score - a.score;
        }
      });
  }, [quizResults, sortKey]);

  if (sortedResults.length === 0) {
    return <div className="container"><h2>The leaderboard is empty. Be the first to play!</h2></div>;
  }

  return (
    <div className="container leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="sort-controls">
        <span>Sort by:</span>
        <button onClick={() => setSortKey('score')} className={sortKey === 'score' ? 'active' : ''}>
          Score
        </button>
        <button onClick={() => setSortKey('time')} className={sortKey === 'time' ? 'active' : ''}>
          Time
        </button>
      </div>

      {/* === THIS IS THE CHANGE === */}
      {/* We wrap the table in a div to allow for horizontal scrolling on small screens */}
      <div className="leaderboard-table-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Category</th>
              <th>Score</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, index) => (
              <tr key={result.date + result.name + index}>
                <td>{index + 1}</td>
                <td>{result.name}</td>
                <td>{`${result.category} (${result.difficulty})`}</td>
                <td>{`${result.score} / ${result.totalQuestions}`}</td>
                <td>{`${result.totalTime}s`}</td>
                <td>{new Date(result.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;