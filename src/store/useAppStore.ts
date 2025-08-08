import { create } from 'zustand';
import type { AtsScore, AnalysisResult } from '../hooks/useResumeAnalysis';
import type { ParsedResume } from '../utils/resumeParser'; // Import the new type

interface AppState {
    // State
    resumeHtml: string;
    jobDescription: string;
    initialAtsScore: AtsScore | null;
    analysisResult: AnalysisResult | null;
    isLoading: boolean;
    error: string | null;
    // --- NEW: State for templates ---
    structuredResumeData: ParsedResume | null;
    selectedTemplate: 'classic' | 'modern';

    // Actions
    setResumeHtml: (html: string) => void;
    setJobDescription: (jd: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setInitialAtsScore: (score: AtsScore | null) => void;
    setAnalysisResult: (result: AnalysisResult | null) => void;
    clearAnalysis: () => void;
    // --- NEW: Actions for templates ---
    setStructuredResumeData: (data: ParsedResume) => void;
    setSelectedTemplate: (template: 'classic' | 'modern') => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Initial State
    resumeHtml: '',
    jobDescription: '',
    initialAtsScore: null,
    analysisResult: null,
    isLoading: false,
    error: null,
    structuredResumeData: null,
    selectedTemplate: 'modern', // Default template

    // Actions to update state
    setResumeHtml: (html) => set({ resumeHtml: html }),
    setJobDescription: (jd) => set({ jobDescription: jd }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error: error }),
    setInitialAtsScore: (score) => set({ initialAtsScore: score, analysisResult: null }),
    setAnalysisResult: (result) => set({ analysisResult: result }),
    clearAnalysis: () => set({ initialAtsScore: null, analysisResult: null, error: null }),
    setStructuredResumeData: (data) => set({ structuredResumeData: data }),
    setSelectedTemplate: (template) => set({ selectedTemplate: template }),
}));