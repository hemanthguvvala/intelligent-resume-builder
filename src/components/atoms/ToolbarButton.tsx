import React, { FC } from 'react';

interface ToolbarButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    title: string;
    isActive?: boolean;
    disabled?: boolean;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({ onClick, children, title, isActive, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${isActive
            ? 'bg-primary-light text-primary'
            : 'text-text-secondary hover:bg-gray-200 hover:text-text-primary'
            }`}
        title={title}
    >
        {children}
    </button>
);

export default ToolbarButton;