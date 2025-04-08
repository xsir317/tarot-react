import React, { useState, useEffect } from 'react';
import defaultCardBack from '../../assets/images/default.svg';
import './styles.css';

const Try = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const totalCards = 30; // 扑克牌总数

    useEffect(() => {
        // 组件加载后自动开始动画
        setIsAnimating(true);
    }, []);

    return (
        <div className="try-container">
            <div className={`cards-deck ${isAnimating ? 'animate' : ''}`}>
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
        </div>
    );
};

export default Try;