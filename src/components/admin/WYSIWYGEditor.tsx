import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface WYSIWYGEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ value, onChange, height = 500 }) => {
  return (
    <Editor
      apiKey="your-tinymce-api-key" // You'll need to get this from TinyMCE
      value={value}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }'
      }}
      onEditorChange={onChange}
    />
  );
};

export default WYSIWYGEditor;