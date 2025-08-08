import React, { FC } from 'react';
import type { ParsedResume } from '../../utils/resumeParser';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

const ModernTemplate: FC<{ data: ParsedResume }> = ({ data }) => {
    if (!data) return null;
    return (
        <div className="bg-white p-8 font-sans text-gray-800 A4-size">
            {/* Header */}
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800 tracking-wider">{data.name}</h1>
                <p className="text-md text-blue-700 font-medium mt-1">{data.title}</p>
                <div className="flex justify-center items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-500 flex-wrap">
                    {data.contact.email && <span className="flex items-center"><Mail size={12} className="mr-1.5" />{data.contact.email}</span>}
                    {data.contact.phone && <span className="flex items-center"><Phone size={12} className="mr-1.5" />{data.contact.phone}</span>}
                    {data.contact.linkedin && <span className="flex items-center"><Linkedin size={12} className="mr-1.5" />{data.contact.linkedin}</span>}
                    {data.contact.location && <span className="flex items-center"><MapPin size={12} className="mr-1.5" />{data.contact.location}</span>}
                </div>
            </header>

            {/* Body */}
            <div className="space-y-6">
                {data.summary && <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-200 pb-1 mb-2">Summary</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
                </section>}

                {data.skills.length > 0 && <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-200 pb-1 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">{skill}</span>
                        ))}
                    </div>
                </section>}

                {data.experience.length > 0 && <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-200 pb-1 mb-2">Experience</h2>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                                <em className="text-xs text-gray-500 font-medium">{exp.date}</em>
                            </div>
                            <p className="text-md text-gray-600 font-medium mb-1">{exp.company}</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
                                {exp.duties.map((duty, j) => <li key={j}>{duty}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>}

                {data.education.length > 0 && <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-200 pb-1 mb-2">Education</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="flex justify-between items-baseline mb-1">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{edu.university}</h3>
                                <p className="text-md text-gray-600 font-medium">{edu.degree}</p>
                            </div>
                            <em className="text-xs text-gray-500 font-medium">{edu.date}</em>
                        </div>
                    ))}
                </section>}
            </div>
        </div>
    );
};

export default ModernTemplate;