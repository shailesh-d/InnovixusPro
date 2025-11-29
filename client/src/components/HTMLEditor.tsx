import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface HTMLEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function HTMLEditor({ value, onChange, placeholder = "Enter content..." }: HTMLEditorProps) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'script',
    'blockquote', 'code-block',
    'link',
  ];

  return (
    <div className="bg-white dark:bg-slate-950 rounded-md border border-input overflow-hidden">
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="min-h-64 dark:text-white [&_.ql-container]:dark:bg-slate-950 [&_.ql-editor]:dark:text-white [&_.ql-toolbar]:dark:bg-slate-900 [&_.ql-toolbar]:dark:border-slate-700 [&_.ql-container]:dark:border-slate-700"
      />
    </div>
  );
}
