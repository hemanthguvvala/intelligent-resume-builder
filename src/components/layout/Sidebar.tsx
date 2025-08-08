import React, { FC } from 'react';
import { FileText, Wand2, LayoutTemplate } from 'lucide-react';

const Sidebar: FC = () => {
    return (
        <aside className="w-16 bg-foreground border-r border-card-stroke flex flex-col items-center py-4 gap-6">
            <div className="text-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <nav className="flex flex-col items-center gap-4">
                <a href="#" className="p-3 bg-primary-light text-primary rounded-lg transition-colors" title="Resume Builder">
                    <FileText size={24} />
                </a>
                <a href="#" className="p-3 text-text-secondary hover:bg-gray-100 rounded-lg transition-colors" title="AI Tools (Future)">
                    <Wand2 size={24} />
                </a>
                <a href="#" className="p-3 text-text-secondary hover:bg-gray-100 rounded-lg transition-colors" title="Templates (Future)">
                    <LayoutTemplate size={24} />
                </a>
            </nav>
        </aside>
    );
};

export default Sidebar;