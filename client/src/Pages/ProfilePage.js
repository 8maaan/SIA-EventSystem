import React, { useEffect } from 'react';
import { Typography, Avatar, Container, Box, Card, CardContent, Grid } from '@mui/material';
import { UserAuth } from "../Context-and-routes/AuthContext";

const ProfilePage = () => {
    const { user } = UserAuth();

    useEffect(() => {
        console.log(user ? user : 'Not logged in');
    }, [user]);

    return (
        <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="md">
                <Card>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar alt={user.name} src={user.photoUrl} sx={{ width: 150, height: 150 }} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" component="h1">
                                    {user.name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {user.email}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default ProfilePage;
