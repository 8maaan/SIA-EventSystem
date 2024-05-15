import { Typography } from '@mui/material';
import React from 'react';
import '../PagesCSS/PageNotFound.css'
import WildCatsLogo from '../Images/wild-cats-pnf.png'

const PageNotFound = () => {
    return ( 
        <div className='pgnfBody'>
            <img src={WildCatsLogo} height='280px' width='280px' style={{marginTop:'3%'}} alt='logo'/>
            <Typography sx={{
                mt: 5.5,
                fontWeight: '600',
                fontSize: '1.7rem',
                color: 'maroon'
            }}>
                ERROR 404: Page not Found
            </Typography>
        </div>
     );
}
 
export default PageNotFound;