import React, { Fragment, useState, useEffect } from 'react'
import Footer from '../../component/User/Layout/Footer.jsx'
import PrimarySearchAppBar from '../../component/User/Layout/NavBar.jsx';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Input, makeStyles, Slider, TextField, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';


toast.configure();

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius:5px;
  margin-top: 79px;
  width: 20%;
  margin-left: 75%;
  margin-bottom: 0px;
`;

const useStyles = makeStyles( {
  root: {
    marginTop: 20,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginBottom: "1rem",
    padding: "13px",
  },
  filters: {
    padding: "0 1.5rem",
  },
  priceRangeInputs: {
    display: "flex",
    marginBottom: "5px",
    flexDirection: 'column',
    justifyContent: "space-between",
  },
} );


const ProductList = () =>
{
  const [ Products, setProducts ] = useState( [] );
  const [ serach, setserach ] = useState( '' );
  const [ sliderMax, setSliderMax ] = useState( 145000 );
  const [ priceRange, setPriceRange ] = useState( [ 500, 5000 ] );
  const [ minfilter, setminFilter ] = useState();
  const [ maxfilter, setmaxFilter ] = useState();
  const navigate = useNavigate();
  const classes = useStyles();
  useEffect( () =>
  {
    const usertoken = localStorage.getItem( "usertoken" );
    if ( !usertoken )
    {
      navigate( "/login" );
    }
    getProductData();
  }, [] );

  useEffect( () =>
  {

    console.log( serach );
    if ( serach != '' )
    {
      searchproduct();
    }
    else
    {
      getProductData();
    }
  }, [ serach ] );


  useEffect( () =>
  {
    console.log( maxfilter );
    console.log( minfilter );
    if ( minfilter && maxfilter )
    {
      slidefilterproduct();
    }
  }, [ minfilter, maxfilter ] );



  const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }



  const getProductData = async () =>
  {
    try
    {

      const url = "http://localhost:8714/api/users/fetchproductsdata";
      const { data: res } = await axios.get( url );

      const createdmessage = res.message;

      setProducts( res.data );

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

  const searchproduct = async () =>
  {
    try
    {
      const id = serach;
      const url = "http://localhost:8714/api/users/searchproductsdata/" + id;
      const { data: res } = await axios.get( url );
      const createdmessage = res.message;
      const { products } = res.data;
      setProducts( products );


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


  const slidefilterproduct = async () =>
  {
    try
    {
      const data = {
        minfilter,
        maxfilter,
      };
      const url = "http://localhost:8714/api/users/slidefilterproductsdata";
      const { data: res } = await axios.post( url, data );
      const createdmessage = res.message;
      const { products } = res.data;
      setProducts( products );

    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );
      }
    } finally
    {
      console.log( "Product Listed by slide filter" )
    }
  };



  const onSliderCommitHandler = ( e, newValue ) =>
  {
    buildRangeFilter( newValue );
  };
  const buildRangeFilter = ( newValue ) =>
  {
    setminFilter( newValue[ 0 ] );
    setmaxFilter( newValue[ 1 ] );

  };




  return (
    <Fragment>
      <PrimarySearchAppBar />
      <SearchContainer>
        <Input onChange={ ( e ) => { const value = e.target.value; setserach( value ) } } placeholder="Search" style={ { color: " rgb(118 99 2)", width: "92%" } } type='search' />
        <div >
          <Search style={ { color: " rgb(245 0 87)", fontSize: "16px", height: "29px", width: "26px" } } />
        </div>
      </SearchContainer>
      <section className='sproduct' style={ { marginTop: "20px" } }>
        <div className='row' >
          <div className='col-lg-5 col-md-12 col-12' style={ { width: "19%", marginRight: "11px" } }>
            <Typography gutterBottom style={ { marginLeft: "8px", marginTop: "12px" } }>Filters</Typography>

            <div className={ classes.filters } style={ { marginLeft: "8px", marginTop: "12px" } }>
              <Slider
                min={ 500 }
                max={ sliderMax }
                value={ priceRange }
                valueLabelDisplay="auto"
                onChange={ ( e, newValue ) => setPriceRange( newValue ) }
                onChangeCommitted={ onSliderCommitHandler }
              />

              <div className={ classes.priceRangeInputs } style={ { marginLeft: "0", marginTop: "2px" } }>
                <TextField
                  style={ { marginBottom: "19px" } }
                  size="small"
                  id="lower"
                  label="Min Price"
                  variant="outlined"
                  type="number"
                  value={ priceRange[ 0 ] }
                />

                <TextField
                  size="small"
                  style={ { marginBottom: "19px" } }
                  id="upper"
                  label="Max Price"
                  variant="outlined"
                  type="number"
                  value={ priceRange[ 1 ] }

                />
              </div>
            </div>





          </div>



          <div className='col-lg-5 col-md-12 col-12' style={ { maxWidth: "80%" } }>
            <section id="featured" className='my-5 py-5 ' style={ { marginTop: "40px" } }>
              <div className="container text-center  mt-6 py-6">
                <h3 style={ { fontWeight: "500", color: "red", marginTop: "3px" } }>Products</h3>
                <hr style={ { width: "90px", height: "3px", background: "#fb774b", marginTop: "3px", marginBottom: "3px" } } />
                <p style={ { marginTop: "3px" } }>Here, You Can Buy Any of Them..</p>
              </div>
              { Products.length != 0 ? ( <div className="row max-auto container" style={ { marginTop: "60px", marginBottom: "13px" } }>
                { Products.map( ( product, index ) => (
                  <div className="product col-lg-3 col-md-4 col-12 " style={ { marginBottom: "2rem", border: "1px solid black", height: "347px", marginRight: "24px" } }>
                    <img className='img-fluid mb-3' src={ product.imgFive[ 0 ].url } alt='product image' style={ { transition: "0.3s all", width: "207px", maxWidth: "fit-content" } } />
                    <h5 className='p-name ' style={ { marginTop: "8px", marginLeft: "3px", maxWidth: "fit-content" } }> { product.productname }</h5>
                    <h4 className='p-price' style={ { marginTop: "12px", marginLeft: "9px" } }>₹ { product.price }</h4>
                    <Link to={ `/oneproduct/${ product._id }` } style={ { textDecoration: "none", cursor: "pointer" } }><button className='buy-btn' style={ { marginTop: "8px", marginLeft: "41px", background: "#fb774b", height: "43px", width: "104px", borderRadius: "6px", cursor: "pointer" } }>View</button></Link>
                  </div>
                ) ) }

              </div> )
                :
                ( <div style={ { marginTop: "60px", marginBottom: "13px" } }>
                  <div style={ { marginBottom: "2rem", height: "347px", marginRight: "0", marginLeft: '228px' } }>
                    <h5>No Products Available.....</h5>
                  </div>


                </div> ) }
            </section>
          </div>
        </div>
      </section >
      <div > <Footer /></div>
    </Fragment >
  )
}

export default ProductList
