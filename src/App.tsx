import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Tabs from './components/layout/Tabs';
import EditorPanel from './components/organisms/EditorPanel';
import AnalysisPanel from './components/organisms/AnalysisPanel';
import PreviewPanel from './components/organisms/PreviewPanel';
import { useAppStore } from './store/useAppStore';

const DEFAULT_RESUME = '<p><strong>John Doe</strong></p><p>Senior Software Engineer | San Francisco, CA | 555-123-4567 | john.doe@email.com | linkedin.com/in/johndoe</p><hr><p><strong>Professional Summary</strong></p><p>Highly-motivated Senior Software Engineer with over 8 years of experience in designing, developing, and deploying scalable web applications. Proficient in cloud-native technologies and dedicated to writing clean, efficient code.</p><p><strong>Experience</strong></p><ul><li><strong>Lead Developer | Example Corp | 2020 - Present</strong><ul><li>Architected and led the development of a new microservices-based platform on AWS, reducing latency by 40% and improving scalability to handle 1 million daily active users.</li><li>Implemented a CI/CD pipeline using Jenkins and Docker, automating the deployment process and reducing release cycles from 2 weeks to 2 days.</li></ul></li><li><strong>Software Engineer | Tech Solutions Inc. | 2017 - 2020</strong><ul><li>Developed and maintained customer-facing features for a large-scale e-commerce site using React and Node.js.</li><li>Optimized database queries, which decreased average page load time by 300ms.</li></ul></li></ul><p><strong>Education</strong></p><ul><li><strong>M.S. in Computer Science | Fictional University | 2017</strong></li></ul><p><strong>Skills</strong></p><ul><li>JavaScript</li><li>Python</li><li>Go</li><li>React</li><li>Node.js</li><li>AWS</li><li>Kubernetes</li><li>Docker</li><li>PostgreSQL</li><li>System Design</li></ul>';

export default function App() {
  const { resumeHtml, setResumeHtml, jobDescription, setJobDescription } = useAppStore();
  const [activeTab, setActiveTab] = useState<'editor' | 'analysis' | 'preview'>('editor');

  useEffect(() => {
    const savedResume = localStorage.getItem('resumeHtml');
    setResumeHtml(savedResume || DEFAULT_RESUME);
  }, [setResumeHtml]);

  // Persist to localStorage
  useEffect(() => { if (resumeHtml) localStorage.setItem('resumeHtml', resumeHtml); }, [resumeHtml]);
  useEffect(() => { localStorage.setItem('jobDescription', jobDescription); }, [jobDescription]);

  return (
    <div className="h-screen w-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-foreground border-b border-card-stroke px-6 py-4">
          <h1 className="text-xl font-bold text-text-primary">Intelligent Resume Builder</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mt-6">
              {activeTab === 'editor' && <EditorPanel />}
              {activeTab === 'analysis' && <AnalysisPanel />}
              {activeTab === 'preview' && <PreviewPanel />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}