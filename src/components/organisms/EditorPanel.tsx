import React, { FC, memo, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Trash2, UploadCloud, Loader2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import EditorToolbar from '../molecules/EditorToolbar';
import * as pdfjsLib from 'pdfjs-dist';

// --- THIS IS THE CRUCIAL FIX ---
// Tell pdf.js where to find its worker file from the npm package
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


declare const mammoth: any;

const EditorPanel: FC = () => {
    const { resumeHtml, set, isLoading } = useAppStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: resumeHtml,
        onUpdate: ({ editor }) => set({ resumeHtml: editor.getHTML() })
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        set({ isLoading: true, error: undefined });
        let htmlOutput = '';

        try {
            if (file.type === 'application/pdf') {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    fullText += textContent.items.map((s: any) => s.str).join(' ') + '\n';
                }
                htmlOutput = fullText.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');
                editor?.commands.setContent(htmlOutput, true);

            } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // .docx
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                htmlOutput = result.value;
                editor?.commands.setContent(htmlOutput, true);
            } else {
                set({ error: "Unsupported file type. Please upload a PDF or DOCX." });
            }
        } catch (error: any) {
            set({ error: "Failed to process file." });
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    };

    return (
        <div className="bg-foreground p-6 rounded-b-xl shadow-sm border border-t-0 border-card-stroke flex flex-col">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.docx" />

            <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-medium text-text-secondary">Upload your resume to automatically parse it, or edit manually.</p>
                <button onClick={() => editor?.commands.clearContent(true)} className="text-xs font-semibold text-text-secondary hover:text-red-600 flex items-center gap-1 transition-colors">
                    <Trash2 size={14} />Clear
                </button>
            </div>

            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="w-full mb-4 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-card-stroke rounded-lg text-text-secondary hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : <UploadCloud size={20} />}
                {isLoading ? 'Processing...' : 'Upload PDF or DOCX'}
            </button>

            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default memo(EditorPanel);