import React, { FC, memo } from 'react';
import { BrainCircuit, Trash2, Lightbulb, XCircle } from 'lucide-react';
import AnalysisReport from './AnalysisReport';
import { useAppStore } from '../../store/useAppStore';
import { useResumeAnalysis } from '../../hooks/useResumeAnalysis';
import type { AtsScore } from '../../hooks/useResumeAnalysis';

const Loader: FC = () => (
    <div className="flex flex-col items-center justify-center text-center h-full py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-text-secondary font-medium">Analyzing...</p>
    </div>
);

const WelcomeState: FC = () => (
    <div className="text-center text-text-secondary h-full flex flex-col justify-center items-center py-10">
        <BrainCircuit size={48} className="mb-4 text-gray-300" />
        <h3 className="font-bold text-lg text-gray-600">Ready for Analysis</h3>
        <p className="text-sm mt-1">Paste a job description (optional) and click a button to start.</p>
    </div>
);

const InitialScoreDisplay: FC<{ score: AtsScore }> = ({ score }) => {
    const scoreColor = score.score >= 80 ? 'text-green-600' : score.score >= 50 ? 'text-yellow-600' : 'text-red-600';
    const improvements = score.criteria.filter(c => !c.pass);

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-lg text-text-secondary">Initial ATS Score:</p>
                <p className={`text-5xl font-bold ${scoreColor}`}>{score.score}%</p>
            </div>
            {improvements.length > 0 && (
                <div className="p-4 border border-card-stroke rounded-lg">
                    <h4 className="font-semibold text-lg text-text-primary">Areas to Improve</h4>
                    <ul className="mt-2 space-y-2">
                        {improvements.map((item, index) => (
                            <li key={index} className="flex items-start text-sm">
                                <XCircle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                <span className={'text-text-primary'}><strong>{item.text}:</strong> {item.suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <p className="text-sm text-center text-text-secondary mt-4">For a deeper analysis and specific rewrite examples, get AI suggestions.</p>
        </div>
    )
};

const AnalysisPanel: FC = () => {
    const {
        jobDescription,
        setJobDescription,
        initialAtsScore,
        analysisResult,
        isLoading,
        error,
        resumeHtml
    } = useAppStore();

    const { runInitialAtsCheck, runAiAnalysis } = useResumeAnalysis();

    return (
        <div className="bg-foreground p-6 rounded-b-xl shadow-sm border border-t-0 border-card-stroke flex flex-col">
            <label htmlFor="job-description" className="block text-sm font-medium text-text-primary mb-2">
                Paste Job Description (Optional)
            </label>
            <textarea
                id="job-description"
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-3 border border-card-stroke rounded-lg shadow-sm focus:ring-2 focus:ring-primary transition bg-background"
                placeholder="For a job-specific analysis, paste the description here."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <button
                    onClick={() => runInitialAtsCheck(resumeHtml, jobDescription)}
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition-all duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <BrainCircuit size={18} /> {isLoading && !analysisResult ? 'Checking...' : '1. Check ATS Score'}
                </button>
                <button
                    onClick={() => runAiAnalysis(resumeHtml, jobDescription)}
                    disabled={!initialAtsScore || isLoading}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Lightbulb size={18} /> {isLoading && initialAtsScore ? 'Generating...' : '2. Get AI Suggestions'}
                </button>
            </div>

            <div id="analysis-results" className="mt-6 flex-grow">
                {isLoading && <Loader />}
                {!isLoading && error && <p className="text-red-500 text-center p-4">{error}</p>}
                {!isLoading && !error && (
                    analysisResult ? <AnalysisReport result={analysisResult} /> :
                        initialAtsScore ? <InitialScoreDisplay score={initialAtsScore} /> :
                            <WelcomeState />
                )}
            </div>
        </div>
    );
};

export default memo(AnalysisPanel);