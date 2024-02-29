import { Box } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: any;
  onChange: (nVal: any) => void;
  height?: string | number;
}

function QuillEditor(props: QuillEditorProps) {
  const { value, onChange, height = 200 } = props;

  const [content, setConTent] = useState<string>('');

  useEffect(() => {
    if (value) {
      if (!_.isEqual(value, content)) {
        setConTent(value);
      }
    } else {
      setConTent('');
    }
  }, [value]);

  const handleOnChange = (nVal: string) => {
    setConTent(nVal);
    onChange && onChange(nVal);
  };

  return (
    <Box sx={{ '& .ql-container': { height: 'calc(100% - 42px)' } }}>
      <ReactQuill theme="snow" value={content} onChange={handleOnChange} style={{ height }} />
    </Box>
  );
}

export default QuillEditor;
