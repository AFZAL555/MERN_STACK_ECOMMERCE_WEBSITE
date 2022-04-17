import React, { Fragment, useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import PrimarySearchAppBar from '../../component/User/Layout/NavBar';
import { Box, Button, Container, CssBaseline, Paper, Typography } from '@material-ui/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Paypal from '../../component/User/Paypal';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";



toast.configure();
const theme = createTheme();

const loadScript = ( src ) =>
{
  return new Promise( ( resolve ) =>
  {
    const script = document.createElement( "script" );
    script.src = src;
    document.body.appendChild( script );
    script.onload = () =>
    {
      resolve( true );
    };
    script.onerror = () =>
    {
      resolve( false );
    };
    document.body.appendChild( script );
  } );
};


const Payment = () =>
{

  const theme1 = useTheme();

  const navigate = useNavigate();

  useEffect( () =>
  {
    const userid = localStorage.getItem( 'userId' )
    const iid = localStorage.getItem( 'aii' );
    const GrandTotal = localStorage.getItem( 'grandtotal' )
    if ( iid && GrandTotal )
    {
      navigate( '/payment' );
    } else
    {
      navigate( '/' )
    }

  }, [] )


  const userid = localStorage.getItem( 'userId' )
  const iid = localStorage.getItem( 'aii' );
  const GrandTotal = localStorage.getItem( 'grandtotal' )

  const [ paymentoption, setpaymentoption ] = useState();
  const [ open, setOpen ] = useState( false );
  const fullScreen = useMediaQuery( theme1.breakpoints.down( "md" ) );






  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }


  const displayPaypal = () =>
  {
    handleClickOpen();

  };
  const handleClickOpen = () =>
  {
    setOpen( true );
  };
  const handleClose = () =>
  {
    setOpen( false );
  };
  const initPayment = async ( data ) =>
  {
    console.log( data )
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if ( !res )
    {
      alert(
        "Razorpay SDK is failed to load.Please check your internet connection"
      );
      return;
    }
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: async ( response ) =>
      {
        try
        {

          const orderid = response.razorpay_order_id;
          const paymentid = response.razorpay_payment_id;
          const signature = response.razorpay_signature;
          const verifyUrl = "http://localhost:8714/api/users/verifyrazorpay";
          const { data: res } = await axios.post( verifyUrl, { response, userid, iid, GrandTotal, paymentoption } );
          const createdmessage = res.message;
          const notify = notification( createdmessage );
          navigate( '/Successorder' );
          localStorage.removeItem( 'aii' );
          localStorage.removeItem( 'grandtotal' );

        } catch ( error )
        {
          console.log( error );
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay( options );
    rzp1.open();
  };



  const handleplaceorder = async () =>
  {
    if ( paymentoption === 'COD' )
    {
      try
      {
        const data = {
          userid,
          iid,
          GrandTotal,
          paymentoption,
        }
        const url = "http://localhost:8714/api/users/neworder";
        const { data: res } = await axios.post( url, data );
        const createdmessage = res.message;
        localStorage.removeItem( 'aii' );
        localStorage.removeItem( 'grandtotal' )
        const notify = notification( createdmessage );
        navigate( '/Successorder' );

      } catch ( error )
      {
        if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
        {
          const errornotify = notification2( error.response.data.message );

        }
      } finally
      {
        console.log( "Order Placing completed" )
      }

    }
    else if ( paymentoption === 'razorpay' )
    {
      try
      {
        const data = {
          userid,
          iid,
          GrandTotal,
          paymentoption,
        }
        console.table( data );
        const url = "http://localhost:8714/api/users/neworderrazorpay";
        const { data: res } = await axios.post( url, data );
        console.table( res.data );
        initPayment( res.data );

      } catch ( error )
      {
        if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
        {
          const errornotify = notification2( error.response.data.message );
        }
      } finally
      {
        console.log( "Order Placing completed" )
      }


    }
    else
    {
      try
      {
        const data = {
          userid,
          iid,
          GrandTotal,
          paymentoption,
        }
        console.table( data );
        displayPaypal();

      } catch ( error )
      {
        if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
        {
          const errornotify = notification2( error.response.data.message );
        }
      } finally
      {
        console.log( "Order Placing completed" )
      }
    }
  };


  return (
    <>
      <>
        <Dialog
          fullScreen={ fullScreen }
          open={ open }
          onClose={ handleClose }
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{ "............BRO-CART............." }</DialogTitle>
          <DialogContent>
            <Paypal fullScreen GrandTotal={ GrandTotal } />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={ handleClose }>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>

      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <PrimarySearchAppBar />
        <Container component="main" maxWidth="sm" sx={ { mb: 4 } }>
          <Paper variant="outlined" sx={ { my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } } } style={ { marginTop: "134px", border: "1px solid navy", padding: "inherit" } }>

            <Fragment >
              <Fragment >

                <Fragment>
                  <Typography color="secondary" variant="h5" gutterBottom sx={ { mt: 2 } }>
                    Payment Method
                  </Typography>
                  <Grid container spacing={ 3 }>
                    <Grid item xs={ 12 } md={ 6 }>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"

                        >
                          <FormControlLabel onChange={ ( e ) => { setpaymentoption( e.target.value ) } } value="COD" control={ <Radio /> } label="Cash on delivery (COD) " />
                          <FormControlLabel onChange={ ( e ) => { setpaymentoption( e.target.value ) } } value="razorpay" control={ <Radio /> } label="RazorPay " />
                          <FormControlLabel onChange={ ( e ) => { setpaymentoption( e.target.value ) } } value="paypal" control={ <Radio /> } label="PayPal " />
                        </RadioGroup>
                      </FormControl>

                    </Grid>
                  </Grid>
                </Fragment>

              </Fragment>
            </Fragment>
            <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
              { paymentoption && (

                <Button onClick={ handleplaceorder } variant="contained" sx={ { mt: 3, ml: 1 } } style={ { backgroundColor: "#228b22", marginBottom: "3px", marginRight: "1px", color: 'white' } }>Place Order</Button>

              ) }
            </Box>

          </Paper>

        </Container>
      </ThemeProvider>


    </>
  )
}

export default Payment