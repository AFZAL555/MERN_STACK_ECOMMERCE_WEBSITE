import React, { useEffect, useState } from 'react'
import Footer from '../../component/User/Layout/Footer';
import AdminHome from './AdminHome';
import '../../component/Admin/design.css';
import { TextField, Avatar, makeStyles, Typography } from '@material-ui/core';
// import MenuItem from '@mui/material/MenuItem';
import CategoryIcon from '@mui/icons-material/Category';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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


const CategoryAdding = () =>
{
  const classes = useStyle();

  const navigate = useNavigate();

  const [ maincat, setmaincat ] = useState( '' );
  const [ subcat, setsubcat ] = useState( '' );


  const [ maincatcheck, setmaincatcheck ] = useState( true );
  const [ subcatcheck, setsubcatcheck ] = useState( true );


  const [ data, setData ] = useState( {
    categoryname: "",
    subcategoryname: "",
  } );

  useEffect( () =>
  {
    setmaincatcheck( false );
    setsubcatcheck( false );


  }, [ maincat, subcat ] );

  useEffect( () =>
  {
    const admintoken = localStorage.getItem( "adminToken" );
    if ( !admintoken )
    {
      navigate( "/adminlogin" );
    }

  }, [] );

  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    try
    {

      const url = "http://localhost:8714/api/admin/category/create";
      const { data: res } = await axios.post( url, data );
      const createdmessage = res.message;
      const notify = notification( createdmessage );
      navigate( "/categorymanagment" );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );


      }
    }
  };



  const handleChangename = ( e ) =>
  {
    const value = e.target.value;

    const re = /^[A-Za-z ]+$/
    if ( value === '' )
    {
      setmaincatcheck( true )
    } else if ( !re.test( value ) )
    {
      setmaincatcheck( true )
    } else if ( value.length > 15 )
    {
      setmaincatcheck( true )
    }
    else if ( value === " " )
    {
      setmaincatcheck( true )
    } else
    {
      setmaincat( { ...maincat, value } );
      setmaincatcheck( false );
      setData( { ...data, [ e.target.name ]: value } );
    }
  }



  const handleChangesub = ( e ) =>
  {
    const value = e.target.value;

    const re = /^[A-Za-z ]+$/
    if ( value === '' )
    {
      setsubcatcheck( true )
    } else if ( !re.test( value ) )
    {
      setsubcatcheck( true )
    } else if ( value.length > 15 )
    {
      setsubcatcheck( true )
    }
    else if ( value === " " )
    {
      setsubcatcheck( true )
    } else
    {
      setsubcat( { ...subcat, value } );
      setsubcatcheck( false );
      setData( { ...data, [ e.target.name ]: value } );
    }
  }


  return (
    <>
      <section >
        <div className='row'>
          <div className='col-lg-5 col-md-12 col-12' style={ { minWidth: "24%" } }>
            <AdminHome />
          </div>
          <div className='col-lg-5 col-md-12 col-12' style={ { background: "navy", marginTop: "-560px", width: "92%", marginLeft: '152px' } }>
            <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins" style={ { paddingTop: "36px" } }>
              <div className="wrapper wrapper--w780">
                <div className="card card-3">
                  <div className="card-heading"></div>
                  <div className="card-body">
                    <center><h2 className="title">Adding New Category</h2></center>
                    <Avatar style={ { backgroundColor: "rgb(204 166 221)", margin: "5px auto" } }><CategoryIcon /></Avatar>

                    <div className="input-group">
                      <TextField autoComplete="off" id="outlined-basic" onChange={ ( e ) => { handleChangename( e ) } } name='categoryname' label="Enter Category Name" variant="outlined" fullWidth />
                      { maincatcheck && <Typography className={ classes.error }>Please enter valid Category Name</Typography> }
                    </div>

                    <div className="input-group">
                      <TextField autoComplete="off" id="outlined-basic" onChange={ ( e ) => { handleChangesub( e ) } } name='subcategoryname' label="Enter Sub-Category" variant="outlined" fullWidth />
                      { subcatcheck && <Typography className={ classes.error }>Please enter valid Sub-Category Name</Typography> }
                    </div>

                    <div className="p-t-10">
                      <center> <button className="btn btn--pill btn--green" type="submit" onClick={ handleSubmit } >Add Category</button></center>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      <Footer />
    </>
  )
}

export default CategoryAdding;



