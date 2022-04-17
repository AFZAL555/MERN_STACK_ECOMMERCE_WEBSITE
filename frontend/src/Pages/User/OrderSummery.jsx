import React, { Fragment, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from '../../component/User/Layout/NavBar';
import { Box, Button, Container, CssBaseline, Paper, Typography } from '@material-ui/core';
import Review from './Review';
import { Link, useNavigate } from 'react-router-dom';


const theme = createTheme();

const OrderSummery = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const iid = localStorage.getItem('aii');
    const usertoken = localStorage.getItem("usertoken");
    if(!usertoken||!iid){
        navigate("/");
    }
    
  }, [])





  const iid = localStorage.getItem('aii');




  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PrimarySearchAppBar />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ marginTop: "134px", border: "1px solid navy", padding: "inherit" }}>

            <Fragment >
              <Fragment >

                <Review iid={iid} />

              </Fragment>
            </Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to='/checkout' style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mt: 3 }} style={{ backgroundColor: "	rgb(107 28 108)", marginBottom: "3px", marginRight: "1px", color: 'white' }}>Back</Button>
              </Link>
              <Link to="/payment" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mt: 3, ml: 1 }} style={{ backgroundColor: "	#ff4500", marginBottom: "3px", marginRight: "1px", color: 'white' }}>Next</Button>
              </Link>

            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default OrderSummery