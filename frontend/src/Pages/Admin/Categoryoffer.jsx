import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../component/User/Layout/Footer'
import AdminHome from './AdminHome'
import '../../component/Admin/design.css';
import Loding from '../../component/Loding';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { DataGrid } from "@mui/x-data-grid";




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






const Categoryoffer = () =>
{

    const classes = useStyles();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState( false );
    const [ products, setproducts ] = useState( [] )


    useEffect( () =>
    {
        const admintoken = localStorage.getItem( "adminToken" );
        if ( !admintoken )
        {
            navigate( "/adminlogin" );
        }
        getProductData();

    }, [] );



    const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }



    const getProductData = async () =>
    {
        try
        {

            setLoading( true );
            const url = "http://localhost:8714/api/admin/productbycatoffer";
            const { data: res } = await axios.get( url );

            const createdmessage = res.message;

            setproducts( () =>
            {
                return res.data.map( ( i ) =>
                {
                    return { ...i, id: i._id };
                } );
            } );

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
    const canceloffer = async ( id ) =>
    {
        try
        {
            if ( window.confirm( "Are you sure to cancel ?" ) )
            {

                const url = "http://localhost:8714/api/admin/categorycancelofffer/" + id;
                const { data: res } = await axios.post( url );
                const createdmessage = res.message;
                const notify = notification( createdmessage );
                getProductData();
                navigate( "/categoryoffer" );

            }

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                const errornotify = notification2( error.response.data.message );

            }
        }
    };



    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 250
        },
        {
            field: "subcategoryname",
            headerName: "SubCategory",
            width: 190,
        },
        {
            field: "discount",
            headerName: "Discount%",
            width: 170,
        },

        {
            field: "action",
            headerName: "Options",
            width: 200,
            renderCell: ( params ) =>
            {
                return (
                    <>

                        <Button color="secondary" variant="contained" style={ { marginRight: 10, marginTop: 5 } } onClick={ () => { canceloffer( params.row.id ) } } >Cancel</Button>

                    </>
                );
            },
        },
    ];


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
                        <div className="page-wrapper bg-gra-01  font-poppins" style={ { background: "WHITE" } }>
                            <div className="wrapper wrapper--w780" style={ { marginLeft: '0px' } }>
                                <Link to='/CategoryOfferAdding'><button className='btn btn-bg-dark' style={ { background: 'green', borderRadius: '6px', margin: '10px' } }> + ADD</button></Link>
                            </div>
                            <div className="userList" style={ { width: "80%", margin: "75px" } }>
                                <DataGrid
                                    style={ { border: "2px solid black", color: "#042b54" } }
                                    rows={ products }
                                    disableSelectionOnClick
                                    columns={ columns }
                                    pageSize={ 5 }
                                    rowsPerPageOptions={ [ 5 ] }
                                    checkboxSelection
                                    autoHeight={ true }
                                />
                            </div>
                        </div>



                    </div>
                </div>
            </section >
            <Footer />
        </div>
    )
}

export default Categoryoffer

