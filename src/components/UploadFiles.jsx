import React, { useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useTranslation } from 'react-i18next';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

const UploadFiles = ({ onFileChange, partName }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { t } = useTranslation();

  return (
    <div className="upload-files">
      <FileUpload
        name={partName}
        customUpload
        auto={false}
        chooseLabel={t("upload_file")}
        maxFileSize={10 * 1024 * 1024}
        mode="basic" 
        onSelect={(e) => {
          const file = e.files[0];
          setSelectedFile(file);
          onFileChange(file);
        }}
        onClear={() => {
          setSelectedFile(null);
          onFileChange(null);
        }}
      />
    </div>
  );
};

export default UploadFiles;
