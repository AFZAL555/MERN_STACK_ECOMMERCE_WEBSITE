import React, { useEffect, useState, } from 'react';
import Footer from '../../component/User/Layout/Footer';
import AdminHome from './AdminHome';
import '../../component/Admin/design.css';
import { TextField, Avatar, Typography, makeStyles } from '@material-ui/core';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Loding from '../../component/Loding';


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

const values = {
    someDate: new Date().toISOString().substring( 0, 10 )
};



const Couponsadding = () =>
{
    const classes = useStyle();

    const [ couponname, setcouponname ] = useState( '' );
    const [ couponnamecheck, setcouponnamecheck ] = useState( true );

    const [ discount, setdiscount ] = useState();
    const [ discountcheck, setdiscountcheck ] = useState( true );

    const [ maxamount, setmaxamount ] = useState();
    const [ maxcheck, setmaxcheck ] = useState( true );

    const [ minamount, setminamount ] = useState();
    const [ mincheck, setmincheck ] = useState( true );

    const [ couponcode, setcouponcode ] = useState( '' );
    const [ couponcodecheck, setcouponcodecheck ] = useState( true );

    const [ expirydate, setexpirydate ] = useState( new Date() );

    const [ display, setdisplay ] = useState( false );


    const [ loading, setLoading ] = useState( false );



    useEffect( () =>
    {
        const admintoken = localStorage.getItem( "adminToken" );
        if ( !admintoken )
        {
            navigate( "/adminlogin" );
        }
        setdisplay( false );

    }, [] );


    useEffect( () =>
    {
        setcouponnamecheck( false );
    }, [ couponname ] );


    useEffect( () =>
    {
        setdiscountcheck( false );
    }, [ discount ] );


    useEffect( () =>
    {
        setmaxcheck( false );
    }, [ maxamount ] );


    useEffect( () =>
    {
        setmincheck( false );
    }, [ minamount ] );


    useEffect( () =>
    {
        setcouponcodecheck( false );
    }, [ couponcode ] );


    const navigate = useNavigate();

    // toast notification
    const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }


    const handlevalidationcouponname = ( e ) =>
    {

        const value = e.target.value;
        const re = /^[A-Za-z ]+$/
        if ( value === '' )
        {
            setcouponnamecheck( true )
        }
        else if ( value === ' ' )
        {
            setcouponnamecheck( true )
        }
        else if ( !re.test( value ) )
        {
            setcouponnamecheck( true )
        }
        else if ( value.length < 1 )
        {
            setcouponnamecheck( true )
        }
        else
        {
            setcouponname( { ...couponname, value } );
            setcouponnamecheck( false );
        }

    }

    const handlevalidationdiscount = ( e ) =>
    {

        let value = e.target.value;
        if ( value === '' )
        {
            setdiscountcheck( true );

        }
        else if ( value.length < 0 )
        {
            setdiscountcheck( true );

        }
        else if ( value === " " )
        {
            setdiscountcheck( true );

        } else if ( isNaN( value ) )
        {
            setdiscountcheck( true );

        } else
        {
            setdiscount( { ...discount, value } );
            setdiscountcheck( false );

        }

    }





    const handlevalidationmaxamount = ( e ) =>
    {

        let value = e.target.value;
        if ( value === '' )
        {
            setmaxcheck( true );

        }
        else if ( value.length < 0 )
        {
            setmaxcheck( true );

        }
        else if ( value === " " )
        {
            setmaxcheck( true );

        } else if ( isNaN( value ) )
        {
            setmaxcheck( true );

        } else
        {
            setmaxamount( { ...maxamount, value } );
            setmaxcheck( false );

        }

    };


    const handlevalidationminamount = ( e ) =>
    {

        let value = e.target.value;
        if ( value === '' )
        {
            setmincheck( true );

        }
        else if ( value.length < 0 )
        {
            setmincheck( true );

        }
        else if ( value === " " )
        {
            setmincheck( true );

        } else if ( isNaN( value ) )
        {
            setmincheck( true );

        } else
        {
            setminamount( { ...minamount, value } );
            setmincheck( false );

        }

    }

    const handlevalidationcouponcode = ( e ) =>
    {

        const value = e.target.value;
        if ( value === '' )
        {
            setcouponcodecheck( true )
        }
        else if ( value === ' ' )
        {
            setcouponcodecheck( true )
        }
        else if ( value.length < 1 )
        {
            setcouponcodecheck( true )
        }
        else
        {
            setcouponcode( { ...couponcode, value } );
            setcouponcodecheck( false );
        }

    }

    const handleSubmitdata = async ( e ) =>
    {
        e.preventDefault();

        if ( couponname != '' && discount != '' && minamount != '' && maxamount != '' && couponcode != '' )
        {
            try
            {
                console.log( "handleSubmitdata called....!" );
                setLoading( true );

                const data = {
                    couponname,
                    discount,
                    maxamount,
                    minamount,
                    couponcode,
                    expirydate,


                }

                const url = "http://localhost:8714/api/admin/addcouponoffer";
                const { data: res } = await axios.post( url, data );
                const createdmessage = res.message;
                setLoading( false );
                const notify = notification( createdmessage );
                navigate( "/Coupons" );


            } catch ( error )
            {
                if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
                {

                    const errornotify = notification2( error.response.data.message );
                    console.log( error.response.data.message );
                }
            }
            finally
            {
                setLoading( false );
            }

        } else
        {
            const errornotify = notification2( "Please fill all the feild!" );
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

                                        <center><h2 className="title">Adding New Coupon Offer</h2></center>
                                        <Avatar style={ { backgroundColor: "rgb(204 166 221)", margin: "5px auto" } }><AddShoppingCartIcon /></Avatar>



                                        <div className="input-group">
                                            <TextField autoComplete="off" id="outlined-basic" required name='couponname' onChange={ ( e ) => { handlevalidationcouponname( e ); } } label="Enter Coupon Offer Name" variant="outlined" fullWidth />
                                            { couponnamecheck && <Typography className={ classes.error }>Please enter valid coupon name !</Typography> }
                                        </div>



                                        <div className="input-group">
                                            <TextField autoComplete="off" id="outlined-basic" required name='discount' onChange={ ( e ) => { handlevalidationdiscount( e ); } } label="Enter  Discount %" variant="outlined" fullWidth />
                                            { discountcheck && <Typography className={ classes.error }>Please enter valid  discount% !</Typography> }
                                        </div>



                                        <div className="input-group">
                                            <TextField autoComplete="off" id="outlined-basic" name='maximumamount' onChange={ ( e ) => { handlevalidationmaxamount( e ); } } label="Enter  Maximum Purchase Amount" variant="outlined" fullWidth />
                                            { maxcheck && <Typography className={ classes.error }>Please enter valid  maximum amount !</Typography> }
                                        </div>


                                        <div className="input-group">
                                            <TextField autoComplete="off" id="outlined-basic" required name='minimumamount' onChange={ ( e ) => { handlevalidationminamount( e ); } } label="Enter  Minimum Purchase Amount" variant="outlined" fullWidth />
                                            { mincheck && <Typography className={ classes.error }>Please enter valid  minimum amount !</Typography> }
                                        </div>

                                        <div className="input-group">
                                            <TextField autoComplete="off" id="outlined-basic" required name='couponcode' onChange={ ( e ) => { handlevalidationcouponcode( e ); } } label="Enter  Coupon Code " variant="outlined" fullWidth />
                                            { couponcodecheck && <Typography className={ classes.error }>Please enter valid  coupon code !</Typography> }
                                        </div>

                                        <div className="input-group">
                                            <TextField autoComplete="off" id="outlined-basic" required variant="outlined" fullWidth type="date" defaultValue={ values.someDate } onChange={ ( e ) => { setexpirydate( e.target.value ) } } />
                                            {/* <DatePicker   disablePast selected={expirydate} onChange={(date) => setexpirydate(date)}     /> */ }
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
        </div>
    )
}

export default Couponsadding