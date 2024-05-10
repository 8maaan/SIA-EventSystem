import React, { useEffect } from 'react';
import { Typography, Avatar, Container, Card, CardContent, Grid, Button, makeStyles } from '@mui/material';
import { UserAuth } from "../Context-and-routes/AuthContext";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    card: {
        maxWidth: 400,
        padding: theme.spacing(2),
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: theme.spacing(1),
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: 'auto',
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const ProfilePage = () => {
    const classes = useStyles();
    const { user } = UserAuth();
    const history = useHistory();

    const handleUpdateAccount = () => {
        // Redirect to Microsoft update account page
        window.location.href = 'https://account.microsoft.com/profile/';
    };

    useEffect(() => {
        console.log(user ? user : 'Not logged in');
    }, [user]);

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <Avatar alt={user.name} src={user.photoUrl} className={classes.avatar} />
                <Typography variant="h5" component="h1" gutterBottom>
                    {user.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {user.email}
                </Typography>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleUpdateAccount}>
                    Update Account
                </Button>
            </Card>
        </Container>
    );
};

export default ProfilePage;
