import React, { useState, useEffect } from 'react';
import { TextField, Typography, Avatar, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import './Login'
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
} );



function UserLogin ()
{
    const navigate = useNavigate();
    const classes = useStyle();
    const [ mob, setmob ] = useState( '' );
    const [ check, setcheck ] = useState( true );

    const [ sent, setsent ] = useState( false );

    const [ otp, setOtp ] = useState( '' );
    const [ digitcheck, setdigitcheck ] = useState( true );

    useEffect( () =>
    {
        const usertoken = localStorage.getItem( "usertoken" );

        if ( usertoken )
        {
            navigate( "/" );
            return true;
        } else
        {
            navigate( "/login" );
            return false;
        }

    }, [] );

    useEffect( () =>
    {
        setdigitcheck( false );
    }, [ otp ] );

    useEffect( () =>
    {
        setcheck( false );
    }, [ mob ] );


    const handlevalidation = ( e ) =>
    {

        let value = e.target.value;
        if ( value === '' )
        {
            setcheck( true )
        }
        else if ( value.length > 10 )
        {
            setcheck( true )
        }
        else if ( value.length < 10 )
        {
            setcheck( true )
        }
        else if ( value === " " )
        {
            setcheck( true )
        } else if ( isNaN( value ) )
        {
            setcheck( true )
        } else
        {
            setmob( { ...mob, value } );
            setcheck( false )
        }

    }

    const handlevalidationotp = ( e ) =>
    {

        let value7 = e.target.value;
        if ( value7 === '' )
        {
            setdigitcheck( true )
        }
        else if ( value7.length > 6 )
        {
            setdigitcheck( true )
        }
        else if ( value7.length < 6 )
        {
            setdigitcheck( true )
        }
        else if ( value7 === " " )
        {
            setdigitcheck( true )
        } else if ( isNaN( value7 ) )
        {
            setdigitcheck( true )
        } else
        {
            setOtp( { ...otp, value7 } );
            setdigitcheck( false );
        }

    };
    // toast notification
    const notification = ( m, p ) => { toast.success( ' ' + m + " " + p, { theme: "dark", position: "top-center", autoClose: 2000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notificationotp = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 2000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 2000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }


    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {

            const url = "http://localhost:8714/api/users/otpsending";
            const { data: res } = await axios.post( url, { mob } );
            const createdmessage = res.message;
            setsent( true );
            const notify = notification( createdmessage, mob.value );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                const errornotify = notification2( error.response.data.message );

            }
        }
    };

    const handleSubmitotp = async ( e ) =>
    {
        e.preventDefault();
        try
        {

            const url = "http://localhost:8714/api/users/otpverification";

            const { data: res } = await axios.post( url, { otp, mob } );
            const createdmessage1 = res.message;
            const notify4 = notificationotp( createdmessage1 );
            const { usertoken, userid, check } = res.data;

            localStorage.setItem( "usertoken", usertoken );
            localStorage.setItem( "userId", userid );
            navigate( "/" );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {

                const errornotify = notification2( error.response.data.message );

            }
        }
    };




    return (
        <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins" style={ { height: "100vh" } }>
            <div className="wrapper wrapper--w780">
                <div className="card card-3" style={ { marginTop: "-85px" } }>
                    <div className="card-heading"></div>
                    <div className="card-body">
                        <center><h2 className="title">Access Your Bro-Cart Account</h2></center>
                        <Avatar style={ { backgroundColor: "#1bbd7e", margin: "5px auto" } }>< LockOutlinedIcon /></Avatar>

                        <div className="input-group">
                            { !sent && <TextField onChange={ ( e ) => { handlevalidation( e ); } } autoComplete="off" id="standard" name='mobileNumber' label='Enter Mobile Number' fullWidth /> }
                            { check && <Typography className={ classes.error }>Please enter valid Mobile number</Typography> }
                            <br></br>  <br></br>
                            { sent && <TextField onChange={ ( e ) => { handlevalidationotp( e ); } } autoComplete="off" id="standard" name='otp' label='Enter Valid OTP' fullWidth /> }

                            { digitcheck && <Typography className={ classes.error }>Please Enter Valid 6-digits</Typography> }
                        </div>
                        <div className="p-t-10">
                            <center> { !sent ? <button onClick={ handleSubmit } className="btn btn--pill btn--green" type="submit">Request OTP</button> : <button onClick={ handleSubmitotp } className="btn btn--pill btn--green" type="submit">Verify OTP</button> }</center>
                        </div>
                        <div className="p-t-10">
                            <center> { !sent ? <Link to="/register" style={ { textDecoration: "none" } }><Typography >New to Bro-Cart ? Create an account</Typography></Link> : <Link to="#" style={ { textDecoration: "none" } }><Typography onClick={ handleSubmit } >Resend OTP</Typography></Link> }</center>
                        </div>
                        <div className="p-t-10">
                            <Link to="/" style={ { textDecoration: "none", color: "royalblue" } }><Typography >Back to Home</Typography></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UserLogin;
