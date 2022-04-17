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
import Loding from '../../component/Loding'
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

const ProductEditing = () =>
{
  const navigate = useNavigate();

  const classes = useStyle();
  const dummyimage = "https://www.lifewire.com/thmb/2KYEaloqH6P4xz3c9Ot2GlPLuds=/1920x1080/smart/filters:no_upscale()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg";
  const [ namechange, setnamechange ] = useState();
  const [ categories, setcategories ] = useState( [] );
  const [ subcategories, setsubcategories ] = useState( [] );
  const [ SelectedSubCategorys, setSelectedSubCategorys ] = useState();
  const [ aftersubcategory, setaftersubcategory ] = useState();

  const [ price, setprice ] = useState( '' );
  const [ pricecheck, setpricecheck ] = useState( true );

  const [ pro, setpro ] = useState( '' );
  const [ prnacheck, setprnacheck ] = useState( true );

  const [ des, setdes ] = useState( '' );
  const [ descheck, setdescheck ] = useState( true );

  const [ stoc, setstoc ] = useState( '' );
  const [ stockcheck, setstockcheck ] = useState( true );

  const [ display, setdisplay ] = useState( false );
  const [ loading, setLoading ] = useState( false );


  const [ imgOne, setimgOne ] = useState( {} );
  const [ imgTwo, setimgTwo ] = useState( {} );
  const [ imgThree, setimgThree ] = useState( {} );
  const [ imgFour, setimgFour ] = useState( {} );
  const [ imgFive, setimgFive ] = useState( {} );

  const inputImageOne = useRef();
  const inputImageTwo = useRef();
  const inputImageThree = useRef();
  const inputImageFour = useRef();
  const inputImageFive = useRef();

  const { id } = useParams();



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
    setstockcheck( false );
  }, [ stoc ] );

  useEffect( () =>
  {
    setpricecheck( false );
  }, [ price ] );

  useEffect( () =>
  {


    const selectedCategorys = subcategories.filter( item => item.parentCatId === namechange );

    setSelectedSubCategorys( selectedCategorys );
    setdisplay( true );
  }, [ namechange ] );


  // toast notification
  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }



  const getCatData = ( async () =>
  {
    try
    {

      const url = "http://localhost:8714/api/admin/fetchcategorydata";
      const { data: res } = await axios.get( url );

      const createdmessage = res.message;
      const { mainCategory, subCategory } = res.data;
      setcategories( mainCategory );
      setsubcategories( subCategory );

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
  const handlevalidationstock = ( e ) =>
  {

    let value = e.target.value;
    if ( value === '' )
    {
      setstockcheck( true );

    }
    else if ( value.length < 0 )
    {
      setstockcheck( true );

    }
    else if ( value === " " )
    {
      setstockcheck( true );

    } else if ( isNaN( value ) )
    {
      setstockcheck( true );

    } else
    {
      setstoc( { ...stoc, value } );
      setstockcheck( false );


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
        price,
        des,
        namechange,
        aftersubcategory,
        stoc,

      }


      const formData = new FormData();
      formData.append( "img", imgOne.file );
      formData.append( "img", imgTwo.file );
      formData.append( "img", imgThree.file );
      formData.append( "img", imgFour.file );
      formData.append( "img", imgFive.file );
      formData.append( "data", JSON.stringify( data ) );

      const url = "http://localhost:8714/api/admin/editproductdata/" + id;
      const { data: res } = await axios.post( url, formData, { headers: { "Content-Type": "multipart/form-data", }, } );


      const createdmessage = res.message;
      setLoading( false );
      const notify = notification( createdmessage );
      navigate( "/productmanagment" );


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

  const inputImageTrigger = ( target ) =>
  {
    target.current.click();
  };

  const selectimgOne = ( e ) =>
  {
    if ( e.target.files.length > 0 )
    {
      const file = e.target.files[ 0 ];
      const url = URL.createObjectURL( file );
      setimgOne( { file, url } );
    }
  };
  const selectimgTwo = ( e ) =>
  {
    if ( e.target.files.length > 0 )
    {
      const file = e.target.files[ 0 ];
      const url = URL.createObjectURL( file );
      setimgTwo( { file, url } );
    }
  };
  const selectimgThree = ( e ) =>
  {
    if ( e.target.files.length > 0 )
    {
      const file = e.target.files[ 0 ];
      const url = URL.createObjectURL( file );
      setimgThree( { file, url } );
    }
  };
  const selectimgFour = ( e ) =>
  {
    if ( e.target.files.length > 0 )
    {
      const file = e.target.files[ 0 ];
      const url = URL.createObjectURL( file );
      setimgFour( { file, url } );
    }
  };
  const selectimgFive = ( e ) =>
  {
    if ( e.target.files.length > 0 )
    {
      const file = e.target.files[ 0 ];
      const url = URL.createObjectURL( file );
      setimgFive( { file, url } );
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

                    <center><h2 className="title">Edit Product</h2></center>
                    <Avatar style={ { backgroundColor: "rgb(204 166 221)", margin: "5px auto" } }><AddShoppingCartIcon /></Avatar>

                    <div className="input-group">
                      <TextField autoComplete="off" id="outlined-basic" name='productname' onChange={ ( e ) => { handlevalidationpro( e ); } } label="Enter Product Name" variant="outlined" fullWidth />
                      { prnacheck && <Typography className={ classes.error }>Please enter valid product Name !</Typography> }
                    </div>

                    <div className="input-group">
                      <TextField autoComplete="off" id="outlined-basic" name='price' label="Enter Product Price" onChange={ ( e ) => { handlevalidationprice( e ); } } variant="outlined" fullWidth />
                      { pricecheck && <Typography className={ classes.error }>Please enter valid price !</Typography> }
                    </div>

                    <div className="input-group">
                      <TextField autoComplete="off" id="outlined-multiline-static" name='description' onChange={ ( e ) => { handlevalidationdescription( e ); } } label="Enter Product description" variant="outlined" multiline rows={ 4 } fullWidth />
                      { descheck && <Typography className={ classes.error }>Please enter valid Description !</Typography> }
                    </div>

                    <div className="input-group">

                      <TextField id="outlined-select-currency" select name='category' label="Enter Product Category" variant="outlined" fullWidth onChange={ ( e ) => { handleChangeMain( e ) } } >{ categories.map( ( option, index ) => ( <MenuItem key={ index } value={ option._id }>{ option.categoryname }</MenuItem > ) ) }</TextField>
                    </div>
                    { display && ( <div className="input-group">

                      <TextField id="outlined-select-currency" select name='subcategory' label="Enter Product Sub-Category 1" variant="outlined" fullWidth onChange={ ( e ) => { setaftersubcategory( e.target.value ) } }  >{ SelectedSubCategorys.map( ( option ) => ( <MenuItem key={ option._id } value={ option.subcategoryname }>{ option.subcategoryname }</MenuItem > ) ) }</TextField>
                    </div> ) }
                    <div className="input-group">
                      <TextField autoComplete="off" id="outlined-basic" name='stock' label="Enter Product Price Stock" onChange={ ( e ) => { handlevalidationstock( e ); } } variant="outlined" fullWidth />
                      { stockcheck && <Typography className={ classes.error }>Please enter valid product Stock !</Typography> }
                    </div>
                    <div className="input-group">
                      <img onClick={ () => { inputImageTrigger( inputImageOne ) } } style={ { height: "100px" } } src={ imgOne.url || dummyimage } alt="uploadImage" />
                      <input hidden ref={ inputImageOne } type='file' name='fileOne' onChange={ selectimgOne }></input>
                    </div>

                    <div className="input-group">
                      <img onClick={ () => { inputImageTrigger( inputImageTwo ) } } style={ { height: "100px" } } src={ imgTwo.url || dummyimage } alt="uploadImage" />
                      <input hidden ref={ inputImageTwo } type='file' name='fileTwo' onChange={ selectimgTwo }></input>
                    </div>
                    <div className="input-group">
                      <img onClick={ () => { inputImageTrigger( inputImageThree ) } } style={ { height: "100px" } } src={ imgThree.url || dummyimage } alt="uploadImage" />
                      <input hidden ref={ inputImageThree } type='file' name='fileThree' onChange={ selectimgThree }></input>
                    </div>
                    <div className="input-group">
                      <img onClick={ () => { inputImageTrigger( inputImageFour ) } } style={ { height: "100px" } } src={ imgFour.url || dummyimage } alt="uploadImage" />
                      <input hidden ref={ inputImageFour } type='file' name='fileFour' onChange={ selectimgFour }></input>
                    </div>
                    <div className="input-group">
                      <img onClick={ () => { inputImageTrigger( inputImageFive ) } } style={ { height: "100px" } } src={ imgFive.url || dummyimage } alt="uploadImage" />
                      <input hidden ref={ inputImageFive } type='file' name='fileFive' onChange={ selectimgFive }></input>
                    </div>
                    <div className="p-t-10">
                      <center> <button className="btn btn--pill btn--green" type="submit" onClick={ handleSubmitdata }>Edit Product</button></center>
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

export default ProductEditing;