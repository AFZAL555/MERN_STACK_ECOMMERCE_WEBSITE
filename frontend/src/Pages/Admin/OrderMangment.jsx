import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../component/User/Layout/Footer'
import AdminHome from './AdminHome'
import Loding from '../../component/Loding';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import Select from "@mui/material/Select";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from '@mui/material';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


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
    }
} )



const OrderMangment = () =>
{
    const classes = useStyles();
    const navigate = useNavigate();
    const [ orders, setorders ] = useState( [] );

    const [ loading, setLoading ] = useState( false );


    const statusOptions = [ "Placed", "Confirmed", "Shipped", "Delivered", "Cancelled" ];

    useEffect( () =>
    {
        const admintoken = localStorage.getItem( "adminToken" );
        if ( !admintoken )
        {
            navigate( "/adminlogin" );
        }

        getOrderData();
    }, [] );


    const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }



    const getOrderData = async () =>
    {
        try
        {

            setLoading( true );
            const url = "http://localhost:8714/api/admin/fetchordersdata";
            const { data: res } = await axios.get( url );

            const createdmessage = res.message;
            const { Orders } = res.data;


            setorders( Orders );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                const errornotify = notification2( error.response.data.message );

            }
        } finally
        {
            setLoading( false );
        }
    };





    const changeOrderStatus = async ( e, oid ) =>
    {
        try
        {

            setLoading( true );
            const id = oid;
            const value = e.target.value;
            const url = "http://localhost:8714/api/admin/orderstatus/" + id;
            const { data: res } = await axios.post( url, { value } );

            const createdmessage = res.message;

            const notify = notification( createdmessage );

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {

                const errornotify = notification2( error.response.data.message );

            }
        } finally
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

                    <div className='col-lg-5 col-md-12 col-12' id="navyblue" style={ { marginTop: "-560px", width: "92%", marginLeft: '152px' } }>
                        <div className="page-wrapper bg-gra-01  font-poppins" >
                            <div className="wrapper wrapper--w823" style={ { marginLeft: '39px' } }>
                                <h1>Order Managing</h1>
                                <div>
                                    { ( orders.length != 0 ) ? ( <Table className={ classes.table } >
                                        <TableHead>
                                            <TableRow className={ classes.thead }>

                                                <TableCell className={ classes.cell }>No</TableCell>
                                                <TableCell className={ classes.cell }>Order Id</TableCell>
                                                <TableCell className={ classes.cell }>Products</TableCell>
                                                <TableCell className={ classes.cell }>Address</TableCell>
                                                <TableCell className={ classes.cell }>Total</TableCell>
                                                <TableCell className={ classes.cell }>Status</TableCell>
                                                <TableCell className={ classes.cell }>Payment</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        { orders && ( <TableBody>
                                            { orders.map( ( order, index ) => (
                                                <TableRow className={ classes.row } key={ order._id }>

                                                    <TableCell >{ ++index }</TableCell>
                                                    <TableCell style={ { color: "navy" } } >{ order._id }</TableCell>

                                                    <TableCell >{ order.products.map( ( product, index ) => (
                                                        <div style={ { fontSize: "13px", display: "flex", justifyContent: "space-between", flexDirection: 'column', marginBottom: "4px" } }>
                                                            <img style={ { width: "50px", height: "50px", marginBottom: '2px' } } src={ product.imgCart }></img>
                                                            <p ><b>ProductId:</b>{ product.productId } </p>
                                                            <p ><b>Qnty:</b>{ product.quantity } </p>
                                                            <p><b>MRP:</b>{ product.mrp }</p>
                                                            <hr ></hr>


                                                        </div>
                                                    ) ) }</TableCell>
                                                    <TableCell >{ order.addressid.map( ( address, index ) => (
                                                        <div style={ { fontSize: "13px", display: "flex", justifyContent: "space-between", flexDirection: 'column' } }>
                                                            <p style={ { color: "navy" } }>{ `${ address.firstName } ${ address.lastName }` } </p>
                                                            <p style={ { color: "navy" } }>{ `${ address.address1 } ${ address.address2 }` } </p>
                                                            <p style={ { color: "navy" } }>{ `${ address.city } ${ address.state }` } </p>
                                                            <p style={ { color: "navy" } }>{ `Pin: ${ address.pincode } Mob:${ address.mobilenumber }` } </p>
                                                        </div>
                                                    ) ) }</TableCell>

                                                    <TableCell>{ order.grandtotal }</TableCell>
                                                    { order && ( <TableCell style={ { color: "green" } } >

                                                        { ( order.statusOrder === "Cancelled" || order.statusOrder === "Delivered" ) ? ( order.statusOrder )
                                                            :
                                                            ( <Select
                                                                labelId="demo-multiple-name-label"
                                                                id="demo-multiple-name"
                                                                defaultValue={ order.statusOrder }
                                                                onChange={ ( e ) =>
                                                                {
                                                                    changeOrderStatus( e, order._id );
                                                                    getOrderData();
                                                                } }
                                                                MenuProps={ MenuProps }
                                                            >
                                                                { statusOptions.map( ( i, index ) => (
                                                                    <MenuItem key={ index } value={ i }>
                                                                        { i }
                                                                    </MenuItem>
                                                                ) ) }
                                                            </Select> ) }




                                                    </TableCell> ) }
                                                    <TableCell style={ { color: "red" } }>{ order.paymentmethod }</TableCell>
                                                </TableRow>
                                            ) ) }
                                        </TableBody> ) }
                                    </Table> ) : ( <div style={ { marginLeft: "185px" } }>

                                        <Typography variant="h4" color={ "red" }>You have no Orders ,

                                        </Typography>
                                    </div> ) }
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

export default OrderMangment

