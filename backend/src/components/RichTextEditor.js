import React from 'react';
import Editor from 'react-simple-wysiwyg';

const RichTextEditor = ({ value, onChange, placeholder = "Start writing..." }) => {
  return (
    <div className="rich-text-editor">
      <Editor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        containerProps={{
          style: {
            border: '1px solid #e1e5e9',
            borderRadius: '8px',
            minHeight: '300px'
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;
