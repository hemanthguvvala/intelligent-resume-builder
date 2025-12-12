import { htmlToText } from 'html-to-text'

export interface ScoreBreakdown {
    total: number
    sections: Record<string, number>
    details: {
        keywordsMatched: string[]
        missingKeywords: string[]
        actionVerbRatio: number
        metricsRatio: number
        recentWeight: number
        lengthOk: boolean
        oneColumnLikely: boolean
        penalties: string[]
    }
}

const ACTION_VERBS = ['built', 'created', 'led', 'designed', 'implemented', 'optimized', 'reduced', 'increased', 'migrated', 'launched', 'owned', 'developed', 'scaled', 'automated']
const METRIC_REGEX = /\b(\d+\.?\d*%?|\d+\+|\$\d+[kKmM]?|\b[0-9]{4}\b)\b/g

const ALIASES: Record<string, string[]> = {
    postgresql: ['postgres', 'postgresql', 'psql', 'pg'],
    mysql: ['mysql'],
    react: ['react', 'react.js', 'reactjs'],
    spring: ['spring', 'spring boot', 'spring-boot', 'springboot'],
    docker: ['docker', 'containers', 'containerization'],
    aws: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'rds'],
}

function tokenize(s: string): string[] {
    return s.toLowerCase().replace(/[^a-z0-9+\s.-]/g, ' ').split(/\s+/).filter(Boolean)
}

function extractKeywordsFromJD(jd: string): string[] {
    const tokens = tokenize(jd)
    const stop = new Set(['and', 'or', 'the', 'a', 'to', 'for', 'with', 'of', 'in', 'on', 'at', 'by', 'an', 'be', 'is', 'are', 'as', 'this', 'that', 'will', 'you', 'we'])
    const freq: Record<string, number> = {}
    for (const t of tokens) if (!stop.has(t) && t.length > 2) freq[t] = (freq[t] || 0) + 1
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k]) => k)
}

export function analyzeResume(html: string, jobDesc: string): ScoreBreakdown {
    const text = htmlToText(html, { wordwrap: false })
    const lower = text.toLowerCase()

    // Section presence
    const sections = {
        summary: /(summary|profile)/.test(lower) ? 8 : 0,
        skills: /\bskills?\b/.test(lower) ? 12 : 0,
        experience: /experience|work history/.test(lower) ? 20 : 0,
        education: /education/.test(lower) ? 8 : 0,
        projects: /projects?/.test(lower) ? 8 : 0,
    }

    // Action verbs & metrics density
    const words = tokenize(text)
    const actionCount = words.filter(w => ACTION_VERBS.includes(w)).length
    const actionVerbRatio = Math.min(1, actionCount / Math.max(1, words.length / 80)) // ~1 verb per 80 words
    const metricsCount = (text.match(METRIC_REGEX) || []).length
    const metricsRatio = Math.min(1, metricsCount / Math.max(1, words.length / 120))

    // One-column heuristic (no tables, narrow lines)
    const oneColumnLikely = !/table|columns|\|\s.*\s\|/i.test(html)

    // Length target (words 450–900)
    const lengthOk = words.length >= 450 && words.length <= 900

    // JD-driven keywords
    const jdKeywordsRaw = extractKeywordsFromJD(jobDesc)
    const canonicalMap: Record<string, string> = {}
    for (const [canon, list] of Object.entries(ALIASES)) for (const a of list) canonicalMap[a] = canon
    const resumeTokens = new Set(words.map(w => canonicalMap[w] || w))
    const wanted = new Set(jdKeywordsRaw.map(w => canonicalMap[w] || w))
    const keywordsMatched: string[] = []
    const missingKeywords: string[] = []
    for (const k of wanted) (resumeTokens.has(k) ? keywordsMatched : missingKeywords).push(k)

    // Simple recency weight: favor mentions of years >= (currentYear-3)
    const yearMatches = Array.from(text.matchAll(/\b(20\d{2})\b/g)).map(m => parseInt(m[1], 10))
    const current = new Date().getFullYear()
    const recentMentions = yearMatches.filter(y => y >= current - 3).length
    const totalMentions = yearMatches.length || 1
    const recentWeight = Math.min(1, recentMentions / totalMentions)

    // Penalties
    const penalties: string[] = []
    if (!lengthOk) penalties.push('Resume length outside 1–2 pages')
    if (!oneColumnLikely) penalties.push('Multi-column/table layout can hurt ATS')
    if (actionVerbRatio < 0.4) penalties.push('Too few action verbs at bullet starts')
    if (metricsRatio < 0.3) penalties.push('Not enough metrics/impact numbers')

    // Scoring
    const base = Object.values(sections).reduce((a, b) => a + b, 0)
    const content = Math.round(30 * actionVerbRatio + 20 * metricsRatio)
    const jdScore = Math.min(20, Math.round(0.5 * keywordsMatched.length))
    const recency = Math.round(10 * recentWeight)
    let total = base + content + jdScore + recency
    if (penalties.length) total = Math.max(0, total - Math.min(15, penalties.length * 4))

    return {
        total: Math.min(100, total),
        sections,
        details: { keywordsMatched, missingKeywords, actionVerbRatio, metricsRatio, recentWeight, lengthOk, oneColumnLikely, penalties }
    }
}
