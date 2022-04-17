import React, { useEffect, useState } from 'react';
import Footer from '../../component/User/Layout/Footer';
import AdminHome from './AdminHome';
import Loding from '../../component/Loding';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";



toast.configure();


const useStyles = makeStyles( {
  table: {
    width: '100%',
    margin: '16px 0 0 82px',
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


const UsersList = () =>
{
  const [ users, setUsers ] = useState( [] );
  const [ loading, setLoading ] = useState( false );
  const navigate = useNavigate();

  const classes = useStyles();

  useEffect( () =>
  {
    const admintoken = localStorage.getItem( "adminToken" );
    if ( !admintoken )
    {
      navigate( "/adminlogin" );
    }
    getUserData();

  }, [] );





  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }


  const getUserData = async () =>
  {
    try
    {

      setLoading( true );
      const url = "http://localhost:8714/api/admin/fetchuserdata";
      const { data: res } = await axios.get( url );

      const createdmessage = res.message;
      setUsers( () =>
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

  const handleBlock = ( async ( id ) =>
  {

    try
    {
      if ( window.confirm( "Are you sure to Block the User ?" ) )
      {

        const url = "http://localhost:8714/api/admin/block/" + id;
        const { data: res } = await axios.get( url );

        const notify = notification( res.message );
        const createdmessage = res.message;
        getUserData();

      }
    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }
    }
  } )

  const handleUnBlock = ( async ( id ) =>
  {

    try
    {
      if ( window.confirm( "Are you sure to UnBlock ?" ) )
      {

        const url = "http://localhost:8714/api/admin/unblock/" + id;
        const { data: res } = await axios.get( url );

        const notify = notification( res.message );
        const createdmessage = res.message;
        getUserData();

      }
    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {

        const errornotify = notification2( error.response.data.message );

      }
    }
  } );
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200
    },
    {
      field: "firstName",
      headerName: "Name",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
    },
    {
      field: "mobileNumber",
      headerName: "Mob",
      width: 100
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: ( params ) =>
      {
        return (
          <>
            { params.row.status === 'true' ? ( <Button color="primary" variant="contained" onClick={ () => handleBlock( params.row.id ) }>Block</Button> ) :
              ( <Button color="secondary" variant="contained" onClick={ () => handleUnBlock( params.row.id ) }>UnBlock</Button> ) }
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

          <div className='col-lg-5 col-md-12 col-12' id="navyblue" style={ { marginTop: "-560px", width: "92%", marginLeft: '152px' } }>
            <div className="page-wrapper bg-gra-01  font-poppins" style={ { background: "WHITE" } }>
              <div className="wrapper wrapper--w823" style={ { marginLeft: '39px' } }>
                <h1>Users Data</h1>

                <div className="userList" style={ { width: "100%", margin: "75px" } }>
                  <DataGrid
                    style={ { border: "2px solid black", color: "#042b54" } }
                    rows={ users }
                    disableSelectionOnClick
                    columns={ columns }
                    pageSize={ 5 }
                    rowsPerPageOptions={ [ 5 ] }
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
  )
}


export default UsersList

