import React, { useState, useEffect } from 'react';
import axios from "axios";
import './signup.css';
import { TextField, Typography, Avatar, makeStyles } from '@material-ui/core';
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

function Signup ()
{
    const classes = useStyle();

    const [ mob, setmob ] = useState( '' );
    const [ Mobcheck, setMobcheck ] = useState( true );

    const [ fn, setfn ] = useState( '' );
    const [ fncheck, setfncheck ] = useState( true );

    const [ ln, setln ] = useState( '' );
    const [ lncheck, setlncheck ] = useState( true );

    const [ usn, setusn ] = useState( '' );
    const [ usncheck, setusncheck ] = useState( true );

    const [ email, setemail ] = useState( '' );
    const [ emailcheck, setemailcheck ] = useState( true );

    const [ referral, setreferral ] = useState( '' );




    const navigate = useNavigate();

    const [ data, setData ] = useState( {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        mobileNumber: "",
        referralcode: "",
    } );

    useEffect( () =>
    {
        const usertoken = localStorage.getItem( "usertoken" );

        if ( usertoken )
        {

            return true;
        } else
        {
            navigate( "/register" );
            return false;
        }

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
        setusncheck( false );
    }, [ usn ] );

    useEffect( () =>
    {
        setemailcheck( false );
    }, [ email ] );



    // toast notification
    const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }


    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {

            const url = "http://localhost:8714/api/users/register";
            const { data: res } = await axios.post( url, data );
            const createdmessage = res.message;
            const notify = notification( createdmessage );
            navigate( "/login" );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                const errornotify = notification2( error.response.data.message );

            }
        }
    };


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

        const value1 = e.target.value;
        const re = /^[A-Za-z ]+$/
        if ( value1 === '' )
        {
            setfncheck( true )
        } else if ( !re.test( value1 ) )
        {
            setfncheck( true )
        } else if ( value1.length > 10 )
        {
            setfncheck( true )
        }
        else if ( value1 === " " )
        {
            setfncheck( true )
        } else
        {
            setfn( { ...fn, value1 } );
            setfncheck( false );
            setData( { ...data, [ e.target.name ]: value1 } );
        }

    }

    const handlevalidationemail = ( e ) =>
    {
        const value2 = e.target.value;
        const atposition = value2.indexOf( "@" );
        const dotposition = value2.lastIndexOf( "." );
        if ( atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= value2.length )
        {
            setemailcheck( true );
        }
        else if ( value2 === '' )
        {
            setemailcheck( true );
        }
        else if ( value2 === " " )
        {
            setemailcheck( true )
        }
        else
        {
            setemail( { ...email, value2 } );
            setemailcheck( false );
            setData( { ...data, [ e.target.name ]: value2 } );
        }
    }
    const handlevalidationln = ( e ) =>
    {
        const value4 = e.target.value;
        const re = /^[A-Za-z ]+$/
        if ( value4 === '' )
        {
            setlncheck( true )
        } else if ( !re.test( value4 ) )
        {
            setlncheck( true )
        } else if ( value4.length > 10 )
        {
            setlncheck( true )
        }
        else if ( value4 === " " )
        {
            setlncheck( true )
        } else
        {
            setln( { ...ln, value4 } );
            setlncheck( false );
            setData( { ...data, [ e.target.name ]: value4 } );
        }

    }
    const handlevalidationusn = ( e ) =>
    {
        const value3 = e.target.value;
        if ( value3 === '' )
        {
            setusncheck( true )
        }
        else if ( value3.length > 6 )
        {
            setusncheck( true )
        }
        else if ( value3 === " " )
        {
            setusncheck( true )
        } else
        {
            setusn( { ...usn, value3 } );
            setusncheck( false );
            setData( { ...data, [ e.target.name ]: value3 } );
        }

    };
    const handlereferralvalidation = ( e ) =>
    {
        const referr = e.target.value;
        setreferral( { ...referral, referr } );
        setData( { ...data, [ e.target.name ]: referr } );



    };




    return (
        <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins" style={ { paddingTop: "36px" } }>
            <div className="wrapper wrapper--w780">
                <div className="card card-3">
                    <div className="card-heading"></div>
                    <div className="card-body">
                        <center><h2 className="title">Create Account</h2></center>
                        <Avatar style={ { backgroundColor: "rgb(204 166 221)", margin: "5px auto" } }><AccountCircleIcon /></Avatar>

                        <div className="input-group">
                            <TextField autoComplete="off" onChange={ ( e ) => { handlevalidationfn( e ); } } id="outlined-basic" name='firstName' variant="outlined" label='Enter First Name' fullWidth />
                            { fncheck && <Typography className={ classes.error }>Please enter valid First Name</Typography> }
                        </div>
                        <div className="input-group">
                            <TextField autoComplete="off" onChange={ ( e ) => { handlevalidationln( e ); } } id="outlined-basic" name='lastName' variant="outlined" label='Enter Last Name' fullWidth />
                            { lncheck && <Typography className={ classes.error }>Please enter valid Last Name </Typography> }
                        </div>
                        <div className="input-group">
                            <TextField autoComplete="off" onChange={ ( e ) => { handlevalidationusn( e ); } } id="outlined-basic" name='userName' variant="outlined" label='Enter Username' fullWidth />
                            { usncheck && <Typography className={ classes.error }>Please enter valid Usernname </Typography> }
                        </div>
                        <div className="input-group">
                            <TextField autoComplete="off" onChange={ ( e ) => { handlevalidationemail( e ); } } id="outlined-basic" name='email' variant="outlined" label='Enter Email' fullWidth />
                            { emailcheck && <Typography className={ classes.error }>Please enter valid Email</Typography> }
                        </div>
                        <div className="input-group">
                            <TextField autoComplete="off" onChange={ ( e ) => { handlevalidationmob( e ); } } id="outlined-basic" name='mobileNumber' variant="outlined" label='Enter Mobile Number' fullWidth />
                            { Mobcheck && <Typography className={ classes.error }>Please enter valid Mobile number</Typography> }
                        </div>

                        <div className="input-group">
                            <TextField autoComplete="off" onChange={ ( e ) => { handlereferralvalidation( e ); } } id="outlined-basic" name='referralcode' variant="outlined" label='Refferral Code(optional)' fullWidth />
                        </div>

                        <div className="p-t-10">
                            <center> <button onClick={ handleSubmit } className="btn btn--pill btn--green" type="submit">Create</button></center>
                        </div>
                        <div className="p-t-10">
                            <center> <Link to="/login" style={ { textDecoration: "none" } }><Typography >Already  an Account ?</Typography></Link></center>
                        </div>
                    </div>
                </div>
            </div>
        </div> );
}

export default Signup;
