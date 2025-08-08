import React, { FC } from 'react';
import { Bold, Italic, List, Underline } from 'lucide-react';
import ToolbarButton from '../atoms/ToolbarButton';

const EditorToolbar: FC<{ editor: any }> = ({ editor }) => {
    if (!editor) return null;
    return (
        <div className="flex items-center gap-1 mb-3 border border-card-stroke rounded-lg p-1 bg-background">
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold"><Bold size={18} /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic"><Italic size={18} /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline"><Underline size={18} /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} disabled={!editor.can().chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bulleted List"><List size={18} /></ToolbarButton>
        </div>
    );
};

export default EditorToolbar;