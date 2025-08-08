import { useCallback } from 'react';
import { htmlToText } from 'html-to-text';
import { useAppStore } from '../store/useAppStore';
import { getAiSuggestions } from '../api/geminiApi';

const keywordBible = {
    "Programming Languages": ["python", "java", "javascript", "go", "rust", "c#", "c++", "sql", "typescript"],
    "Cloud & DevOps": ["aws", "azure", "gcp", "kubernetes", "docker", "terraform", "ci/cd", "jenkins", "serverless", "microservices"],
    "AI & Machine Learning": ["tensorflow", "pytorch", "nlp", "llm", "data science", "recommendation systems"],
    "Web Development": ["react", "node.js", "angular", "django", "html", "css", "restful apis", "graphql"],
    "Databases & Data": ["postgresql", "mongodb", "mysql", "nosql", "data structures", "algorithms", "big data", "spark"],
    "Methodologies": ["agile", "scrum", "system design"]
};

export interface AtsScore {
    score: number;
    matched: string[];
    missing: string[];
    criteria: { text: string; pass: boolean; suggestion: string }[];
    keywordAnalysis?: {
        mustHave: { matched: string[], missing: string[] },
        niceToHave: { matched: string[], missing: string[] },
        bible: { category: string, keywords: string[] }[]
    }
}
export interface AnalysisResult {
    atsScore: AtsScore;
    aiSuggestions: string;
}

const extractKeywords = (text: string) => {
    return Array.from(new Set(text.toLowerCase().match(/\b[a-zA-Z-]{3,}\b/g) || []));
};

const calculateGenericAtsScore = (resumeText: string): AtsScore => {
    const checks = {
        hasContactInfo: /(phone|email|linkedin)/i.test(resumeText),
        hasSummary: /(summary|objective|profile)/i.test(resumeText),
        hasExperience: /(experience|history)/i.test(resumeText),
        hasEducation: /(education|degree)/i.test(resumeText),
        hasSkills: /(skills|technologies)/i.test(resumeText),
        usesActionVerbs: /(led|managed|developed|created|implemented|achieved|increased|architected|automated|optimized)/i.test(resumeText),
        hasMetrics: /(\d+%|\d{2,}|[ S$]\d+)/.test(resumeText),
        isSingleColumn: !/(column|grid)/i.test(resumeText),
    };
    const criteria = [
        { text: 'Includes Contact Info', pass: checks.hasContactInfo, suggestion: 'Add your phone number, email, and a link to your LinkedIn profile.' },
        { text: 'Contains a Professional Summary', pass: checks.hasSummary, suggestion: 'Add a "Summary" or "Objective" section at the top of your resume.' },
        { text: 'Contains a Work Experience Section', pass: checks.hasExperience, suggestion: 'Ensure you have a clearly labeled "Experience" or "Work History" section.' },
        { text: 'Contains an Education Section', pass: checks.hasEducation, suggestion: 'Add a section for your education, including degrees and universities.' },
        { text: 'Contains a Skills Section', pass: checks.hasSkills, suggestion: 'Create a "Skills" section to list your technical abilities.' },
        { text: 'Uses Strong Action Verbs', pass: checks.usesActionVerbs, suggestion: 'Start your bullet points with verbs like "Developed", "Optimized", or "Engineered".' },
        { text: 'Includes Quantifiable Metrics', pass: checks.hasMetrics, suggestion: 'Add numbers, percentages, or dollar amounts to show the impact of your work (e.g., "reduced latency by 20%").' },
        { text: 'Uses a Simple Format', pass: checks.isSingleColumn, suggestion: 'Avoid using multiple columns or complex tables that can confuse the ATS.' },
    ];
    const score = Math.round((criteria.filter(c => c.pass).length / criteria.length) * 100);
    return { score, matched: [], missing: [], criteria };
};

const calculateJobSpecificAtsScore = (resumeText: string, jobDescText: string): AtsScore => {
    const genericScore = calculateGenericAtsScore(resumeText);
    const resumeKeywords = new Set(extractKeywords(resumeText));
    const jobKeywords = new Set(extractKeywords(jobDescText));
    if (jobKeywords.size === 0) return { score: 0, matched: [], missing: [], criteria: genericScore.criteria };
    const mustHaveKeywords = new Set(Array.from(jobKeywords).filter(kw => /required|must have|essential/i.test(jobDescText)));
    const niceToHaveKeywords = new Set(Array.from(jobKeywords).filter(kw => !mustHaveKeywords.has(kw)));
    const matchedMustHave = [...mustHaveKeywords].filter(kw => resumeKeywords.has(kw));
    const missingMustHave = [...mustHaveKeywords].filter(kw => !resumeKeywords.has(kw));
    const matchedNiceToHave = [...niceToHaveKeywords].filter(kw => resumeKeywords.has(kw));
    const missingNiceToHave = [...niceToHaveKeywords].filter(kw => !resumeKeywords.has(kw));
    const bibleAnalysis = Object.entries(keywordBible).map(([category, keywords]) => ({
        category,
        keywords: keywords.filter(kw => resumeKeywords.has(kw))
    }));
    const matched = [...matchedMustHave, ...matchedNiceToHave];
    const missing = [...missingMustHave, ...missingNiceToHave];
    const score = Math.round(
        ((matchedMustHave.length * 1.5 + matchedNiceToHave.length) / (mustHaveKeywords.size * 1.5 + niceToHaveKeywords.size)) * 100
    );
    return {
        score: Math.min(score, 100),
        matched,
        missing,
        criteria: genericScore.criteria,
        keywordAnalysis: {
            mustHave: { matched: matchedMustHave, missing: missingMustHave },
            niceToHave: { matched: matchedNiceToHave, missing: missingNiceToHave },
            bible: bibleAnalysis
        }
    };
};

export const useResumeAnalysis = () => {
    const {
        setLoading,
        setError,
        setInitialAtsScore,
        setAnalysisResult,
        initialAtsScore
    } = useAppStore();

    const runInitialAtsCheck = useCallback((resumeHtml: string, jobDescription: string) => {
        const plainTextResume = htmlToText(resumeHtml);
        if (!plainTextResume.trim()) {
            setError("Please provide resume content before analyzing.");
            return;
        }
        setLoading(true);
        setError(null);

        setTimeout(() => {
            const isJobSpecific = jobDescription.trim().length > 0;
            const atsScore = isJobSpecific
                ? calculateJobSpecificAtsScore(plainTextResume, jobDescription)
                : calculateGenericAtsScore(plainTextResume);
            setInitialAtsScore(atsScore);
            setLoading(false);
        }, 500);
    }, [setLoading, setError, setInitialAtsScore]);

    const runAiAnalysis = useCallback(async (resumeHtml: string, jobDescription: string) => {
        if (!initialAtsScore) {
            setError("Please run the initial ATS check first.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const aiSuggestions = await getAiSuggestions(resumeHtml, jobDescription);
            setAnalysisResult({ atsScore: initialAtsScore, aiSuggestions });
        } catch (err: any) {
            setError(`Error: ${err.message}.`);
        } finally {
            setLoading(false);
        }
    }, [initialAtsScore, setLoading, setError, setAnalysisResult]);

    return { runInitialAtsCheck, runAiAnalysis };
};