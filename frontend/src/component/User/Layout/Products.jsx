import React, { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

toast.configure();


const Container1 = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 390px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    border:"1px solid #494949";
  
    &:hover ${ Info }{
      opacity: 1;
    }
  `;

const Typography = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    margin-top: 20px;
  `;

const Image = styled.img`
    height: 75%;
    z-index: 2;
    margin-bottom:3px;
  `;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;


const Products = () =>
{
  const [ popularProducts, setpopularProducts ] = useState( [] );
  const useriid = localStorage.getItem( "userId" );

  useEffect( () =>
  {

    getsetpopularProducts();

  }, [] )

  const navigate = useNavigate();
  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }

  const getsetpopularProducts = async () =>
  {
    try
    {

      const url = "http://localhost:8714/api/users/fectchfeaturedpro";
      const { data: res } = await axios.get( url );

      const createdmessage = res.message;

      const { product } = res.data;
      setpopularProducts( product );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }
    } finally
    {
      console.log( "Product Listed" )
    }
  };
  const mainhandleaddtocart = async ( id, Oneprice ) =>
  {
    try
    {
      if ( useriid )
      {

        const quntity = 1;
        const PROTotal = quntity * Oneprice;

        const productdata = { useriid, quntity, PROTotal, Oneprice };
        const url = "http://localhost:8714/api/users/addtocart/" + id;
        const { data: res } = await axios.post( url, productdata );

        const createdmessage = res.message;

        const notify = notification( createdmessage );

      } else
      {
        navigate( '/login' );
      }

    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }
    } finally
    {

      console.log( "Product Data Gotit!..." )
    }
  };
  return (
    <Container1>
      { popularProducts.map( ( item ) => (
        <Container>
          <Image src={ item.imgFive[ 0 ].url } />
          <h5 style={ { color: "navy", marginTop: '6px' } }>{ item.productname }</h5>
          <h3 style={ { color: "Green", marginTop: '6px' } }>₹ { item.price }</h3>
          <Info>

            <Icon>
              <ShoppingCartOutlined onClick={ () => { mainhandleaddtocart( item._id, item.price ) } } />
            </Icon>


          </Info>

        </Container>
      ) ) }
    </Container1>
  );
};

export default Products;