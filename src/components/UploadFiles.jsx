import React from 'react';
import { FileUpload } from 'primereact/fileupload';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

const UploadFiles = ({ uploadUrl }) => {
  return (
    <div className="upload-files">
      <FileUpload
        name="file"
        url={uploadUrl || 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'}
        multiple
        mode="basic"
        chooseLabel="Upload Files"
        onUpload={(e) => {
          console.log('Uploaded files:', e.files);
        }}
        onError={(e) => {
          console.error('Upload error:', e);
        }}
      />
    </div>
  );
};

export default UploadFiles;
