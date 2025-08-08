export const getAiSuggestions = async (resume: string, jobDesc: string): Promise<string> => {
    // IMPORTANT: Add your Google AI Studio API key here
    const apiKey = "AIzaSyDqH1mY4zWlQUBgHLzFLxMRlgQ7ft1edgg";
    if (!apiKey) {
        throw new Error("API key is missing. Please add your Gemini API key in src/api/geminiApi.ts");
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const isJobSpecific = jobDesc.trim().length > 0;

    const prompt = `Act as a top-tier technical recruiter for a FAANG company. Analyze the provided resume.

    **CRITICAL INSTRUCTIONS:**
    1.  **Format your entire response using HTML** (h4, p, ul, li, strong, em tags).
    2.  Provide specific, actionable, and concise suggestions based on authoritative best practices.
    3.  Be direct and professional.

    **ANALYSIS SECTIONS:**

    <h4>Top Strengths</h4>
    <p>Briefly mention 1-2 things the resume does well, citing best practices (e.g., "Excellent use of quantifiable metrics to show impact").</p>

    <h4>Primary Areas to Improve</h4>
    <p>This is the most important section. Provide a bulleted list of the 2-3 most critical improvements the candidate should make. Focus on rewriting bullet points for impact and aligning skills with the job description.</p>
    
    <h4>Example Rewritten Bullet Point</h4>
    <p>Identify one weak bullet point from the resume and provide a rewritten "before" and "after" version that demonstrates the use of metrics and strong action verbs.</p>
    
    ${isJobSpecific
            ? `<h4>Job Description Alignment</h4><p>Briefly comment on how well the resume aligns with the job description and mention any critical missing keywords.</p>`
            : ''
        }

    **Resume (in HTML):**
    ${resume}

    ${isJobSpecific ? `**Job Description:**\n${jobDesc}` : ''}
    `;


    const payload = { contents: [{ parts: [{ text: prompt }] }] };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "<p>Could not generate AI suggestions. The response from the AI was empty.</p>";
};