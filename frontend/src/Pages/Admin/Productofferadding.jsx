import React, { useEffect, useState, useRef } from 'react';
import Footer from '../../component/User/Layout/Footer';
import AdminHome from './AdminHome';
import '../../component/Admin/design.css';
import { TextField, Avatar, Typography, makeStyles } from '@material-ui/core';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Loding from '../../component/Loding'



toast.configure();
const useStyle = makeStyles( {
  error: {
    fontSize: 12,
    color: '#ff0000',
    lineHeight: 0,
    marginTop: 10,
    fontWeight: 600
  }
} )
const Productofferadding = () =>
{
  const classes = useStyle();

  const [ namechange, setnamechange ] = useState();
  const [ categories, setcategories ] = useState( [] );



  const [ price, setprice ] = useState();
  const [ pricecheck, setpricecheck ] = useState( true );

  const [ pro, setpro ] = useState( '' );
  const [ prnacheck, setprnacheck ] = useState( true );

  const [ des, setdes ] = useState( '' );
  const [ descheck, setdescheck ] = useState( true );


  const [ display, setdisplay ] = useState( false );
  const [ loading, setLoading ] = useState( false );



  useEffect( () =>
  {
    const admintoken = localStorage.getItem( "adminToken" );
    if ( !admintoken )
    {
      navigate( "/adminlogin" );
    }
    getCatData();
    setdisplay( false );

  }, [] );


  useEffect( () =>
  {
    setprnacheck( false );
  }, [ pro ] );


  useEffect( () =>
  {
    setdescheck( false );
  }, [ des ] );



  useEffect( () =>
  {
    setpricecheck( false );
  }, [ price ] );


  const navigate = useNavigate();

  // toast notification
  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }



  const getCatData = ( async () =>
  {
    try
    {

      const url = "http://localhost:8714/api/admin/fetchproductsdata1";
      const { data: res } = await axios.get( url );

      const createdmessage = res.message;

      setcategories( res.data );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        console.log( error.response.data.message );
      }
    }
  } );

  const handleChangeMain = ( e ) =>
  {
    setdisplay( true );

    const id = e.target.value;
    setnamechange( id );

  }


  const handlevalidationprice = ( e ) =>
  {

    let value = e.target.value;
    if ( value === '' )
    {
      setpricecheck( true );

    }
    else if ( value.length < 0 )
    {
      setpricecheck( true );

    }
    else if ( value === " " )
    {
      setpricecheck( true );

    } else if ( isNaN( value ) )
    {
      setpricecheck( true );

    } else
    {
      setprice( { ...price, value } );
      setpricecheck( false );

    }

  }

  const handlevalidationpro = ( e ) =>
  {
    const value = e.target.value;

    if ( value === '' )
    {
      setprnacheck( true )
    } else if ( value.length < 1 )
    {
      setprnacheck( true )
    }
    else
    {
      setpro( { ...pro, value } );
      setprnacheck( false );

    }
  }
  const handlevalidationdescription = ( e ) =>
  {
    const value = e.target.value;

    if ( value === '' )
    {
      setdescheck( true )
    } else if ( value.length < 5 )
    {
      setdescheck( true )
    } else
    {
      setdes( { ...des, value } );
      setdescheck( false );

    }
  };
  const handleSubmitdata = async ( e ) =>
  {
    e.preventDefault();
    try
    {

      setLoading( true );
      const data = {
        pro,
        des,
        price,
        namechange,
      }

      const url = "http://localhost:8714/api/admin/addproductoffer";
      const { data: res } = await axios.post( url, data );
      const createdmessage = res.message;
      setLoading( false );
      const notify = notification( createdmessage );
      navigate( "/Productoffer" );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }
    }
    finally
    {
      setLoading( false );
    }
  };



  if ( loading )
  {
    return (
      <>
        <Loding />
      </>
    )
  }


  return (
    <div>
      <section >
        <div className='row' id="rowseen">
          <div className='col-lg-5 col-md-12 col-12' style={ { minWidth: "24%" } }>
            <AdminHome />
          </div>
          <div className='col-lg-5 col-md-12 col-12' style={ { background: "navy", marginTop: "-560px", width: "92%", marginLeft: '152px' } }>
            <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins" style={ { paddingTop: "36px" } }>
              <div className="wrapper wrapper--w780">
                <div className="card card-3">

                  <div className="card-heading"></div>
                  <div className="card-body">

                    <center><h2 className="title">Adding New Product Offer</h2></center>
                    <Avatar style={ { backgroundColor: "rgb(204 166 221)", margin: "5px auto" } }><AddShoppingCartIcon /></Avatar>

                    <div className="input-group">
                      <TextField autoComplete="off" id="outlined-basic" name='Offer Name' onChange={ ( e ) => { handlevalidationpro( e ); } } label="Enter Offer Name" variant="outlined" fullWidth />
                      { prnacheck && <Typography className={ classes.error }>Please enter valid Offer Name !</Typography> }
                    </div>

                    <div className="input-group">

                      <TextField id="outlined-select-currency" select name='productId' label="Select Product" variant="outlined" fullWidth onChange={ ( e ) => { handleChangeMain( e ) } } >{ categories.map( ( option, index ) => ( <MenuItem key={ index } value={ option._id }>{ option.productname }</MenuItem > ) ) }</TextField>
                    </div>

                    <div className="input-group">
                      <TextField autoComplete="off" id="outlined-basic" name='discount' label="Enter Offer Discount %" onChange={ ( e ) => { handlevalidationprice( e ); } } variant="outlined" fullWidth />
                      { pricecheck && <Typography className={ classes.error }>Please enter valid discount % !</Typography> }
                    </div>

                    <div className="input-group">
                      <TextField autoComplete="off" id="outlined-multiline-static" name='description' onChange={ ( e ) => { handlevalidationdescription( e ); } } label="Enter Offer description" variant="outlined" multiline rows={ 4 } fullWidth />
                      { descheck && <Typography className={ classes.error }>Please enter valid Description !</Typography> }
                    </div>



                    <div className="p-t-10">
                      <center> <button className="btn btn--pill btn--green" type="submit" onClick={ handleSubmitdata }>Add Offer</button></center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      <Footer />
    </div >
  )
}


export default Productofferadding