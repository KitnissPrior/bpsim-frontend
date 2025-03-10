import React from 'react';
import './tooltip.css';

interface IProps {
    children: React.ReactNode;
    text: string;
}

export const Tooltip: React.FC<IProps> = ({ children, text }) => {
    return (
        <div className="tooltip-container">
            <span className="tooltip-trigger">
                {children}
                <span className="tooltip-text">{text}</span>
            </span>
        </div>
    );
};
