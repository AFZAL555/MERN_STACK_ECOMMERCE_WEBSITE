import React, { useEffect, useState } from 'react'
import { Avatar, Button, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import { Fingerprint } from '@material-ui/icons';





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

const Address = () =>
{

  const classes = useStyle();

  const [ editordata, seteditordata ] = useState( false );
  const [ addresss, setaddresss ] = useState();

  const [ mob, setmob ] = useState( '' );
  const [ Mobcheck, setMobcheck ] = useState( true );

  const [ fn, setfn ] = useState( '' );
  const [ fncheck, setfncheck ] = useState( true );

  const [ ln, setln ] = useState( '' );
  const [ lncheck, setlncheck ] = useState( true );

  const [ addr1, setaddr1 ] = useState( '' );
  const [ addr1check, setaddr1check ] = useState( true );

  const [ addr2, setaddr2 ] = useState( '' );
  const [ addr2check, setaddr2check ] = useState( true );

  const [ city, setcity ] = useState( '' );
  const [ citycheck, setcitycheck ] = useState( true );

  const [ pin, setpin ] = useState( '' );
  const [ pincheck, setpincheck ] = useState( true );

  const [ data, setData ] = useState( {

    userId: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    mobilenumber: "",
    city: "",
    pincode: "",
  } );

  useEffect( () =>
  {
    getuseraddressdata();
    seteditordata( false );
  }, [] );



  useEffect( () =>
  {
    setMobcheck( false );
  }, [ mob ] );

  useEffect( () =>
  {
    setfncheck( false );
  }, [ fn ] );

  useEffect( () =>
  {
    setlncheck( false );
  }, [ ln ] );

  useEffect( () =>
  {
    setpincheck( false );
  }, [ pin ] );

  useEffect( () =>
  {
    setcitycheck( false );
  }, [ city ] );

  useEffect( () =>
  {
    setaddr1check( false );
  }, [ addr1 ] );

  useEffect( () =>
  {
    setaddr2check( false );
  }, [ addr2 ] );



  // toast notification
  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }


  const getuseraddressdata = async () =>
  {
    try
    {

      const id = localStorage.getItem( "userId" )
      const url = "http://localhost:8714/api/users/getaddressdata/" + id;
      const { data: res } = await axios.get( url );
      const { useraddressget } = res.data;
      const message = res.messge;
      setaddresss( useraddressget );
      setData( { ...data, userId: id } );
    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );
      }

    } finally
    {
      console.log( "final  method over........!" );
    }

  };

  const handlevalidationaddress1 = ( e ) =>
  {
    let value = e.target.value;
    if ( value === '' )
    {
      addr1check( true );

    } else if ( value === " " )
    {
      addr1check( true );

    } else
    {
      setaddr1( { ...addr1, value } );
      setaddr1check( false );
      setData( { ...data, [ e.target.name ]: value } );

    }
  }
  const handlevalidationaddress2 = ( e ) =>
  {
    let value = e.target.value;
    if ( value === '' )
    {
      addr2check( true );

    } else if ( value === " " )
    {
      addr2check( true );

    } else
    {
      setaddr2( { ...addr2, value } );
      setaddr2check( false );
      setData( { ...data, [ e.target.name ]: value } );

    }
  }

  const handlevalidationmob = ( e ) =>
  {

    let value = e.target.value;
    if ( value === '' )
    {
      setMobcheck( true );

    }
    else if ( value.length > 10 )
    {
      setMobcheck( true );

    }
    else if ( value.length < 10 )
    {
      setMobcheck( true );

    }
    else if ( value === " " )
    {
      setMobcheck( true );

    } else if ( isNaN( value ) )
    {
      setMobcheck( true );

    } else
    {
      setmob( { ...mob, value } );
      setMobcheck( false );
      setData( { ...data, [ e.target.name ]: value } );

    }

  }
  const handlevalidationfn = ( e ) =>
  {

    const value = e.target.value;
    const re = /^[A-Za-z ]+$/
    if ( value === '' )
    {
      setfncheck( true )
    } else if ( !re.test( value ) )
    {
      setfncheck( true )
    } else if ( value.length > 10 )
    {
      setfncheck( true )
    }
    else if ( value === " " )
    {
      setfncheck( true )
    } else
    {
      setfn( { ...fn, value } );
      setfncheck( false );
      setData( { ...data, [ e.target.name ]: value } );
    }

  }

  const handlevalidationpin = ( e ) =>
  {
    const value = e.target.value;
    const re = /(^\d{6}$)/;
    if ( !re.test( value ) )
    {
      setpincheck( true );
    }
    else if ( value === '' )
    {
      setpincheck( true );
    }
    else if ( value === " " )
    {
      setpincheck( true )
    }
    else
    {
      setpin( { ...pin, value } );
      setpincheck( false );
      setData( { ...data, [ e.target.name ]: value } );
    }
  }
  const handlevalidationln = ( e ) =>
  {
    const value = e.target.value;
    const re = /^[A-Za-z ]+$/
    if ( value === '' )
    {
      setlncheck( true )
    } else if ( !re.test( value ) )
    {
      setlncheck( true )
    } else if ( value.length > 10 )
    {
      setlncheck( true )
    }
    else if ( value === " " )
    {
      setlncheck( true )
    } else
    {
      setln( { ...ln, value } );
      setlncheck( false );
      setData( { ...data, [ e.target.name ]: value } );
    }

  }
  const handlevalidationcity = ( e ) =>
  {
    const value = e.target.value;
    const re = /^[A-Za-z ]+$/
    if ( value === '' )
    {
      setcitycheck( true )
    }
    else if ( !re.test( value ) )
    {
      setcitycheck( true )
    }
    else if ( value === " " )
    {
      setcitycheck( true )
    } else
    {
      setcity( { ...city, value } );
      setcitycheck( false );
      setData( { ...data, [ e.target.name ]: value } );
    }

  };
  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    if ( !fncheck && !lncheck && !addr1check && !Mobcheck && !addr2check && !pincheck && !citycheck && ( mob != '' ) && ( fn != '' ) && ( ln != '' ) && ( city != '' ) && ( addr1 != '' ) && ( pin != '' ) && ( addr2 != '' ) )
    {
      try
      {

        const id = addresss._id;
        const url = "http://localhost:8714/api/users/editaddress/" + id;
        const { data: res } = await axios.post( url, data );
        const createdmessage = res.message;
        const notify = notification( createdmessage );
        seteditordata( false );


      } catch ( error )
      {
        if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
        {
          const errornotify = notification2( error.response.data.message );

        }
      }
    } else
    {
      const errornotify23 = notification2( "Please Fill Valid Data!" );
    }
  };



  return (
    <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins" style={ { paddingTop: "36px" } }>
      <center>
        <div className="wrapper wrapper--w780" style={ { margin: "110px" } }>
          <div className="card card-3">

            <div className="card-body">
              <center><h2 className="title"><span>My Address</span></h2></center>
              <Avatar style={ { backgroundColor: "white", margin: "5px auto" } }>
                <IconButton aria-label="fingerprint" color="secondary">
                  <Fingerprint />
                </IconButton></Avatar><br />
              { editordata ? ( <Grid container spacing={ 3 } >
                <Grid item xs={ 12 } sm={ 6 }>
                  <TextField required id="outlined-basic" onChange={ ( e ) => { handlevalidationfn( e ); } } name='firstName' variant="outlined" label='Enter First Name' autoComplete="off" fullWidth />
                  { fncheck && <Typography className={ classes.error }>Please enter valid First Name</Typography> }
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } >
                  <TextField required id="outlined-basic" onChange={ ( e ) => { handlevalidationln( e ); } } name="lastName" label="Last name" fullWidth autoComplete="off" variant="outlined" />
                  { lncheck && <Typography className={ classes.error }>Please enter valid last Name</Typography> }
                </Grid>
                <Grid item xs={ 12 }>
                  <TextField required id="outlined-basic" onChange={ ( e ) => { handlevalidationaddress1( e ); } } name="address1" label="Address line 1" fullWidth autoComplete="off" variant="outlined" />
                  { addr1check && <Typography className={ classes.error }>Please enter valid Address</Typography> }
                </Grid>
                <Grid item xs={ 12 }>
                  <TextField id="outlined-basic" onChange={ ( e ) => { handlevalidationaddress2( e ); } } name="address2" label="Address line 2" fullWidth required autoComplete="off" variant="outlined" />
                  { addr2check && <Typography className={ classes.error }>Please enter valid Address</Typography> }
                </Grid>
                <Grid item xs={ 12 }  >
                  <TextField required id="outlined-basic" onChange={ ( e ) => { handlevalidationmob( e ); } } name="mobilenumber" label="Mobile Number" fullWidth autoComplete="off" variant="outlined" />
                  { Mobcheck && <Typography className={ classes.error }>Please enter valid Mobile</Typography> }
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                  <TextField required id="outlined-basic" onChange={ ( e ) => { handlevalidationcity( e ); } } name="city" label="City" fullWidth autoComplete="off" variant="outlined" />
                  { citycheck && <Typography className={ classes.error }>Please enter valid City</Typography> }
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                  <TextField required id="outlined-basic" onChange={ ( e ) => { handlevalidationpin( e ); } } name="pincode" label="Pincode" fullWidth autoComplete="off" variant="outlined" />
                  { pincheck && <Typography className={ classes.error }>Please enter valid pincode</Typography> }
                </Grid>
                <center>
                  <div>
                    <Button onClick={ handleSubmit } variant="contained" color="secondary" style={ { marginRight: 20 } } >Save </Button>
                  </div>
                </center>
              </Grid> )
                :
                ( <div >

                  { addresss && ( <Grid container spacing={ 3 } >
                    <Grid item xs={ 12 } sm={ 6 }>
                      <TextField id="outlined-basic" disabled defaultValue={ addresss.firstName } name='firstName' variant="outlined" label='First Name' autoComplete="off" fullWidth />

                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                      <TextField id="outlined-basic" disabled defaultValue={ addresss.lastName } name="lastName" label="Last name" fullWidth autoComplete="off" variant="outlined" />

                    </Grid>
                    <Grid item xs={ 12 }  >
                      <TextField id="outlined-basic" disabled defaultValue={ addresss.address1 } name="address1" label="Address Line1" fullWidth autoComplete="off" variant="outlined" />

                    </Grid>
                    <Grid item xs={ 12 }>
                      <TextField id="outlined-basic" disabled defaultValue={ addresss.address2 } name="address2" label="Adderss Line2" fullWidth autoComplete="off" variant="outlined" />
                    </Grid>
                    <Grid item xs={ 12 }>
                      <TextField id="outlined-basic" disabled defaultValue={ addresss.mobilenumber } name="mobilenumber" label="Mobile Number" fullWidth autoComplete="off" variant="outlined" />

                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                      <TextField id="outlined-basic" disabled defaultValue={ addresss.city } name="city" label="City" fullWidth autoComplete="off" variant="outlined" />

                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                      <TextField id="outlined-basic" disabled defaultValue={ addresss.pincode } name="pincode" label="Pincode" fullWidth autoComplete="off" variant="outlined" />

                    </Grid>
                    <center>
                      <div>
                        <Button onClick={ () => { seteditordata( true ) } } variant="contained" color="secondary" style={ { marginRight: 20 } } >Edit Address </Button>
                      </div>
                    </center>
                  </Grid> ) }
                </div> )

              }
            </div>
          </div>
        </div>
      </center >
    </div >
  )
}

export default Address