import { InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const ImageUploader = ({ eventImage, handleTxtFieldChange, errorTxt, isEdit, reset }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadedImgName, setUploadedImgName] = useState('');

  useEffect(() => {
    if (reset) {
        setUploadedImgName('');
    }
}, [reset]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: process.env.REACT_APP_IMAGE_UPLOADER_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_IMAGE_UPLOADER_UPLOADPRESET
      },
      function (error, result) {
        if (!error && result && result.event === 'success') {
          console.log(result.info.secure_url);

          // Instead of calling updateEventImage directly, call handleTxtFieldChange
          handleTxtFieldChange(result.info.secure_url, 'eventImage');
        }
        if (!error && result && result.event === 'queues-end') {
          const fileName = result.info.files[0].name;
          console.log('Uploaded File Name:', fileName);
          setUploadedImgName(fileName);
        }
      }
    );
  }, [handleTxtFieldChange]);

  return (
    <div>
      <TextField
        value={isEdit ? eventImage : uploadedImgName}
        fullWidth
        required 
        disabled
        label={"Upload Image"}
        error={errorTxt}
        helperText={errorTxt ? 'Please upload image for event cover' : ''}
        InputLabelProps={{ shrink: eventImage ? true : false }}
        InputProps={{ endAdornment: ( 
        <InputAdornment 
          position="end" 
          onClick={() => widgetRef.current.open()} 
          style={{ cursor: 'pointer' }}> 
            <FileUploadOutlinedIcon/>
        </InputAdornment>),}}
      />
    </div>
  );
};

export default ImageUploader;
