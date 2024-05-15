import React from 'react'
import '../PagesCSS/OrganizerApplicant.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const OrganizerApplicants = () => {
   //   TEMP DESIGN ONLY
  return (
    <div className='oa-body'>
        <div className='table-container'>
            <Typography variant='h4' sx={{mb: 5, mt: 6, color:'maroon'}}>Manage Organizer Applications</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id Number</TableCell>
                            <TableCell align="center">Full Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* TBA, SAMPLE ONLY*/}
                        <TableCell align="center">12-1234-123</TableCell>
                        <TableCell align="center">John Doe The Great</TableCell>
                        <TableCell align="center">John Doe@gmail.com</TableCell>
                        <TableCell align="center">
                            <IconButton variant='contained' sx={{mr: 0.5, color:'maroon'}}><DeleteIcon fontSize='large'/></IconButton>
                            <IconButton variant='contained' sx={{ml: 0.5, color: 'green'}}><CheckIcon fontSize='large'/></IconButton>
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default OrganizerApplicants