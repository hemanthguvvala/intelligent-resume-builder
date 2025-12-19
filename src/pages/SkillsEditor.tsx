import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SkillsEditor() {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript',
    'AWS', 'Docker', 'SQL', 'Git', 'Agile',
    'Project Management', 'Communication', 'Leadership', 'Problem Solving'
  ];

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">description</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              ResumeBuilder
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
              <a className="text-primary text-sm font-medium leading-normal" href="#">Resumes</a>
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Cover Letters</a>
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Career Blog</a>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700 bg-slate-300"></div>
          </div>
        </header>

        {/* Main Layout */}
        <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1100px] flex flex-col gap-6">
            {/* Progress & Heading Section */}
            <div className="flex flex-col gap-6">
              {/* Progress Bar */}
              <div className="w-full max-w-md">
                <div className="flex gap-6 justify-between mb-2">
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Resume Completeness</p>
                  <p className="text-primary text-sm font-medium leading-normal">80%</p>
                </div>
                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: '80%' }}></div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">Step 4 of 5: Skills</p>
              </div>

              {/* Page Heading */}
              <div>
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight mb-2">
                  Skills & Expertise
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed">
                  Add the skills that are most relevant to the positions you're applying for. Include both technical and soft skills.
                </p>
              </div>
            </div>

            {/* Skills Input Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Add Skills
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a skill and press Enter"
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    onClick={() => addSkill(inputValue)}
                    className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Suggested Skills */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Suggested Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills
                    .filter(skill => !skills.includes(skill))
                    .map((skill) => (
                      <button
                        key={skill}
                        onClick={() => addSkill(skill)}
                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors text-sm font-medium"
                      >
                        + {skill}
                      </button>
                    ))}
                </div>
              </div>

              {/* Added Skills */}
              {skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                    Your Skills ({skills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20"
                      >
                        <span className="text-sm font-medium">{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Tip */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">tips_and_updates</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Pro Tip</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Include a mix of technical skills (like programming languages and tools) and soft skills 
                    (like communication and leadership). Tailor your skills list to match the job descriptions 
                    you're targeting.
                  </p>
                </div>
              </div>
            </div>

            {/* Skill Categories (Optional Enhancement) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary">code</span>
                  <h3 className="font-bold text-slate-900 dark:text-white">Technical Skills</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Programming languages, frameworks, and tools
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary">groups</span>
                  <h3 className="font-bold text-slate-900 dark:text-white">Soft Skills</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Communication, leadership, and teamwork
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary">workspace_premium</span>
                  <h3 className="font-bold text-slate-900 dark:text-white">Certifications</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Professional certifications and licenses
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <Link to="/education">
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Back
                </button>
              </Link>
              <Link to="/review">
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 transition-colors shadow-lg">
                  Continue
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
