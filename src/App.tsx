import { Suspense, lazy, useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Tabs from './components/layout/Tabs';
import { useAppStore } from './store/useAppStore';

const EditorPanel = lazy(() => import('./components/organisms/EditorPanel'));
const AnalysisPanel = lazy(() => import('./components/organisms/AnalysisPanel'));
const CoverLetterPanel = lazy(() => import('./components/organisms/CoverLetterPanel'));
const InterviewPrepPanel = lazy(() => import('./components/organisms/InterviewPrepPanel'));
const PreviewPanel = lazy(() => import('./components/organisms/PreviewPanel'));

const DEFAULT_RESUME = `<h1>Your Name</h1><h2>Professional Title</h2><p>Location | Phone | Email | LinkedIn</p><p><strong>Summary</strong></p><p>Your professional summary goes here.</p>`;

export default function App() {
  const [tab, setTab] = useState<'Editor' | 'Analysis' | 'CoverLetter' | 'Interview' | 'Preview'>('Editor');
  const { resumeHtml, set } = useAppStore();

  useEffect(() => {
    if (!resumeHtml) {
      set({ resumeHtml: DEFAULT_RESUME });
    }
  }, [resumeHtml, set]);

  return (
    <div className="h-screen w-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-foreground border-b border-card-stroke px-6 py-4">
          <h1 className="text-xl font-bold text-text-primary">Intelligent Resume Builder</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <Tabs activeTab={tab} setActiveTab={setTab} />
            <div className="mt-6">
              <Suspense fallback={<div className="p-6 text-center text-text-secondary">Loading Panel…</div>}>
                {tab === 'Editor' && <EditorPanel />}
                {tab === 'Analysis' && <AnalysisPanel />}
                {tab === 'CoverLetter' && <CoverLetterPanel />}
                {tab === 'Interview' && <InterviewPrepPanel />}
                {tab === 'Preview' && <PreviewPanel />}
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}