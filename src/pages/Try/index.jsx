import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../../api';
import defaultCardBack from '../../assets/images/default.svg';
import './styles.css';

const Try = () => {
    const [gameState, setGameState] = useState('input'); // input, animation, result
    const [question, setQuestion] = useState('我还有多久结束单身？');
    const [selectedCards, setSelectedCards] = useState([]);
    const [resultText, setResultText] = useState('');
    const [recordId, setRecordId] = useState(null);
    const [flippedCards, setFlippedCards] = useState([]);
    const totalCards = 30;

    const handleStart = async () => {
        if (!question.trim()) return;
        
        try {
            setGameState('animation');
            const response = await api.post('/tarot/divine/do', { question });
            setSelectedCards(response.result);
            setRecordId(response.record_id);
            
            // 等待动画完成后显示卡牌
            setTimeout(() => {
                setGameState('result');
            }, 5000);
        } catch (error) {
            console.error('占卜请求失败:', error);
            setGameState('input');
        }
    };

    const handleCardClick = (index) => {
        if (gameState !== 'result' || flippedCards.includes(index)) return;
        
        setFlippedCards(prev => [...prev, index]);
    };

    useEffect(() => {
        let interpretInterval;
        if (recordId && flippedCards.length === 3) {
            interpretInterval = setInterval(async () => {
                try {
                    const response = await api.post('/tarot/divine/detail', { id: recordId });
                    if (response.interpret?.[0]?.answer) {
                        setResultText(response.interpret[0].answer);
                        clearInterval(interpretInterval);
                    }
                } catch (error) {
                    console.error('获取解释失败:', error);
                }
            }, 2000);
        }
        return () => interpretInterval && clearInterval(interpretInterval);
    }, [recordId, flippedCards]);

    return (
        <div className="try-container" data-state={gameState}>
            <div className="upper-section">
                <div className="cards-positions">
                    {[0, 1, 2].map((position) => (
                        <div key={position} className="card-position">
                            {gameState === 'result' && selectedCards[position] && (
                                <div 
                                    className={`selected-card ${flippedCards.includes(position) ? 'flipped' : ''}`}
                                    onClick={() => handleCardClick(position)}
                                >
                                    <div className="card-inner">
                                        <div className="card-front">
                                            <img src={defaultCardBack} alt="Card Back" />
                                        </div>
                                        <div className="card-back">
                                            <img 
                                                src={selectedCards[position].image} 
                                                alt={selectedCards[position].name} 
                                                style={{
                                                    transform: `rotate(${selectedCards[position].position ? 0 : 180}deg)`
                                                }}
                                            />
                                        </div>
                                    </div>
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

                {gameState === 'result' && flippedCards.length === 3 && (
                    <div className="result-text">
                        {resultText ? (
                            <ReactMarkdown>{resultText}</ReactMarkdown>
                        ) : (
                            <div>
                                <p>我们看到三张牌的内容分别是：</p>
                                <p>
                                    {selectedCards.map((card, index) => (
                                        flippedCards.includes(index) && 
                                        `${card.position ? '正位' : '逆位'}的${card.name}${index < 2 ? '，' : ''}`
                                    ))}
                                </p>
                                <p>正在擦亮水晶球，这里需要一点耐心。</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Try;