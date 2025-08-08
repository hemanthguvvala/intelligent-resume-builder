import React, { FC } from 'react';
import type { ParsedResume } from '../../utils/resumeParser';

const ClassicTemplate: FC<{ data: ParsedResume }> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="bg-white p-10 font-serif A4-size">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-wider">{data.name}</h1>
                <p className="text-lg font-light text-gray-600">{data.title}</p>
                <div className="text-xs text-gray-500 mt-2">
                    {data.contact.location} | {data.contact.phone} | {data.contact.email} | {data.contact.linkedin}
                </div>
            </header>

            {/* Summary */}
            <section className="mb-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2">Summary</h2>
                <p className="text-sm text-gray-800 leading-normal">{data.summary}</p>
            </section>

            {/* Skills */}
            <section className="mb-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2">Core Competencies</h2>
                <p className="text-sm text-gray-800 leading-normal">{data.skills.join(' | ')}</p>
            </section>

            {/* Experience */}
            <section className="mb-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2">Professional Experience</h2>
                {data.experience.map((exp, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">{exp.company}</h3>
                            <p className="text-sm font-light">{exp.date}</p>
                        </div>
                        <p className="text-md italic text-gray-600 mb-1">{exp.title}</p>
                        <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                            {exp.duties.map((duty, j) => <li key={j}>{duty}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            {/* Education */}
            <section>
                <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2">Education</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold">{edu.university}</h3>
                            <p className="text-md italic text-gray-600">{edu.degree}</p>
                        </div>
                        <p className="text-sm font-light">{edu.date}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ClassicTemplate;