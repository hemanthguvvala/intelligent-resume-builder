import React, { FC, useEffect, memo, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapUnderline from '@tiptap/extension-underline';
import { Trash2, UploadCloud } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import EditorToolbar from '../molecules/EditorToolbar';
import { parseResumeHtml } from '../../utils/resumeParser';

const EditorPanel: FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { resumeHtml, setResumeHtml, setStructuredResumeData } = useAppStore();

    const editor = useEditor({
        extensions: [StarterKit, TiptapUnderline],
        content: resumeHtml,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setResumeHtml(html);
            const parsedData = parseResumeHtml(html);
            setStructuredResumeData(parsedData);
        },
        editorProps: {
            attributes: {
                class: 'flex-grow p-4 bg-white border border-card-stroke rounded-lg outline-none focus:ring-2 focus:ring-primary overflow-y-auto prose max-w-none',
            },
        },
    });

    useEffect(() => {
        if (editor && !editor.isDestroyed && resumeHtml !== editor.getHTML()) {
            editor.commands.setContent(resumeHtml, false);
            const parsedData = parseResumeHtml(resumeHtml);
            setStructuredResumeData(parsedData);
        }
    }, [resumeHtml, editor, setStructuredResumeData]);

    const handleClear = () => editor?.commands.clearContent(true);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            alert(`File "${file.name}" has been processed. The content has been structured in the editor.`);
            const structuredContent = `
                <p><strong>John Doe (from ${file.name})</strong></p>
                <p>Senior Software Engineer | San Francisco, CA | 555-123-4567 | john.doe@email.com | linkedin.com/in/johndoe</p>
                <hr>
                <p><strong>Professional Summary</strong></p>
                <p>This is a sample summary extracted from your document, demonstrating how a real parser would structure the text.</p>
                <p><strong>Experience</strong></p>
                <ul>
                    <li><strong>Lead Developer | Example Corp | 2020 - Present</strong>
                        <ul>
                            <li>Simulated duty: Led a team to develop a new feature.</li>
                            <li>Simulated duty: Improved application performance by 25%.</li>
                        </ul>
                    </li>
                </ul>
                 <p><strong>Education</strong></p>
                <ul>
                    <li><strong>M.S. in Computer Science | Fictional University | 2020</strong></li>
                </ul>
                 <p><strong>Skills</strong></p>
                 <ul>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node.js</li>
                 </ul>
            `;
            setResumeHtml(structuredContent);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-foreground p-6 rounded-b-xl shadow-sm border border-t-0 border-card-stroke flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-medium text-text-secondary">Edit your resume content below. Changes will reflect in the preview tab.</p>
                <button onClick={handleClear} className="text-xs font-semibold text-text-secondary hover:text-red-600 flex items-center gap-1 transition-colors">
                    <Trash2 size={14} />Clear
                </button>
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
            <button
                onClick={handleUploadClick}
                className="w-full mb-4 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-card-stroke rounded-lg text-text-secondary hover:border-primary hover:text-primary transition-colors"
            >
                <UploadCloud size={20} />
                Upload .pdf or .doc file
            </button>

            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} className="flex-grow flex flex-col min-h-[400px]" />
        </div>
    );
};

export default memo(EditorPanel);