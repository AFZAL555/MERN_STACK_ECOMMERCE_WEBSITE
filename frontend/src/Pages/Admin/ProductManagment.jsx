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
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

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

function CustomToolbar ()
{
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}



const ProductManagment = () =>
{
    const classes = useStyles();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState( false );
    const [ products, setproducts ] = useState( [] );


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
            const url = "http://localhost:8714/api/admin/fetchproductsdata";
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

    const deletePro = async ( id ) =>
    {
        try
        {
            if ( window.confirm( "Are you sure to Delete ?" ) )
            {

                const url = "http://localhost:8714/api/admin/product/delete/" + id;
                const { data: res } = await axios.delete( url );
                const createdmessage = res.message;
                const notify = notification( createdmessage );
                getProductData();
                navigate( "/productmanagment" );

            }

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {

                const errornotify = notification2( error.response.data.message );

            }
        }
    };

    if ( loading )
    {
        return (
            <>
                <Loding />
            </>
        )
    };



    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 100
        },
        {
            field: "productname",
            headerName: "Name",
            width: 250,
        },
        {
            field: "price",
            headerName: "Price",
            width: 100
        },
        {
            field: "stock",
            headerName: "Stock",
            width: 50
        },
        {
            field: "maincategoryname",
            headerName: "Category",
            width: 100
        },
        {
            field: "subcategoryname",
            headerName: "SubCategory",
            width: 100
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: ( params ) =>
            {
                return (
                    <>
                        <Link to={ `/editproduct/${ params.row.id }` } style={ { textDecoration: "none" } }><Button color="primary" variant="contained" style={ { marginRight: 10 } } >Edit</Button></Link>
                        <Button color="secondary" variant="contained" style={ { marginRight: 10, marginTop: 5 } } onClick={ () => { deletePro( params.row.id ) } }>Delete</Button>
                    </>
                );
            },
        },
    ];

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
                                <Link to='/productadding'><button className='btn btn-bg-dark' style={ { background: 'green', borderRadius: '6px', margin: '10px' } }> + ADD</button></Link>
                            </div>
                            <div className="userList" style={ { width: "85%", margin: "75px" } }>
                                <DataGrid
                                    style={ { border: "2px solid black", color: "#042b54" } }
                                    rows={ products }
                                    disableSelectionOnClick
                                    columns={ columns }
                                    pageSize={ 4 }
                                    rowsPerPageOptions={ [ 4 ] }
                                    checkboxSelection
                                    autoHeight={ true }
                                    components={ {
                                        Toolbar: CustomToolbar,
                                    } }
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

export default ProductManagment


