import React, { FC } from 'react';

interface TabsProps {
    activeTab: 'editor' | 'analysis' | 'preview';
    setActiveTab: (tab: 'editor' | 'analysis' | 'preview') => void;
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'editor', label: 'Editor' },
        { id: 'analysis', label: 'Analysis & AI' },
        { id: 'preview', label: 'Preview & Download' },
    ];

    return (
        <div className="border-b border-card-stroke">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                            ${activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Tabs;