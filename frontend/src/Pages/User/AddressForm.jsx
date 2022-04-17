import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { handleBreakpoints } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Box, makeStyles, MenuItem } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";


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

export default function AddressForm ()
{
  const classes = useStyle();
  const navigate = useNavigate();
  const [ view, setview ] = useState( false );

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

  const [ instate, setinstate ] = useState( '' );

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
    state: "",
    pincode: "",
  } );


  const instates = [
    {
      "abbreviation": "Delhi",
      "name": "Delhi"
    },
    {
      "abbreviation": "Goa",
      "name": "Goa"
    },
    {
      "abbreviation": "Gujarat",
      "name": "Gujarat"
    },
    {
      "abbreviation": "Haryana",
      "name": "Haryana"
    },
    {
      "abbreviation": "Himachal Pradesh",
      "name": "Himachal Pradesh"
    },
    {
      "abbreviation": "Jammu and Kashmir",
      "name": "Jammu and Kashmir"
    },
    {
      "abbreviation": "Jharkhand",
      "name": "Jharkhand"
    },
    {
      "abbreviation": "Karnataka",
      "name": "Karnataka"
    },
    {
      "abbreviation": "Kerala",
      "name": "Kerala"
    },
    {
      "abbreviation": "Lakshadweep",
      "name": "Lakshadweep"
    },

  ];
  const [ alladdress, setalladdress ] = useState( [] );
  const [ adddress, setadddress ] = useState();

  const getaddressdata = async () =>
  {
    try
    {

      const id = localStorage.getItem( "userId" );
      const url = "http://localhost:8714/api/users/getalladdress/" + id;
      const { data: res } = await axios.get( url );
      const createdmessage = res.message;
      const { gotaddress } = res.data;

      setalladdress( gotaddress );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }
    }
  };

  useEffect( () =>
  {
    setview( false );
    const idq = localStorage.getItem( "userId" );
    setData( { ...data, userId: idq } );
    getaddressdata();
    localStorage.removeItem( 'aii' )
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



  const handleaddress = () =>
  {
    setview( true );
  }
  const handleback = () =>
  {
    setview( false );
  }

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
  const handlevalidationstate = ( e ) =>
  {
    let value = e.target.value;
    setinstate( { ...instate, value } );
    setData( { ...data, state: value } );

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

  }
  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }


  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    try
    {

      const url = "http://localhost:8714/api/users/newaddress";
      const { data: res } = await axios.post( url, data );
      const createdmessage = res.message;
      const notify = notification( createdmessage );
      setview( false );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }
    }
  };

  const handlelocal = ( e ) =>
  {
    const aiii = e.target.value;

    localStorage.setItem( 'aii', aiii );
  }
  const handlesubmitnext = () =>
  {
    const iid = localStorage.getItem( "aii" );
    if ( iid )
    {
      navigate( '/ordersummary' )
    }
    else
    {
      const errornotify = notification2( "Please Select Address !" );
    }
  }

  return (
    <Fragment>
      { !view && ( <Grid item xs={ 12 }>
        <Button variant="contained" sx={ { mt: 3, ml: 1 } } onClick={ handleaddress } style={ { marginBottom: "6px" } } color="success">+ New Address</Button>
      </Grid> ) }
      { view ? ( <Typography variant="h6" gutterBottom style={ { marginBottom: "24px", marginLeft: "14px", marginTop: "40px" } }>
        New Shipping Address
      </Typography> ) : ( <Typography variant="h6" gutterBottom style={ { marginBottom: "24px", marginLeft: "14px", marginTop: "40px" } }>
        Select Shipping Address
      </Typography> ) }
      { view ? ( <Grid container spacing={ 3 } >
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
        <Grid item xs={ 12 } sm={ 6 } >
          <TextField required id="outlined-basic" onChange={ ( e ) => { handlevalidationmob( e ); } } name="mobilenumber" label="Mobile Number" fullWidth autoComplete="off" variant="outlined" />
          { Mobcheck && <Typography className={ classes.error }>Please enter valid Mobile</Typography> }
        </Grid>

        <Grid item xs={ 12 } sm={ 6 }>
          <TextField required id="outlined-basic" onChange={ ( e ) => { handlevalidationcity( e ); } } name="city" label="City" fullWidth autoComplete="off" variant="outlined" />
          { citycheck && <Typography className={ classes.error }>Please enter valid City</Typography> }
        </Grid>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField id="outlined-select-currency" select onChange={ ( e ) => { handlevalidationstate( e ); } } name='state' label="Select State" variant="outlined" fullWidth >{ instates.map( ( instate, index ) => ( <MenuItem key={ index } value={ instate.abbreviation }>{ instate.name }</MenuItem > ) ) }</TextField>

        </Grid>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField required id="outlined-basic" onChange={ ( e ) => { handlevalidationpin( e ); } } name="pincode" label="Pincode" fullWidth autoComplete="off" variant="outlined" />
          { pincheck && <Typography className={ classes.error }>Please enter valid pincode</Typography> }
        </Grid>
        <Grid item xs={ 12 }>
          <Button variant="contained" sx={ { mt: 3, ml: 1 } } onClick={ handleSubmit } style={ { marginLeft: "199px" } } color="success" type="submit">Submit</Button>
        </Grid>
        <Grid item xs={ 12 }>
          <Button sx={ { mt: 3, ml: 1 } } onClick={ handleback } style={ { marginBottom: "6px" } } color="secondary">Back</Button>
        </Grid>
      </Grid>
      )
        :
        (
          <>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                style={ { marginLeft: "2px" } }
              >
                { alladdress.map( ( alladdres, index ) => (
                  <FormControlLabel onChange={ ( e ) => { handlelocal( e ) } } value={ alladdres._id } style={ { marginLeft: "2px" } } control={ <Radio /> } label={ `${ alladdres.firstName } ${ alladdres.lastName }, ${ alladdres.address1 },  ${ alladdres.city }, ${ alladdres.pincode }` } />

                ) ) }
              </RadioGroup>
            </FormControl>
            <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>

              <Button onClick={ handlesubmitnext } variant="contained" sx={ { mt: 3, ml: 1 } } style={ { backgroundColor: "	#ff4500", marginBottom: "3px", color: 'white' } }>Next</Button>

            </Box>
          </>

        )
      }

    </Fragment>
  );
}
