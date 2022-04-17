import { Add, Remove, ShoppingCart as Cart } from "@material-ui/icons";
import PrimarySearchAppBar from "../../component/User/Layout/NavBar.jsx";
import Footer from "../../component/User/Layout/Footer";
import styled from "styled-components";
import { mobile } from "../../responsive.js";
import axios from "axios";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Box from "@material-ui/core/Box";

toast.configure();

const useStyle = makeStyles( {
  error: {
    fontSize: 15,
    color: "#ff4500",
    lineHeight: 0,
    marginTop: 10,
    fontWeight: 500,
    marginBottom: "12px",
  },
  error1: {
    color: "#f90808",
    fontSize: "27px",
    marginTop: "67px",
    fontWeight: "600",
    lineHeight: "2",
    marginLeft: "12px",
    marginBottom: "16px",
  },
} );

const Container = styled.div`
  margin-top: 60px;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${ mobile( { padding: "10px", flexDirection: "column" } ) }
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  ${ mobile( { height: "40vh" } ) }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${ mobile( { padding: "10px" } ) }
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 90;
  font-size: 35px;
`;
const Price2 = styled.span`
  font-weight: 50;
  font-size: 22px;
  text-decoration: line-through;
`;
const AddContainer = styled.div`
  width: 200;
  display: flex;
  align-items: center;
  flex-direction: "row";

  ${ mobile( { width: "100%", flexDirection: "column" } ) }
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border-radius: 16px;
  border: 1px solid #eb24c9;
  margin-top: 29px;
  margin-bottom: 14px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  width: 150px;
  border-radius: 2;
  height: 70px;
  margin-right: 10px;
  ${ mobile( { width: 180, fontSize: "15px", height: 70, color: "#FFF" } ) }
`;
const Button1 = styled.button`
  width: 150px;
  border-radius: 2;
  height: 70px;
  margin-left: "5px";
  ${ mobile( {
  width: 180,
  fontSize: "15px",
  height: 70,
  marginTop: "3px",
  color: "#FFF",
} ) }
`;

const Box1 = styled.div`
  min-width: 200;
  padding: "40px 0 0 80px";
  display: "flex";
  justify-content: "space-between";

  ${ mobile( { display: "flex", marginTop: "5px", flexDirection: "column" } ) }
`;
const OneProduct = () =>
{
  const classes = useStyle();
  const useriid = localStorage.getItem( "userId" );
  const [ value, setValue ] = useState( 0 );
  const [ Oneproduct, setOneproduct ] = useState();
  const [ reviewonoff, setreviewonoff ] = useState();
  const [ number, setnumber ] = useState();
  const [ offero, setoffero ] = useState();
  const [ offernameo, setoffernameo ] = useState();
  const [ discountrate, setdiscountrate ] = useState();
  const [ dispriceo, setdispriceo ] = useState( 0 );
  const [ quntity, setquntity ] = useState( 1 );
  const [ stockvalue, setstockvalue ] = useState();

  const [ MainImage, setMainImage ] = useState();
  const [ SubImage1, setSubImage1 ] = useState();
  const [ SubImage2, setSubImage2 ] = useState();
  const [ SubImage3, setSubImage3 ] = useState();
  const [ SubImage4, setSubImage4 ] = useState();

  const Swapping1 = () =>
  {
    setMainImage( SubImage1 );
    setSubImage1( MainImage );
  };

  const Swapping2 = () =>
  {
    setMainImage( SubImage2 );
    setSubImage2( MainImage );
  };

  const Swapping3 = () =>
  {
    setMainImage( SubImage3 );
    setSubImage3( MainImage );
  };

  const Swapping4 = () =>
  {
    setMainImage( SubImage4 );
    setSubImage4( MainImage );
  };

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect( () =>
  {
    const usertoken = localStorage.getItem( "usertoken" );
    if ( !usertoken )
    {
      navigate( "/login" );
    }
    OneProductData();
  }, [] );

  const notification = ( m ) =>
  {
    toast.success( " " + m, {
      theme: "dark",
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    } );
  };
  const notification2 = ( m ) =>
  {
    toast.warning( " " + m, {
      theme: "dark",
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    } );
  };

  const OneProductData = async () =>
  {
    try
    {
      const url = "http://localhost:8714/api/users/productone/" + id;
      const { data: res } = await axios.get( url );

      const createdmessage = res.message;

      const { product } = res.data;
      setOneproduct( product );

      setoffero( product.offer );
      setdiscountrate( product.discount );
      setoffernameo( product.offername );
      setdispriceo( product.disprice );
      setMainImage( product.imgFive[ 0 ].url );
      setSubImage1( product.imgOne[ 0 ].url );
      setSubImage2( product.imgTwo[ 0 ].url );
      setSubImage3( product.imgThree[ 0 ].url );
      setSubImage4( product.imgFour[ 0 ].url );
      setstockvalue( product.stock );
      setnumber( product.lengthofrating );
      // getarray(product);
      const array = product.rating;
      array.map( ( ra ) =>
      {
        if ( ra.userId === useriid )
        {
          setreviewonoff( false );
        }
      } );
    } catch ( error )
    {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      )
      {
        const errornotify = notification2( error.response.data.message );
      }
    } finally
    {
      //   setLoading(false);
      console.log( "Product Data Gotit!..." );
    }
  };

  const incrementQuntity = () =>
  {
    if ( stockvalue > quntity )
    {
      setquntity( quntity + 1 );
    } else
    {
      setquntity( stockvalue );
    }
  };

  const decrementQuntity = () =>
  {
    if ( quntity > 1 )
    {
      setquntity( quntity - 1 );
    } else
    {
      setquntity( 1 );
    }
  };

  const mainhandleaddtocart = async () =>
  {
    try
    {
      if ( useriid )
      {
        const Oneprice = Oneproduct.price;
        const PROTotal = quntity * Oneprice;
        const productdata = { useriid, quntity, PROTotal, Oneprice };
        const url = "http://localhost:8714/api/users/addtocart/" + id;
        const { data: res } = await axios.post( url, productdata );
        const createdmessage = res.message;
        const notify = notification( createdmessage );
      } else
      {
        navigate( "/login" );
      }
    } catch ( error )
    {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      )
      {
        const errornotify = notification2( error.response.data.message );
      }
    } finally
    {
      //   setLoading(false);
      console.log( "Product Data Gotit!..." );
    }
  };

  useEffect( () =>
  {
    if ( value != 0 )
    {
      ratingupdating();
    }
  }, [ value ] );

  const ratingupdating = async () =>
  {
    try
    {
      const url = "http://localhost:8714/api/users/addrating";
      const { data: res } = await axios.post( url, { useriid, value, id } );

      const notify = notification( res.message );
    } catch ( error )
    {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      )
      {
        const errornotify = notification2( error.response.data.message );
      }
    } finally
    {
      console.log( "Rating adding processs done!." );
    }
  };

  return (
    <Container>
      <PrimarySearchAppBar />
      { Oneproduct ? (
        <>
          <Wrapper>
            <ImgContainer>
              <Image src={ MainImage } />
              <div
                className="small-img-group"
                style={ { display: "flex", justifyContent: "space-between" } }
              >
                <div
                  className="small-img-col"
                  style={ { flexBasis: "24%", cursor: "pointer" } }
                >
                  <img
                    src={ SubImage1 }
                    alt="pro1"
                    width={ "98%" }
                    onClick={ Swapping1 }
                    style={ { cursor: "pointer" } }
                    className="small-img"
                  />
                </div>
                <div
                  className="small-img-col"
                  style={ { flexBasis: "24%", cursor: "pointer" } }
                >
                  <img
                    src={ SubImage2 }
                    onClick={ Swapping2 }
                    style={ { cursor: "pointer" } }
                    alt="pro1"
                    width={ "98%" }
                    className="small-img"
                  />
                </div>
                <div
                  className="small-img-col"
                  style={ { flexBasis: "24%", cursor: "pointer" } }
                >
                  <img
                    src={ SubImage3 }
                    onClick={ Swapping3 }
                    style={ { cursor: "pointer" } }
                    alt="pro1"
                    width={ "98%" }
                    className="small-img"
                  />
                </div>
                <div
                  className="small-img-col"
                  style={ { flexBasis: "24%", cursor: "pointer" } }
                >
                  <img
                    src={ SubImage4 }
                    onClick={ Swapping4 }
                    style={ { cursor: "pointer" } }
                    alt="pro1"
                    width={ "100%" }
                    className="small-img"
                  />
                </div>
              </div>
            </ImgContainer>
            <InfoContainer>
              <Title style={ { marginBottom: "5px" } }>
                { Oneproduct.productname }
              </Title>
              <div style={ { display: "flex" } }></div>{ " " }
              { offero === true && offernameo && discountrate && (
                <Desc style={ { fontSize: "19px", color: "green" } }>
                  { offernameo }({ discountrate }%)
                </Desc>
              ) }
              <Desc>{ Oneproduct.description }</Desc>
              <Price style={ { color: "	#ff1493" } }>₹ { Oneproduct.price }</Price>
              { offero === true && (
                <Price2 style={ { marginLeft: "18px", color: "	rgb(13 26 122)" } }>
                  ₹ { dispriceo }
                </Price2>
              ) }
              { stockvalue > 0 ? (
                <>
                  <AddContainer>
                    <AmountContainer>
                      <Remove
                        style={ { cursor: "pointer" } }
                        onClick={ decrementQuntity }
                      />
                      <Amount>{ quntity }</Amount>
                      <Add
                        style={ { cursor: "pointer" } }
                        onClick={ incrementQuntity }
                      />
                    </AmountContainer>
                  </AddContainer>
                  { stockvalue === quntity && (
                    <Typography className={ classes.error }>
                      Only { Oneproduct.stock } Products Available !
                    </Typography>
                  ) }
                  <Box1
                    style={ {
                      display: "flex",
                      marginTop: "5px",
                      flexDirection: "column",
                    } }
                  >
                    <Button
                      style={ {
                        background: "rgb(42 2 120)",
                        color: "#FFF",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginBottom: "25px",
                      } }
                      variant="contained"
                      onClick={ mainhandleaddtocart }
                    >
                      <Cart />
                      Add to Cart
                    </Button>
                  </Box1>
                </>
              ) : (
                <>
                  <Typography className={ classes.error1 }>
                    Out Of Stock!
                  </Typography>
                </>
              ) }
            </InfoContainer>
          </Wrapper>
          <Footer />
        </>
      ) : (
        <>
          <Wrapper>
            <InfoContainer></InfoContainer>
          </Wrapper>
        </>
      ) }
    </Container>
  );
};
export default OneProduct;
