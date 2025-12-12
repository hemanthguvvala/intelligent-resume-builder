import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ScoreBreakdown } from '../hooks/useResumeAnalysis';

export type InterviewQuestion = { type: string; question: string }

interface AppState {
    resumeHtml: string;
    jobDescription: string;
    analysisResult: { atsScore: ScoreBreakdown; aiSuggestions: string } | null;
    structuredResumeData: any | null; // Keep as 'any' to match provided file
    selectedTemplate: 'Modern' | 'Classic';
    coverLetterHtml: string;
    interviewQuestions: any[]; // Keep as 'any' to match provided file
    suggestions: any; // Keep as 'any' to match provided file
    isLoading: boolean;
    error?: string;

    set: (p: Partial<AppState>) => void;
    reset: () => void;
}


const defaultState: Omit<AppState, 'set' | 'reset'> = {
    resumeHtml: '',
    jobDescription: '',
    analysisResult: null,
    structuredResumeData: null,
    selectedTemplate: 'Modern',
    coverLetterHtml: '',
    interviewQuestions: [],
    suggestions: '',
    isLoading: false,
    error: undefined,
};

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            ...defaultState,
            set: (p) => set(p),
            reset: () => set({ ...defaultState })
        }),
        {
            name: 'irb-app',
            storage: createJSONStorage(() => localStorage),
            partialize: (s) => ({
                resumeHtml: s.resumeHtml,
                jobDescription: s.jobDescription,
                selectedTemplate: s.selectedTemplate,
                coverLetterHtml: s.coverLetterHtml,
            })
        }
    )
);