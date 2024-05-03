import { InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';


const ImageUploader = ({ eventImage, updateEventImage }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadedImgName, setUploadedImgName] = useState('');

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: process.env.REACT_APP_IMAGE_UPLOADER_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_IMAGE_UPLOADER_UPLOADPRESET
      },
      function (error, result) {
        if (!error && result && result.event === 'success') {
          console.log(result.info.secure_url);

          // Call the callback function to update eventImage in App.js
          updateEventImage(result.info.secure_url);
        }
        if (!error && result && result.event === 'queues-end') {
          const fileName = result.info.files[0].name;
          console.log('Uploaded File Name:', fileName);
          setUploadedImgName(fileName);
        }
      }
    );
  }, [updateEventImage]);

  return (
    <div>
      {/* <p className='attributeNames'></p> */}
      <TextField
        required 
        disabled 
        size="small" 
        label={eventImage ? uploadedImgName : "Upload Image"}
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