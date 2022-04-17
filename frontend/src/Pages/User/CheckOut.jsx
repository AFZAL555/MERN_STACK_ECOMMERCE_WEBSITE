import React, { Fragment, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from '../../component/User/Layout/NavBar';
import { Box, Button, Container, CssBaseline, Paper, Typography } from '@material-ui/core';

import AddressForm from './AddressForm';
import { Link, useNavigate } from 'react-router-dom';


const theme = createTheme();

const CheckOut = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const usertoken = localStorage.getItem("usertoken");
        if(!usertoken){
            navigate("/");
        }

    }, [])
    


    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <PrimarySearchAppBar />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ marginTop: "134px", border: "1px solid navy",padding: "inherit" }}>
                        <Typography component="h1" variant="h4" align="center" style={{ color: "red" }}>
                            Shipping Address
                        </Typography>
                        <Fragment >
                            <Fragment >
                                <AddressForm />
                            </Fragment>
                        </Fragment>
                        
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default CheckOut