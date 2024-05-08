import React, { useEffect } from 'react';
import { Typography, Avatar, Container, Box } from '@mui/material';
import { UserAuth } from "../Context-and-routes/AuthContext";

const ProfilePage = () => {
    const { user } = UserAuth();

    useEffect(() => {
        console.log(user ? user : 'Not logged in');
    }, [user]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Avatar alt={user.name} src={user.photoUrl} sx={{ width: 100, height: 100, mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                    {user.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {user.email}
                </Typography>
            </Box>
        </Container>
    );
};

export default ProfilePage;
