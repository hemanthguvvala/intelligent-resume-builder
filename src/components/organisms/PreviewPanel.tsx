import React, { FC, memo } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';

declare global {
    interface Window { html2pdf: any; }
}

const TemplateSelector: FC = () => {
    const { selectedTemplate, setSelectedTemplate } = useAppStore();
    const templates = [
        { id: 'modern', name: 'Modern' },
        { id: 'classic', name: 'Classic' },
    ];

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Select a Template</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map(template => (
                    <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id as any)}
                        className={`relative p-2 border-2 rounded-lg transition-all ${selectedTemplate === template.id ? 'border-primary' : 'border-card-stroke hover:border-gray-300'}`}
                    >
                        <img src={`/template-previews/${template.id}.png`} alt={`${template.name} template preview`} className="w-full h-auto rounded-md bg-gray-200" />
                        <p className="text-sm font-medium mt-2 text-center">{template.name}</p>
                        {selectedTemplate === template.id && (
                            <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                                <CheckCircle size={16} />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

const PreviewPanel: FC = () => {
    const { structuredResumeData, selectedTemplate } = useAppStore();

    const handleDownload = () => {
        const element = document.getElementById('template-to-print');
        if (!element) {
            console.error("Preview element not found for PDF generation.");
            return;
        };

        const opt = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 4, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        if (window.html2pdf) {
            window.html2pdf().set(opt).from(element).save();
        } else {
            console.error("html2pdf library not found. Make sure it's loaded.");
            alert("Could not download PDF. Library not available.");
        }
    };

    const renderTemplate = () => {
        if (!structuredResumeData) {
            return <div className="text-center text-text-secondary p-10">Edit your resume content to see the live template preview.</div>;
        }

        const templateToRender = () => {
            switch (selectedTemplate) {
                case 'modern':
                    return <ModernTemplate data={structuredResumeData} />;
                case 'classic':
                    return <ClassicTemplate data={structuredResumeData} />;
                default:
                    return <ModernTemplate data={structuredResumeData} />;
            }
        };

        return <div id="template-to-print">{templateToRender()}</div>
    };

    return (
        <div className="bg-foreground p-6 rounded-b-xl shadow-sm border border-t-0 border-card-stroke flex flex-col">
            <TemplateSelector />

            <div className="border border-card-stroke flex-grow overflow-y-auto bg-gray-100 p-2 rounded-lg">
                {renderTemplate()}
            </div>

            <button onClick={handleDownload} className="w-full mt-6 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2">
                <Download size={18} /> Download as PDF
            </button>
        </div>
    );
};

export default memo(PreviewPanel);