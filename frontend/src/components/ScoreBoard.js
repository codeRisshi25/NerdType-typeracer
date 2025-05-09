import React from 'react';
import '../styles/ScoreBoard.css';

const getScoreBoard = (players) => {
    const scoreBoard = players.filter(player => player.WPM !== -1);
    return scoreBoard.sort((a,b)=> a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0);
}

const ScoreBoard = ({players}) => {
    const scoreBoard = getScoreBoard(players);
    
    if (scoreBoard.length === 0) {
        return null;
    }
    
    const winner = scoreBoard[0];

    return (
        <div className="score-table-container">
            <h2 className="score-title">Game Results</h2>
            <table className="score-table">
                <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Player</th>
                        <th scope="col">WPM</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        scoreBoard.map((player, index) => {
                            const isWinner = index === 0;
                            return (
                                <tr key={player._id} className={isWinner ? 'winner' : ''}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{player.nickName} {isWinner && '🏆'}</td>
                                    <td className="score-wpm">{player.WPM}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ScoreBoard;