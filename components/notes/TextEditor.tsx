'use client';

import { useEditor, EditorContent } from '@tiptap/reac';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import { Button } from '../ui/button';
import { Toggle } from '../ui/toggle';
import { Bold, Italic, Code } from 'lucide-react';

export const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, CodeBlock],
    content: '<p>Write your note...</p>',
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md p-2 bg-white">
      <div className="flex gap-1 mb-2">
        <Toggle
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive('codeBlock')}
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="h-4 w-4" />
        </Toggle>
      </div>

      <EditorContent editor={editor} className="prose max-w-none min-h-[150px] outline-none" />
    </div>
  );
};
