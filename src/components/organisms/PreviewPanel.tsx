import { useRef } from 'react'
import html2pdf from 'html2pdf.js'
import { useAppStore } from '../../store/useAppStore'
import ModernTemplate from '../templates/ModernTemplate'
import ClassicTemplate from '../templates/ClassicTemplate'

export default function PreviewPanel() {
    const { selectedTemplate, structuredResumeData } = useAppStore()
    const ref = useRef<HTMLDivElement>(null)

    const exportPdf = () => {
        if (!ref.current) return
        const opt = { margin: 10, filename: 'resume.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: {}, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } }
        html2pdf().from(ref.current).set(opt as any).save()
    }

    const Template = selectedTemplate === 'Modern' ? ModernTemplate : ClassicTemplate

    return (
        <div className="p-4 space-y-3">
            <button className="px-3 py-2 rounded-xl border" onClick={exportPdf}>Export PDF</button>
            <div className="rounded-xl border p-6 bg-white" ref={ref}>
                <Template data={structuredResumeData} />
            </div>
        </div>
    )
}