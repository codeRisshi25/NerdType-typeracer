import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ScoreBoard.css';

const getScoreBoard = (players) => {
  const scoreBoard = players.filter(player => player.WPM !== -1);
  return scoreBoard.sort((a,b)=> b.WPM - a.WPM);
}

const ScoreBoard = ({ players }) => {
  const navigate = useNavigate();
  const scoreBoard = getScoreBoard(players);
  
  if (scoreBoard.length === 0) return null;

  return (
    <div className="score-table-container">
      <h2 className="score-title">results</h2>
      <table className="score-table">
        <thead>
          <tr>
            <th scope="col">rank</th>
            <th scope="col">player</th>
            <th scope="col">wpm</th>
          </tr>
        </thead>
        <tbody>
          {scoreBoard.map((player, index) => {
            const isWinner = index === 0;
            return (
              <tr key={player._id} className={isWinner ? 'winner' : ''}>
                <td>#{index + 1}</td>
                <td>{player.nickName} {isWinner && '👑'}</td>
                <td className="score-wpm">{player.WPM}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="play-again-wrap">
        <button className="play-again-btn" onClick={() => window.location.assign('/')}>
          play again
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;