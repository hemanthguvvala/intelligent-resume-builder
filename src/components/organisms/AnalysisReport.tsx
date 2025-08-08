import React, { FC } from 'react';
import type { AnalysisResult } from '../../hooks/useResumeAnalysis';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

const AnalysisReport: FC<{ result: AnalysisResult }> = ({ result }) => {
    const { atsScore, aiSuggestions } = result;
    const scoreColor = atsScore.score >= 80 ? 'text-green-600' : atsScore.score >= 50 ? 'text-yellow-600' : 'text-red-600';
    const isJobSpecific = !!atsScore.keywordAnalysis;

    const renderKeywords = (keywords: string[], type: 'matched' | 'missing') => {
        if (keywords.length === 0) {
            return `<p class="text-sm text-gray-500">${type === 'matched' ? 'No keywords found.' : 'None missing. Great job!'}</p>`;
        }
        const bgColor = type === 'matched' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
        return keywords.slice(0, 20).map(k => `<span class="${bgColor} text-xs font-medium px-2.5 py-1 rounded-full">${k}</span>`).join('');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">ATS & Recruiter Analysis</h3>
                <div className="text-center mb-4 p-4 bg-white rounded-lg">
                    <p className="text-lg text-gray-600">{isJobSpecific ? 'ATS Match Score:' : 'General ATS Score:'}</p>
                    <p className={`text-5xl font-bold ${scoreColor}`}>{atsScore.score}%</p>
                    <p className="text-xs text-gray-500 mt-1">{atsScore.score >= 80 ? "Excellent! You'll likely pass the ATS." : "Good, but could be improved for better matching."}</p>
                </div>

                {isJobSpecific && atsScore.keywordAnalysis ? (
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800">Must-Have Keywords ({atsScore.keywordAnalysis.mustHave.matched.length}/{atsScore.keywordAnalysis.mustHave.matched.length + atsScore.keywordAnalysis.mustHave.missing.length})</h4>
                            <div className="flex flex-wrap gap-2 mt-2" dangerouslySetInnerHTML={{ __html: renderKeywords(atsScore.keywordAnalysis.mustHave.missing, 'missing') }} />
                            <div className="flex flex-wrap gap-2 mt-2" dangerouslySetInnerHTML={{ __html: renderKeywords(atsScore.keywordAnalysis.mustHave.matched, 'matched') }} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800">Nice-To-Have Keywords</h4>
                            <div className="flex flex-wrap gap-2 mt-2" dangerouslySetInnerHTML={{ __html: renderKeywords(atsScore.keywordAnalysis.niceToHave.missing, 'missing') }} />
                            <div className="flex flex-wrap gap-2 mt-2" dangerouslySetInnerHTML={{ __html: renderKeywords(atsScore.keywordAnalysis.niceToHave.matched, 'matched') }} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800">ATS Best Practices Checklist</h4>
                        <ul className="mt-2 space-y-2">
                            {atsScore.criteria.map((item, index) => (
                                <li key={index} className="flex items-center text-sm">
                                    {item.pass ? <CheckCircle className="text-green-500 mr-2" size={16} /> : <XCircle className="text-red-500 mr-2" size={16} />}
                                    <span className={item.pass ? 'text-gray-700' : 'text-red-600 font-semibold'}>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center"><Lightbulb className="mr-2 text-blue-600" />AI-Powered Suggestions</h3>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: aiSuggestions }}></div>
            </div>

            {isJobSpecific && atsScore.keywordAnalysis && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Software Engineer Keyword Bible</h3>
                    <p className="text-sm text-gray-600 mb-4">Keywords found in your resume from key software engineering categories.</p>
                    <div className="space-y-3">
                        {atsScore.keywordAnalysis.bible.map(cat => cat.keywords.length > 0 && (
                            <div key={cat.category}>
                                <h5 className="font-semibold text-md text-gray-700">{cat.category}</h5>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {cat.keywords.map(kw => (
                                        <span key={kw} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{kw}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisReport;