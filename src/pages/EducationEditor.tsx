import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export default function EducationEditor() {
  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      school: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }
  ]);

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now().toString(),
        school: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }
    ]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(
      education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-color dark:border-slate-700 bg-surface-light dark:bg-surface-dark px-4 sm:px-10 py-3 shadow-sm">
          <div className="flex items-center gap-4 text-text-main dark:text-white">
            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">description</span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">ResumeBuilder</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-center gap-8 px-8">
            <nav className="flex items-center gap-9">
              <a className="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Dashboard</a>
              <a className="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Templates</a>
              <a className="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Help</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary hover:bg-blue-600 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Save Draft</span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-slate-200 dark:border-slate-600 bg-slate-300"></div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="layout-container flex h-full grow flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex gap-6 justify-between items-end">
              <h3 className="text-text-main dark:text-white text-base font-bold leading-normal">Education</h3>
              <p className="text-text-sub dark:text-slate-400 text-sm font-medium leading-normal">Step 3 of 5</p>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Page Header */}
          <div className="flex flex-col gap-2 mt-2 mb-8">
            <h1 className="text-text-main dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Education History
            </h1>
            <p className="text-text-sub dark:text-slate-400 text-base font-normal leading-relaxed">
              Add your educational background, starting with the most recent degree or certification.
            </p>
          </div>

          {/* Education Forms */}
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={edu.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Education {index + 1}
                  </h3>
                  {education.length > 1 && (
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* School Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      School/University Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="Stanford University"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Degree & Field */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Degree <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select Degree</option>
                        <option value="High School Diploma">High School Diploma</option>
                        <option value="Associate">Associate</option>
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="Master's">Master's</option>
                        <option value="PhD">PhD</option>
                        <option value="Certificate">Certificate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Field of Study <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        placeholder="Computer Science"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      placeholder="Palo Alto, CA"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Dates & GPA */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        placeholder="3.8"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Education Button */}
          <button
            onClick={addEducation}
            className="w-full mt-6 py-3 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <span className="material-symbols-outlined">add</span>
            Add Another Education
          </button>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
            <Link to="/experience">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
            </Link>
            <Link to="/skills">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 transition-colors shadow-lg">
                Continue
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
