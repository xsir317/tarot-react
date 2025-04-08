import React, { useState } from 'react';
import defaultCardBack from '../../assets/images/default.svg';
import './styles.css';

const Try = () => {
    const [gameState, setGameState] = useState('input'); // input, animation, result
    const [question, setQuestion] = useState('');
    const [selectedCards, setSelectedCards] = useState([]);
    const [resultText, setResultText] = useState('');
    const totalCards = 30;

    const handleStart = () => {
        if (!question.trim()) return;
        setGameState('animation');
        // 动画完成后的回调将在CSS动画结束时触发
        setTimeout(() => {
            // 随机选择3张牌
            const selected = [];
            while (selected.length < 3) {
                const randomIndex = Math.floor(Math.random() * totalCards);
                if (!selected.includes(randomIndex)) {
                    selected.push(randomIndex);
                }
            }
            setSelectedCards(selected);
            setGameState('result');
            // 模拟生成占卜结果文本
            setResultText('根据您的问题，塔罗牌显示：这是一个充满机遇与挑战的时期。第一张牌代表当前形势，第二张牌揭示潜在机会，第三张牌预示可能的结果。建议您保持开放和积极的心态，耐心等待最佳时机。');
        }, 5000); // 等待动画完成
    };

    return (
        <div className="try-container">
            <div className="upper-section">
                <div className="cards-positions">
                    {[0, 1, 2].map((position) => (
                        <div key={position} className="card-position">
                            {gameState === 'result' && selectedCards[position] !== undefined && (
                                <div className="selected-card">
                                    <img src={defaultCardBack} alt="Selected Card" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {gameState === 'input' && (
                <div className="input-section">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="请输入你的问题..."
                        className="question-input"
                    />
                    <button onClick={handleStart} className="start-button">
                        开始
                    </button>
                </div>
            )}
            </div>

            <div className="lower-section">
                {gameState === 'animation' && (
                <div className="cards-deck animate">
                    {Array.from({ length: totalCards }).map((_, index) => (
                        <div
                            key={index}
                            className="card"
                            style={{
                                '--index': index,
                                '--total': totalCards,
                            }}
                        >
                            <img src={defaultCardBack} alt="Card Back" />
                        </div>
                    ))}
                </div>
            )}

                {gameState === 'result' && (
                    <div className="result-text">
                        {resultText}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Try;