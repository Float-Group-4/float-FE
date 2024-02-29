import { useTheme } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface ImageUploadProps {
  value: any;
  onChange: (nVal: any) => void;
}

const ImageUpload = (props: ImageUploadProps) => {
  const { value, onChange } = props;
  const theme = useTheme();

  const [files, setFiles] = useState<any[]>([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/*': [],
      'text/html': ['.html', '.htm'],
    },
    onDrop: (files) => {
      setFiles(files);
      onChange && onChange(files);
    },
    multiple: false,
  });

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    ':hover': {
      borderColor: theme.palette.primary.main,
    },
  };

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <>
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>
          {files.map((file: any) => (
            <li key={file.path}>
              {file.path} - {file.size} bytes
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default ImageUpload;
