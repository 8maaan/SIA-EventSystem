import React from "react";
import { Typography, Button, IconButton, Avatar, Icon } from "@mui/material";
import { ClassNames } from "@emotion/react";
import editIcon from "../image/edit.png"
import "../PagesCSS/EditButton.css"

const EditableInfoContainer = ({title, content, onEdit}) =>{

    const handleEditClick = () =>{

        console.log("Edit Unavailable")
    }

    return (
       <div ClassName="editable-info">
        <Typography variant="h7" className="title">{title}</Typography>
        <Typography variant="h7" className="content">{content}</Typography>
        <button style={{marginLeft: 450}} onClick={handleEditClick}>
           <img src={editIcon} style={{width: "15px", height: "15px"}} alt="Edit"  />
        </button>
      </div>
    );
};



export default EditableInfoContainer;