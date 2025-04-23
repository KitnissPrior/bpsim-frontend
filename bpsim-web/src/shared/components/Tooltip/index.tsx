import React from 'react';
import './tooltip.css';

interface IProps {
    children: React.ReactNode;
    text: string;
    disabled?: boolean
}

export const Tooltip: React.FC<IProps> = ({ children, text, disabled }) => {
    return (
        <div className="tooltip-container" aria-disabled={disabled}>
            <span className="tooltip-trigger">
                {children}
                <span className="tooltip-text">{text}</span>
            </span>
        </div>
    );
};
