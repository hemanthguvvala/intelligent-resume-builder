import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { analyzeResume } from '../../hooks/useResumeAnalysis'

export default function AnalysisPanel() {
    const { resumeHtml, jobDescription } = useAppStore()
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const run = async () => {
        setLoading(true)
        try {
            const r = analyzeResume(resumeHtml, jobDescription)
            setResult(r)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 space-y-4">
            <button className="px-3 py-2 rounded-xl border" onClick={run} disabled={loading}>
                {loading ? 'Analyzing…' : 'Run ATS Analysis'}
            </button>

            {result && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">ATS Score: {result.total}/100</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-xl border p-3">
                            <h4 className="font-medium mb-2">Sections</h4>
                            <ul className="list-disc ml-5">
                                {Object.entries(result.sections).map(([k, v]) => (
                                    <li key={k}><strong>{k}</strong>: +{v}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-xl border p-3">
                            <h4 className="font-medium mb-2">Signals</h4>
                            <ul className="list-disc ml-5">
                                <li>Action verb ratio: {(result.details.actionVerbRatio * 100).toFixed(0)}%</li>
                                <li>Metrics ratio: {(result.details.metricsRatio * 100).toFixed(0)}%</li>
                                <li>Recency weight: {(result.details.recentWeight * 100).toFixed(0)}%</li>
                                <li>Length OK: {result.details.lengthOk ? 'Yes' : 'No'}</li>
                                <li>One column likely: {result.details.oneColumnLikely ? 'Yes' : 'No'}</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border p-3">
                            <h4 className="font-medium mb-2">Matched Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.details.keywordsMatched.map((k: string) => (
                                    <span key={k} className="text-sm border px-2 py-1 rounded-full">{k}</span>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl border p-3">
                            <h4 className="font-medium mb-2">Missing Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.details.missingKeywords.map((k: string) => (
                                    <span key={k} className="text-sm border px-2 py-1 rounded-full bg-yellow-50">{k}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {result.details.penalties.length > 0 && (
                        <div className="rounded-xl border p-3">
                            <h4 className="font-medium mb-2">Penalties</h4>
                            <ul className="list-disc ml-5">
                                {result.details.penalties.map((p: string, i: number) => (<li key={i}>{p}</li>))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}