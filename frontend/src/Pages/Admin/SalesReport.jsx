import React, { useState, useEffect } from "react";
import
{
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import AdminHome from "./AdminHome";
import Footer from "../../component/User/Layout/Footer";
import { useNavigate } from "react-router-dom";

function CustomToolbar ()
{
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const SalesReport = () =>
{
    const navigate = useNavigate();
    const [ report, setReport ] = useState( [] );
    const [ toDate, setToDate ] = useState();
    const [ fromDate, setFromDate ] = useState();

    const [ focus, setFocused ] = useState( false );
    const onFocus = () => setFocused( true );
    const onBlur = () => setFocused( false );

    // preventing data
    var dttoday = new Date();
    var month = dttoday.getMonth() + 1;
    var day = dttoday.getDate();
    var year = dttoday.getFullYear();
    if ( month < 10 ) month = "0" + month.toString();
    if ( day < 10 ) day = "0" + day.toString();
    var maxdate = year + "-" + month + "-" + day;

    useEffect( () =>
    {
        const admintoken = localStorage.getItem( "adminToken" );
        if ( !admintoken )
        {
            navigate( "/adminlogin" );
        }
        getsalesreport();

    }, [] );



    const getsalesreport = async () =>
    {
        try
        {

            const url = "http://localhost:8714/api/admin/fetchsalesreport";
            const { data: res } = await axios.get( url );

            const createdmessage = res.message;
            const { report } = res.data;

            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } finally
        {
            console.log( 'done' )
        }
    };


    const filterReport = async () =>
    {
        try
        {

            const data = { fromDate, toDate };
            const url = "http://localhost:8714/api/admin/fetchfilterReport";
            const { data: res } = await axios.post( url, data );

            const createdmessage = res.message;
            const { report } = res.data;

            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } finally
        {
            console.log( 'done' )
        }
    };

    const dayReport = async () =>
    {
        try
        {

            const data = { fromDate, toDate };
            const url = "http://localhost:8714/api/admin/fetchdayReport";
            const { data: res } = await axios.post( url, data );

            const createdmessage = res.message;
            const { report } = res.data;

            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } finally
        {
            console.log( 'done' )
        }
    };

    const weekReport = async () =>
    {
        try
        {

            const data = { fromDate, toDate };
            const url = "http://localhost:8714/api/admin/fetchweekReport";
            const { data: res } = await axios.post( url, data );

            const createdmessage = res.message;
            const { report } = res.data;

            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } finally
        {
            console.log( 'done' )
        }
    };

    const monthReport = async () =>
    {
        try
        {

            const data = { fromDate, toDate };
            const url = "http://localhost:8714/api/admin/fetchmonthReport";
            const { data: res } = await axios.post( url, data );

            const createdmessage = res.message;
            const { report } = res.data;

            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } finally
        {
            console.log( 'done' )
        }
    };

    const yearlyReport = async () =>
    {
        try
        {

            const data = { fromDate, toDate };
            const url = "http://localhost:8714/api/admin/fetchyearlyReport";
            const { data: res } = await axios.post( url, data );

            const createdmessage = res.message;
            const { report } = res.data;

            setReport( () =>
            {
                return report.map( ( i ) =>
                {
                    return { ...i, id: Math.random() };
                } );
            } );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message );
            }
        } finally
        {
            console.log( 'done' )
        }
    };





    const columns = [
        {
            field: "_id",
            headerName: "Order ID",
            width: 250,
            valueGetter: ( params ) => params.row._id,
        },
        {
            field: "grandtotal",
            headerName: "Total",
            width: 100,
            valueGetter: ( params ) => params.row.grandtotal,
        },

        {
            field: "paymentmethod",
            headerName: "Payment Method",
            width: 150,
            valueGetter: ( params ) => params.row.paymentmethod,
        },
        {
            field: "statusOrder",
            headerName: "Status",
            width: 205,
            valueGetter: ( params ) => params.row.statusOrder
            ,
        },
    ];

    return (

        <div>
            <section >
                <div className='row' id="rowseen">
                    <div className='col-lg-5 col-md-12 col-12' style={ { minWidth: "24%", } }>
                        <AdminHome />
                    </div>
                    <div className='col-lg-5 col-md-12 col-12' style={ { background: "white", marginTop: "-560px", width: "92%", marginLeft: '152px' } }>
                        <div className="page-wrapper bg-gra-01  font-poppins" style={ { background: "WHITE", minHeight: "93vh" } }>
                            <div className="wrapper wrapper--w780" style={ { marginLeft: '0px' } }>
                                <h1></h1><br /><br />

                                <div style={ { width: "100%", margin: "75px", flex: 4 } }>
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={ { height: "40px", marginRight: "18px", marginTop: '-163px' } }
                                            onClick={ dayReport }
                                        >
                                            DAY
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={ { height: "40px", marginRight: "18px", marginTop: '-163px' } }
                                            onClick={ weekReport }
                                        >
                                            Weekly
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={ { height: "40px", marginRight: "18px", marginTop: '-163px' } }
                                            onClick={ monthReport }
                                        >
                                            Monthly
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={ { height: "40px", marginRight: "18px", marginTop: '-163px' } }
                                            onClick={ yearlyReport }
                                        >
                                            Yearly
                                        </Button>
                                    </div>
                                    <div style={ { color: 'crimson', fontSize: '18px', fontFamily: 'Roboto', marginBottom: '18px' } }>
                                        <b><label>Generate Report</label></b>
                                    </div>
                                    <div style={ { display: "flex", alignItems: "center", justifyContent: "space-between", width: "75%" } }>
                                        <div>
                                            <label>From Date</label>
                                            <input
                                                style={ { margin: "0", border: " 1px solid dodgerblue", marginLeft: "6px", marginBottom: "12px" } }
                                                type={ "date" }
                                                max={ maxdate }
                                                onChange={ ( e ) => setFromDate( e.target.value ) }
                                            />
                                        </div>
                                        <div>
                                            <label>To Date</label>
                                            <input
                                                style={ { margin: "0", border: " 1px solid dodgerblue", marginLeft: "6px", marginBottom: "12px" } }
                                                type={ "date" }
                                                min={ fromDate }
                                                max={ maxdate }
                                                onChange={ ( e ) => setToDate( e.target.value ) }
                                            />
                                        </div>

                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={ () => { filterReport(); } }
                                            >
                                                Generate
                                            </Button>
                                        </div>
                                    </div>
                                    <DataGrid
                                        style={ { border: "2px solid black", color: "#042b54" } }
                                        rows={ report }
                                        disableSelectionOnClick
                                        columns={ columns }
                                        pageSize={ 5 }
                                        rowsPerPageOptions={ [ 20 ] }
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
                </div>
            </section >
            <Footer />
        </div>



    );
}

export default SalesReport;