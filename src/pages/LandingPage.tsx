import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-50 font-display overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 sm:px-10 py-3">
        <div className="flex items-center gap-4 text-slate-900 dark:text-white">
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">description</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            ResumeBuilder
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            <a className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">
              Templates
            </a>
            <a className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">
              Pricing
            </a>
            <a className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">
              Examples
            </a>
          </div>
          <div className="flex gap-2">
            <button className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Log In</span>
            </button>
            <Link to="/templates">
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white hover:bg-blue-600 transition-colors text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/20">
                <span className="truncate">Create Resume</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="layout-container flex h-full grow flex-col">
        {/* Hero Section */}
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="@container">
              <div className="flex flex-col gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row items-center">
                <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center flex-1">
                  <div className="flex flex-col gap-4 text-left">
                    <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl lg:text-6xl">
                      Build Your Professional Resume in Minutes
                    </h1>
                    <h2 className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-xl">
                      Create a stunning resume with our AI-powered builder. Choose from professional templates, 
                      get personalized suggestions, and land your dream job faster.
                    </h2>
                  </div>
                  <div className="flex-wrap gap-3 flex">
                    <Link to="/templates">
                      <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40">
                        <span className="truncate">Get Started Free</span>
                      </button>
                    </Link>
                    <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                      <span className="truncate">See Examples</span>
                    </button>
                  </div>
                </div>
                <div className="w-full @[864px]:w-auto @[864px]:flex-1 flex justify-center items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl max-w-md w-full">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <div className="flex-1 h-8 bg-primary/20 rounded"></div>
                        <div className="flex-1 h-8 bg-primary/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <h2 className="text-slate-900 dark:text-white tracking-light text-[28px] font-bold leading-tight text-center px-4">
                Everything You Need to Create an Outstanding Resume
              </h2>
              <div className="grid grid-cols-1 @[480px]:grid-cols-2 @[864px]:grid-cols-3 gap-6 @[864px]:gap-8">
                {[
                  {
                    icon: 'auto_awesome',
                    title: 'AI-Powered Suggestions',
                    description: 'Get intelligent recommendations for content and formatting based on your industry.'
                  },
                  {
                    icon: 'palette',
                    title: 'Professional Templates',
                    description: 'Choose from dozens of beautiful, recruiter-approved templates.'
                  },
                  {
                    icon: 'download',
                    title: 'Easy Export',
                    description: 'Download your resume as PDF, Word, or share a link instantly.'
                  },
                  {
                    icon: 'edit_note',
                    title: 'Real-time Editing',
                    description: 'See your changes instantly with our live preview feature.'
                  },
                  {
                    icon: 'speed',
                    title: 'Quick & Easy',
                    description: 'Build a professional resume in under 10 minutes.'
                  },
                  {
                    icon: 'verified',
                    title: 'ATS-Friendly',
                    description: 'All templates are optimized for applicant tracking systems.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex flex-col gap-3 pb-3">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col gap-6 px-4 py-10 text-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-900 dark:text-white tracking-light text-[32px] font-bold leading-tight max-w-[720px] mx-auto">
                  Ready to Create Your Perfect Resume?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed max-w-[480px] mx-auto">
                  Join thousands of job seekers who have successfully landed their dream jobs with our resume builder.
                </p>
              </div>
              <div className="flex justify-center">
                <Link to="/templates">
                  <button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40">
                    <span className="truncate">Start Building Now</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 px-4 sm:px-10 py-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-2xl">description</span>
                <span className="text-slate-600 dark:text-slate-400 text-sm">
                  © 2025 ResumeBuilder. All rights reserved.
                </span>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm">Privacy</a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm">Terms</a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
