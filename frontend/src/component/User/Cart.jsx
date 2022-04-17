import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import PrimarySearchAppBar from './Layout/NavBar.jsx';
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../../../src/responsive";
import Footer from './Layout/Footer';
import axios from 'axios';


import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


import { makeStyles } from '@material-ui/core/styles';

toast.configure();

const useStyles = makeStyles( ( theme ) => ( {
  error: {
    fontSize: 15,
    color: '#F907C0',
    lineHeight: 0,
    marginTop: 23,
    marginLeft: 50,
    fontWeight: 600
  },
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '8%',
    fontSize: "2rem",

  },
  link: {
    textDecoration: 'none',
    color: "#e311f1",
    fontSize: "20px"
  },
} ) );


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${ mobile( { padding: "10px" } ) }
`;

const Title = styled.h1`
  font-weight: 300;
  font-size:15px;
  text-align: center;
  margin-top:55px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  font-size:15px;
  cursor: pointer;
  border: ${ ( props ) => props.type === "filled" && "none" };
  background-color: #f24c57;
  border-radius: 15px;
  color: #f4f7f7;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const TopTexts = styled.div`
  ${ mobile( { display: "none" } ) }
`;
const TopText = styled.span`
  text-decoration: none;
  color:red;
  font-size:15px;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${ mobile( { flexDirection: "column" } ) }

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${ mobile( { flexDirection: "column" } ) }
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
min-width: max-content;

`;

const ProductId = styled.span``;



const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AddContainer = styled.div`
  width: 200;
  display: flex;
  align-items: center;
  flex-direction:"row";

  ${ mobile( { width: "100%", flexDirection: 'column' } ) }
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border-radius:16px;
  border: 1px solid #eb24c9;
  margin-top: 17px;
  margin-bottom: 14px;
  margin-left: 6px;
`;



const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  width: -webkit-fill-available;
  ${ mobile( { marginBottom: "20px" } ) }
`;

const Hr = styled.hr`
background-color: #3861d7;
border: none;
margin-top: 12px;
margin-bottom: 12px;
height: 2px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 31px;
  padding: 20px;
  height: 90vh;
  background: linear-gradient(45deg, #badde1, transparent);
}
`;

const SummaryTitle = styled.h1`
  font-weight: 100;
  font-size:30px;
  color: seagreen;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${ ( props ) => props.type === "total" && "500" };
  font-size: ${ ( props ) => props.type === "total" && "24px" };
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button1 = styled.button`
width: 100%;
padding: 10px;
background-color: #04cf42;
color: white;
font-weight: 600;
margin-left: 5px;
cursor:pointer;
`;
const Button2 = styled.button`
width: 29%;
    padding: 8px;
    background-color: #ffa735;
color: white;
font-weight: 600;
margin-left: 5px;
cursor:pointer;
`;


const Cart = () =>
{
  const [ cartdatas, setcartdatas ] = useState( [] );
  const [ count, setcount ] = useState( 0 );
  const [ subt, setsubt ] = useState( 0 )
  const [ Total, setTotal ] = useState( 0 );

  const [ couponcodeapply, setcouponcodeapply ] = useState( '' );
  const [ couponapply, setcouponapply ] = useState( false );
  const [ coupondata, setcoupondata ] = useState();
  const [ discountcoupon, setdiscountcoupon ] = useState( 0 )

  const [ purchaseerror, setpurchaseerror ] = useState( false );
  const [ error, seterror ] = useState( false );


  const [ walletapply, setwalletapply ] = useState( '' )
  const [ walletamountapplied, setwalletamountapplied ] = useState( false );
  const [ discountwallet, setdiscountwallet ] = useState( 0 )
  const [ walleterror, setwalleterror ] = useState( false );
  const [ userdata, setuserdata ] = useState()

  const [ userdatas, setuserdatas ] = useState();
  const navigate = useNavigate();
  const classes = useStyles();


  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }




  useEffect( () =>
  {

    const usertoken = localStorage.getItem( "usertoken" );

    if ( !usertoken )
      return navigate( "/login" );
    localStorage.removeItem( "code" );
    localStorage.removeItem( "amountwallet" );
    getcartdata();
    getuserdata();
    setpurchaseerror( false )
    couponchange();
    setdiscountcoupon( 0 );
    seterror( false );
    setcouponapply( false );
    setdiscountwallet( 0 )
    walletchange();
    setwalleterror( false );
    setwalletapply( false );

  }, [ count ] )
  useEffect( () =>
  {
    let totalamount = 0;
    getuserdata();
    cartdatas.forEach( cartdata =>
    {
      totalamount = totalamount + cartdata.proTotal;
    } );

    setsubt( totalamount );
    setTotal( totalamount - discountcoupon - discountwallet );

  }, [ cartdatas, discountcoupon, discountwallet ] )

  useEffect( () =>
  {
    couponchange();
  }, [ coupondata ] );

  useEffect( () =>
  {
    walletchange();
  }, [ userdata ] );

  const getuserdata = async () =>
  {
    try
    {

      const id = localStorage.getItem( "userId" )
      const url = "http://localhost:8714/api/users/getprofiledata/" + id;
      const { data: res } = await axios.get( url );
      const { userdata } = res.data;
      const message = res.messge;

      setuserdatas( userdata );
    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );
      }
    }

  }
  const getcartdata = async () =>
  {
    try
    {
      const id = localStorage.getItem( "userId" );
      const url = "http://localhost:8714/api/users/fetchcartdata/" + id;
      const { data: res } = await axios.get( url );
      const createdmessage = res.message;
      const { cartuser } = res.data;
      const number = cartuser.length;
      setcount( number );
      setcartdatas( cartuser );
      getuserdata();
    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );
      }
    }
  };

  const incrementQuntity = async ( proid, useid ) =>
  {
    try
    {
      const url = "http://localhost:8714/api/users/incrementQuantity";

      const { data: res } = await axios.post( url, { proid, useid } );

      const createdmessage = res.message;
      getcartdata();

    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );
      }

    }
  };

  const decrementQuntity = async ( proid, useid ) =>
  {
    try
    {
      const url = "http://localhost:8714/api/users/decrementQuantity";
      const { data: res } = await axios.post( url, { proid, useid } );
      const createdmessage = res.message;
      getcartdata();

    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );
      }

    }
  };
  const handleRemove = async ( proid, useid ) =>
  {
    try
    {
      const url = "http://localhost:8714/api/users/removecartitem";

      const { data: res } = await axios.post( url, { proid, useid } );

      const createdmessage = res.message;

      getcartdata();
    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }

    }
  };


  const handleCheckOut = () =>
  {
    if ( discountcoupon > 0 && coupondata && discountwallet == 0 )
    {
      pushuser( coupondata.code );
      const GrandTotal = ( Total + ( 40 * count ) );
      localStorage.setItem( "grandtotal", GrandTotal );
    }
    else if ( discountcoupon == 0 && discountwallet > 0 && userdata )
    {
      popwallet( discountwallet );
      const GrandTotal = ( Total + ( 40 * count ) );
      localStorage.setItem( "grandtotal", GrandTotal );
    }
    else if ( discountcoupon > 0 && coupondata && discountwallet > 0 && userdata )
    {
      pushuser( coupondata.code );
      popwallet( discountwallet );
      const GrandTotal = ( Total + ( 40 * count ) );
      localStorage.setItem( "grandtotal", GrandTotal );
    }
    else
    {
      const GrandTotal = ( Total + ( 40 * count ) - discountcoupon - discountwallet );
      localStorage.setItem( "grandtotal", GrandTotal );
    }

  };

  const applywallet = async ( amountwallet ) =>
  {
    try
    {
      const id = localStorage.getItem( "userId" );
      const url = "http://localhost:8714/api/users/applyamountwallet/" + id;
      const { data: res } = await axios.post( url, { amountwallet } );
      setwalletamountapplied( true );
      const createdmessage = res.message;
      setuserdata( res.data );
      localStorage.setItem( "amountwallet", amountwallet );
      getuserdata();

    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        setwalletamountapplied( false );
        const errornotify = notification2( error.response.data.message );

      }
    }

  };
  const walletchange = () =>
  {
    if ( userdata )
    {
      if ( Total >= walletapply )
      {

        const disc = Total - walletapply;
        const discountAmount = Math.round( disc );
        const newprice = discountAmount;
        setdiscountwallet( walletapply );
        getuserdata();
        setTotal( newprice );
      }
      else
      {

        setwalleterror( true );
        setTimeout( () =>
        {
          setwalleterror( false );
          setwalletapply( false );
        }, 2000 );
        const walleterrornotify = notification2( 'This Wallet Amount Greater Than  ' + Total );
      }

    }
  };

  const popwallet = async ( amount ) =>
  {
    try
    {

      const id = localStorage.getItem( "userId" );
      const url = "http://localhost:8714/api/users/walletpop/" + id;
      const { data: res } = await axios.post( url, { amount } );
      getuserdata();
      const createdmessage = res.message;
    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }
    } finally
    {
      console.log( "completed" )
    }
  };




  const applycoupon = async ( code ) =>
  {
    try
    {

      const id = localStorage.getItem( "userId" );
      const url = "http://localhost:8714/api/users/applycoupon/" + id;
      const { data: res } = await axios.post( url, { code, Total } );

      setcouponapply( true );
      const createdmessage = res.message;

      setcoupondata( res.data );
      localStorage.setItem( "code", code );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        setcouponapply( false );
        const errornotify = notification2( error.response.data.message );

      }
    }
  };

  const couponchange = () =>
  {

    if ( coupondata )
    {

      if ( Total >= coupondata.minpurchase )
      {

        const disc = Total * ( coupondata.discount ) * 0.1;
        const discountAmount = Math.round( disc );
        if ( discountAmount >= coupondata.minamount )
        {
          const newprice = Total - coupondata.minamount;
          setdiscountcoupon( coupondata.minamount );
          setTotal( newprice );
        } else
        {
          const newprice = Total - discountAmount;
          setdiscountcoupon( discountAmount );
          setTotal( newprice );
        }
      }
      else
      {

        seterror( true );
        setTimeout( () =>
        {
          seterror( false );
          setcouponapply( false );
        }, 2000 );
        const errornotify = notification2( 'This Coupon Valid Only For Minimum Purchase Of ' + coupondata.minpurchase );
      }

    }
  };

  const pushuser = async ( code ) =>
  {
    try
    {

      const id = localStorage.getItem( "userId" );
      const url = "http://localhost:8714/api/users/userpush/" + id;
      const { data: res } = await axios.post( url, { code } );

      const createdmessage = res.message;

    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );

      }
    }
  };


  return (



    ( ( count === 0 ) ? (
      <Container>
        <PrimarySearchAppBar />
        <div className={ classes.toolbar } />
        <center><Typography className={ classes.title } variant="h3" gutterBottom>Your Shopping Cart</Typography>
          <Typography variant="subtitle1">You have no items in your shopping cart,
            <Link className={ classes.link } to="/productlist">start adding some</Link>!
          </Typography></center>

      </Container>
    )
      :
      ( <Container>
        <PrimarySearchAppBar />
        <Wrapper>
          <Title>YOUR CART</Title>
          <Top>
            <Link to="/productlist"><TopButton >Continue Shopping</TopButton></Link>
            <TopTexts>
              <TopText>Total Items({ count })</TopText>

            </TopTexts>

          </Top>
          <Bottom >
            <Info>

              { cartdatas.map( ( cartdata ) => (
                <>
                  <Product>
                    <ProductDetail>
                      <Image src={ cartdata.imgCart } />
                      <Details>
                        <ProductName>
                          <b>ProductId:</b> { cartdata.productId }
                        </ProductName>

                        <ProductId>
                          <b>Shipping:</b>₹ 40
                        </ProductId>

                      </Details>
                    </ProductDetail>
                    <PriceDetail style={ { display: "flex", flexDirection: "row" } }>
                      <b>Qnty:</b>
                      <AddContainer>
                        <AmountContainer>
                          <Remove style={ { cursor: "pointer" } } onClick={ () => { decrementQuntity( cartdata.productId, cartdata.userId ) } } />
                          <Amount>{ cartdata.quantity }</Amount>
                          <Add style={ { cursor: "pointer" } } onClick={ () => { incrementQuntity( cartdata.productId, cartdata.userId ) } } />
                        </AmountContainer>
                      </AddContainer>
                    </PriceDetail>

                    <PriceDetail style={ { display: "flex", flexDirection: "row" } }>
                      <b>Total:</b><ProductPrice style={ { marginLeft: "10px" } }>₹  { cartdata.proTotal }</ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Button color="secondary" variant="contained" style={ { marginRight: 10, float: "right", marginTop: "-30px" } } onClick={ () => { handleRemove( cartdata.productId, cartdata.userId ) } } >remove</Button>
                  <Hr />

                </>
              ) ) }</Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>₹ { subt }</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Coupon Discount</SummaryItemText>
                <SummaryItemPrice>₹ { discountcoupon }</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Wallet Discount</SummaryItemText>
                <SummaryItemPrice>₹ { discountwallet }</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping</SummaryItemText>
                <SummaryItemPrice>₹ { 40 * count }</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>₹ { Total + ( 40 * count ) }</SummaryItemPrice>
              </SummaryItem>
              <Link to="/checkout">
                <Button1 onClick={ handleCheckOut } >CHECKOUT NOW</Button1>
              </Link>
              <div style={ { marginTop: "8px" } }>
                { !couponapply ? ( <div style={ { display: 'flex' } }>
                  <TextField autoComplete="off" onChange={ ( e ) => { setcouponcodeapply( e.target.value ) } } id="outlined-basic" variant="outlined" name='coupon' label='Enter Valid Coupon' fullWidth />
                  <Button2 style={ { marginTop: "2px" } } onClick={ () => { applycoupon( couponcodeapply ) } }>  Apply  </Button2>
                </div> ) :
                  (
                    <div style={ { display: 'flex' } }>
                      { !error ? ( <Typography className={ classes.error }> Coupon Applied ! </Typography> ) : ( <Typography className={ classes.error }> Coupon Not Applied ! </Typography> ) }
                    </div> )
                }
                <div style={ { marginTop: "8px" } }>
                  { !walletamountapplied ? ( <div style={ { display: 'flex' } }>
                    <TextField autoComplete="off" onChange={ ( e ) => { setwalletapply( e.target.value ) } } id="outlined-basic" variant="outlined" name='wallet' label='Enter Wallet Amount' fullWidth />
                    <Button2 style={ { marginTop: "2px" } } onClick={ () => { applywallet( walletapply ) } }>  Apply Amount </Button2>
                  </div> ) : ( <div style={ { display: 'flex' } }>
                    { !walleterror ? ( <Typography className={ classes.error }> Wallet Applied ! </Typography> ) : ( <Typography className={ classes.error }> Wallet Not Applied ! </Typography> ) }
                  </div> ) }
                  { ( userdatas && !walletamountapplied ) && ( <Grid item xs={ 4 } style={ { display: 'flex', justifyContent: 'space-between', marginTop: "9px" } }>
                    <TextField id="outlined-basic" disabled defaultValue={ userdatas.wallet } name="wallet" label="Wallet!" autoComplete="off" variant="outlined" />
                  </Grid> ) }
                </div>
              </div>
            </Summary>

          </Bottom>
        </Wrapper>
        <Footer />
      </Container> )
    )
  );
};

export default Cart;
