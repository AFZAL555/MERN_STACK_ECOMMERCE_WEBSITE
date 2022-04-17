import React, { useEffect, useState } from 'react'
import { Avatar, Button, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Fingerprint } from '@material-ui/icons';
import { Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';





toast.configure();
const useStyles = makeStyles( {
    table: {
        width: '99%',
        margin: '14px 0 0 4px',
        alignItems: "center",
        border: "2px solid black",
    },
    cell: {
        width: "fit-content",

    },
    thead: {
        '& > *': {
            fontSize: 15,
            background: '#000000',
            color: '#F7A200',

        }

    },
    row: {
        '& > *': {
            fontSize: 18,
            width: '120px',
        }
    },
    title: {
        marginTop: '8%',
        fontSize: "2rem",

    },
    link: {
        textDecoration: 'none',
        color: "#e311f1",
        fontSize: "20px"
    },
} )




const Order = () =>
{
    const [ userorder, setuserorder ] = useState( [] );
    const navigate = useNavigate();
    const classes = useStyles();
    useEffect( () =>
    {
        const usertoken = localStorage.getItem( "usertoken" );
        if ( !usertoken )
        {
            navigate( "/login" );
        }
        getorderdata();
    }, [] );

    // toast notification

    const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }


    const getorderdata = async () =>
    {
        try
        {

            const id = localStorage.getItem( "userId" )
            const url = "http://localhost:8714/api/users/getorderdata/" + id;
            const { data: res } = await axios.get( url );
            const { userOrderdata } = res.data;
            const message = res.messge;

            setuserorder( userOrderdata );



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

    const cancelPro = async ( orderid ) =>
    {
        try
        {
            if ( window.confirm( "Are you sure to Cancel Order ?" ) )
            {

                const uid = localStorage.getItem( "userId" );
                const url = "http://localhost:8714/api/users/cancelorder";
                const { data: res } = await axios.post( url, { uid, orderid } );
                const message = res.message;
                const notify = notification( message );
                getorderdata();

            }
        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {

                const errornotify = notification2( error.response.data.message );

            }

        } finally
        {
            console.log( 'product deleting process ended.....!' )
        }


    };




    return (
        <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins" style={ { paddingTop: "36px" } }>
            <>
                <div className="wrapper wrapper--w780" style={ { margin: "110px", marginLeft: '185px' } }>
                    <div className="card card-3">

                        <div className="card-body">
                            <center><h2 className="title"><span>My Orders</span></h2></center>
                            <Avatar style={ { backgroundColor: "white", margin: "5px auto" } }>
                                <IconButton aria-label="fingerprint" color="secondary">
                                    <Fingerprint />
                                </IconButton></Avatar><br />

                            <Grid container spacing={ 3 } >
                                { ( userorder.length === 0 ) ? ( <div style={ { marginLeft: "178px" } }>

                                    <Typography variant="subtitle1">You have no Orders ,
                                        <Link className={ classes.link } to="/productlist">start adding some</Link>!
                                    </Typography>
                                </div> ) :
                                    ( <div>
                                        <Table className={ classes.table } >
                                            <TableHead>
                                                <TableRow className={ classes.thead }>

                                                    <TableCell className={ classes.cell }>No</TableCell>
                                                    <TableCell className={ classes.cell }>Order Id</TableCell>
                                                    <TableCell className={ classes.cell }>Image</TableCell>
                                                    <TableCell className={ classes.cell }>Address</TableCell>
                                                    <TableCell className={ classes.cell }>Total</TableCell>
                                                    <TableCell className={ classes.cell }>Status</TableCell>
                                                    <TableCell className={ classes.cell }>option</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                { userorder.map( ( mainuseorder, index ) => (
                                                    <TableRow className={ classes.row } key={ mainuseorder._id }>
                                                        <TableCell >{ ++index }</TableCell>
                                                        <TableCell style={ { color: 'navy' } } >{ mainuseorder._id }</TableCell>
                                                        <TableCell >{ mainuseorder.products.map( ( product, index ) => (
                                                            <div style={ { fontSize: "13px", display: "flex", justifyContent: "space-between", flexDirection: 'column', marginBottom: "4px" } }>
                                                                <img style={ { width: "50px", height: "50px", marginBottom: '2px' } } src={ product.imgCart }></img>
                                                                <p ><b>ProductId:</b>{ product.productId } </p>
                                                                <p ><b>Qnty:</b>{ product.quantity } </p>
                                                                <p><b>MRP:</b>{ product.mrp }</p>

                                                                <hr ></hr>

                                                            </div>
                                                        ) ) }</TableCell>

                                                        <TableCell >{ mainuseorder.addressid.map( ( address, index ) => (
                                                            <div style={ { fontSize: "13px", display: "flex", justifyContent: "space-between", flexDirection: 'column' } }>
                                                                <p style={ { color: "navy" } }>{ `${ address.firstName } ${ address.lastName }` } </p>
                                                                <p style={ { color: "navy" } }>{ `${ address.address1 } ${ address.address2 }` } </p>
                                                                <p style={ { color: "navy" } }>{ `${ address.city } ${ address.state }` } </p>
                                                                <p style={ { color: "navy" } }>{ `Pin: ${ address.pincode } Mob:${ address.mobilenumber }` } </p>
                                                            </div>
                                                        ) ) }</TableCell>


                                                        <TableCell >₹{ mainuseorder.grandtotal }</TableCell>
                                                        <TableCell style={ { color: 'green' } }>{ mainuseorder.statusOrder }</TableCell>
                                                        <TableCell >
                                                            { ( ( mainuseorder.statusOrder ) != 'Cancelled' && ( mainuseorder.statusOrder ) != 'Delivered' && ( mainuseorder.paymentmethod ) != 'PayPal' && ( mainuseorder.paymentmethod ) != 'razorpay' ) && <Button color="secondary" variant="contained" style={ { marginRight: 10 } } onClick={ () => { cancelPro( mainuseorder._id ) } }>Cancel</Button> }
                                                        </TableCell>


                                                    </TableRow> ) ) }
                                            </TableBody>
                                        </Table>
                                    </div> ) }
                            </Grid>
                        </div>
                    </div>
                </div>
            </>
        </div> )
}


export default Order