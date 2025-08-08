import { useState, useCallback, useEffect } from 'react';

export const useEditorState = (editorRef: React.RefObject<HTMLDivElement>) => {
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isList, setIsList] = useState(false);

    const updateToolbarState = useCallback(() => {
        if (!document.getSelection() || document.getSelection()?.rangeCount === 0) return;

        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));

        let node = document.getSelection()?.getRangeAt(0).startContainer;
        while (node) {
            if (node.nodeName === 'UL' || node.nodeName === 'OL') {
                setIsList(true);
                return;
            }
            if ((node as HTMLElement).id === 'resume-editor') break;
            node = node.parentNode;
        }
        setIsList(false);
    }, []);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const handleSelectionChange = () => {
            requestAnimationFrame(updateToolbarState);
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        editor.addEventListener('keyup', handleSelectionChange);
        editor.addEventListener('click', handleSelectionChange);


        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
            editor.removeEventListener('keyup', handleSelectionChange);
            editor.removeEventListener('click', handleSelectionChange);
        };
    }, [editorRef, updateToolbarState]);

    return { isBold, isItalic, isUnderline, isList };
};