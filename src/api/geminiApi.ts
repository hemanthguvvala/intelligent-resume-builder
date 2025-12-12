import type { InterviewQuestion } from '../store/useAppStore'

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

async function callModel(prompt: string): Promise<string> {
    const r = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    if (!r.ok) {
        const err = await r.text();
        throw new Error(`AI error: ${r.status} ${err}`);
    }
    const data = await r.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export const getAiSuggestions = async (resume: string, jobDesc: string): Promise<string> => {
    const isJobSpecific = jobDesc.trim().length > 0
    const prompt = `Act as a top-tier technical recruiter for a FAANG company. Analyze the provided resume.

**CRITICAL INSTRUCTIONS:**
1. **Return HTML only** using <h4>, <p>, <ul>, <li>, <strong>, <em>.
2. Make suggestions concrete and action-oriented.

<h4>Top Strengths</h4>
<p>1–2 concise points with examples.</p>

<h4>Primary Areas to Improve</h4>
<ul><li>Bullet-level edits.</li><li>Missing metrics.</li><li>Formatting gaps.</li></ul>

<h4>Keyword Gaps${isJobSpecific ? ' (vs Job Description)' : ''}</h4>
<ul></ul>

<h4>5 Ready-to-Paste Bullets</h4>
<ul></ul>

---

RESUME (plain text allowed):\n${resume.slice(0, 15000)}

${isJobSpecific ? `JOB DESCRIPTION:\n${jobDesc.slice(0, 8000)}` : ''}`

    return callModel(prompt)
}

export const getAiCoverLetter = async (resume: string, jobDesc: string): Promise<string> => {
    const prompt = `Write a crisp, 250–350 word cover letter in HTML (<p>, <strong>, <em>, <ul>, <li>) referencing the resume and job description. Keep it specific and metric-driven.

RESUME:\n${resume.slice(0, 12000)}\n\nJOB DESCRIPTION:\n${jobDesc.slice(0, 8000)}`
    return callModel(prompt)
}

export const getAiInterviewQuestions = async (resume: string, jobDesc: string): Promise<InterviewQuestion[]> => {
    const prompt = `Generate JSON array of interview questions with keys: type (Technical|Behavioral|Resume), question. 12–15 total.

RESUME:\n${resume.slice(0, 10000)}\n\nJOB DESCRIPTION:\n${jobDesc.slice(0, 6000)}`
    const raw = await callModel(prompt)
    try {
        const jsonStart = raw.indexOf('[')
        const jsonEnd = raw.lastIndexOf(']')
        const json = JSON.parse(raw.slice(jsonStart, jsonEnd + 1))
        return json
    } catch {
        // Fallback: split lines
        return raw
            .split('\n')
            .map((q: string) => q.trim())
            .filter(Boolean)
            .slice(0, 12)
            .map((q: string) => ({ type: 'Technical', question: q }))
    }
}
