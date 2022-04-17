import React, { useEffect, useState } from 'react'
import Footer from '../../component/User/Layout/Footer';
import AdminHome from './AdminHome';
import '../../component/Admin/design.css';
import { TextField, Avatar, makeStyles, Typography } from '@material-ui/core';
import CategoryIcon from '@mui/icons-material/Category';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


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


const CategoryEditing = () =>
{
  const classes = useStyle();
  const navigate = useNavigate()
  const { id } = useParams();
  console.log( id + "==> this is id." );
  const [ maincat, setmaincat ] = useState( '' );
  const [ maincatcheck, setmaincatcheck ] = useState( true );
  const [ data, setData ] = useState( { categoryname: '' } );
  const [ parentcat, setparentcat ] = useState();


  useEffect( () =>
  {
    setmaincatcheck( false );
    getCategoryById();
  }, [ maincat ] );

  useEffect( () =>
  {
    const admintoken = localStorage.getItem( "adminToken" );
    if ( !admintoken )
    {
      navigate( "/adminlogin" );
    }

  }, [] );

  const getCategoryById = async () =>
  {
    try
    {
      const url = "http://localhost:8714/api/admin/categoryname/" + id;
      const { data: res } = await axios.get( url );
      const createdmessage = res.message;

      const { Parent } = res.data;

      const maincatname = Parent.categoryname;
      setparentcat( maincatname );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }
    }
  };

  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    try
    {

      const url = "http://localhost:8714/api/admin/category/mainupdate/" + id;

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




  return (
    <>
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
                    <center><h2 className="title">Editing New Category</h2></center>
                    <Avatar style={ { backgroundColor: "rgb(204 166 221)", margin: "5px auto" } }><CategoryIcon /></Avatar>

                    { parentcat && ( <div className="input-group">
                      <TextField autoComplete="off" id="outlined-basic" onChange={ ( e ) => { handleChangename( e ) } } name='categoryname' label="Enter Category" defaultValue={ parentcat } variant="outlined" fullWidth />
                      { maincatcheck && <Typography className={ classes.error }>Please enter valid Category Name</Typography> }
                    </div> ) }

                    <div className="p-t-10">
                      <center> <button className="btn btn--pill btn--green" type="submit" onClick={ handleSubmit } >Edit Category</button></center>
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

export default CategoryEditing;



