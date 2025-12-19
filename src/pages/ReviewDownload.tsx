import { Link } from 'react-router-dom';

export default function ReviewDownload() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d131b] dark:text-white font-display overflow-hidden flex flex-col h-screen">
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7ecf3] dark:border-gray-800 bg-white dark:bg-[#1a2634] px-4 md:px-10 py-3 shrink-0 z-20">
        <div className="flex items-center gap-4 text-[#0d131b] dark:text-white">
          <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">description</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">ResumeBuilder</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            <a className="text-[#0d131b] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Dashboard</a>
            <a className="text-[#0d131b] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Templates</a>
            <a className="text-[#0d131b] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Career Tips</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/subscription">
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors">
                <span className="truncate">Go Pro</span>
              </button>
            </Link>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-white dark:ring-gray-700 bg-slate-300"></div>
          </div>
        </div>
      </header>

      {/* Main Content Area: Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Controls */}
        <aside className="w-full md:w-[400px] flex flex-col bg-white dark:bg-[#1a2634] border-r border-[#e7ecf3] dark:border-gray-800 shrink-0 overflow-y-auto z-10 shadow-lg md:shadow-none">
          {/* Breadcrumbs Area */}
          <div className="flex flex-wrap gap-2 px-6 pt-6 pb-2">
            <a className="text-[#4c6c9a] dark:text-gray-400 text-sm font-medium leading-normal hover:underline" href="#">Editor</a>
            <span className="text-[#4c6c9a] dark:text-gray-400 text-sm font-medium leading-normal">/</span>
            <a className="text-[#4c6c9a] dark:text-gray-400 text-sm font-medium leading-normal hover:underline" href="#">Templates</a>
            <span className="text-[#4c6c9a] dark:text-gray-400 text-sm font-medium leading-normal">/</span>
            <span className="text-[#0d131b] dark:text-white text-sm font-medium leading-normal">Review & Download</span>
          </div>

          <div className="flex flex-col gap-6 px-6 py-4">
            {/* Heading */}
            <div>
              <h1 className="text-[#0d131b] dark:text-white text-2xl font-black leading-tight tracking-tight mb-2">
                Review Your Resume
              </h1>
              <p className="text-[#4c6c9a] dark:text-gray-400 text-sm font-normal leading-relaxed">
                Your resume is ready! Review the final version and download when you're satisfied.
              </p>
            </div>

            {/* Progress */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-green-600">check_circle</span>
                <span className="font-bold text-green-900 dark:text-green-300">100% Complete</span>
              </div>
              <p className="text-sm text-green-800 dark:text-green-400">
                All sections have been filled. You're ready to download!
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-black text-primary mb-1">5</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Sections</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-black text-primary mb-1">92%</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">ATS Score</div>
              </div>
            </div>

            {/* Download Options */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#0d131b] dark:text-white">Download Options</h3>
              
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">picture_as_pdf</span>
                  <div className="text-left">
                    <div className="font-bold text-sm">Download as PDF</div>
                    <div className="text-xs opacity-90">Best for applications</div>
                  </div>
                </div>
                <span className="material-symbols-outlined">download</span>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">description</span>
                  <div className="text-left">
                    <div className="font-bold text-sm">Download as Word</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Editable format</div>
                  </div>
                </div>
                <span className="material-symbols-outlined">download</span>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">share</span>
                  <div className="text-left">
                    <div className="font-bold text-sm">Share Link</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Public URL</div>
                  </div>
                </div>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Link to="/skills">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                  <span className="font-medium">Edit Resume</span>
                </button>
              </Link>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined">content_copy</span>
                <span className="font-medium">Duplicate Resume</span>
              </button>
            </div>

            {/* Premium Upsell */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-start gap-3 mb-3">
                <span className="material-symbols-outlined">workspace_premium</span>
                <div>
                  <h3 className="font-bold mb-1">Upgrade to Pro</h3>
                  <p className="text-sm opacity-90">
                    Unlock unlimited downloads, premium templates, and AI-powered insights.
                  </p>
                </div>
              </div>
              <Link to="/subscription">
                <button className="w-full py-2 rounded-lg bg-white text-primary font-bold hover:bg-slate-100 transition-colors text-sm">
                  Upgrade Now
                </button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Right Panel: Resume Preview */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-800 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[850px] mx-auto">
            {/* Preview Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm hover:shadow-md transition-all">
                  <span className="material-symbols-outlined">zoom_in</span>
                </button>
                <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm hover:shadow-md transition-all">
                  <span className="material-symbols-outlined">zoom_out</span>
                </button>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Page 1 of 1
              </div>
            </div>

            {/* Resume Preview */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl p-8 md:p-12 min-h-[1100px]">
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b-2 border-primary pb-4">
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">John Doe</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span>john.doe@email.com</span>
                    <span>•</span>
                    <span>+1 (555) 123-4567</span>
                    <span>•</span>
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Professional Summary</h2>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Experienced software engineer with 5+ years of expertise in full-stack development...
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Experience</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">Senior Software Engineer</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Google</p>
                        </div>
                        <span className="text-sm text-slate-500">2020 - Present</span>
                      </div>
                      <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1 ml-4">
                        <li>• Led development of key features for Google Cloud Platform</li>
                        <li>• Improved system performance by 40%</li>
                        <li>• Mentored 5 junior developers</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Education</h2>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Bachelor's in Computer Science</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Stanford University</p>
                      </div>
                      <span className="text-sm text-slate-500">2015 - 2019</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
