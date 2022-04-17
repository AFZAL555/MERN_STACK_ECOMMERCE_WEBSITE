import { Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../component/User/Layout/Footer'
import AdminHome from './AdminHome'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import Loding from '../../component/Loding'


import { DataGrid } from "@mui/x-data-grid";


toast.configure();

const useStyles = makeStyles( {
  table: {
    width: '100%',
    margin: '6px 12px  0 1px',
    alignItems: "center",
    border: "2px solid black",
    marginLeft: "102px",
  },
  cell: {
    width: "25px",
    marginLeft: "8px",

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
const CategoryManagment = () =>
{
  const classes = useStyles();
  const navigate = useNavigate()
  const { id } = useParams();
  const [ category, setCategory ] = useState( [] );
  const [ subcategory, setsubcategory ] = useState( [] );
  const [ loading, setLoading ] = useState( false );


  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }



  useEffect( () =>
  {
    const admintoken = localStorage.getItem( "adminToken" );
    if ( !admintoken )
    {
      navigate( "/adminlogin" );
    }
    getCategoryData();

  }, [] );


  const getCategoryData = ( async () =>
  {
    try
    {

      setLoading( true );
      const url = "http://localhost:8714/api/admin/fetchcategorydata";
      const { data: res } = await axios.get( url );

      const createdmessage = res.message;
      const { mainCategory, subCategory } = res.data;
      setCategory( () =>
      {
        return mainCategory.map( ( i ) =>
        {
          return { ...i, id: i._id };
        } );
      } );
      setsubcategory( () =>
      {
        return subCategory.map( ( i ) =>
        {
          return { ...i, id: i._id };
        } );
      } );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        console.log( error.response.data.message )

      }
    } finally
    {
      setLoading( false );
    }
  } )

  const handleDelete = async ( id ) =>
  {
    try
    {
      if ( window.confirm( "Are you sure to Delete ?" ) )
      {

        const url = "http://localhost:8714/api/admin/category/delete/" + id;
        const { data: res } = await axios.delete( url );
        const createdmessage = res.message;
        const notify = notification( createdmessage );
        getCategoryData();
        navigate( "/categorymanagment" );

      }

    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );

      }
    }
  };
  const handleDeletesub = async ( id ) =>
  {
    try
    {
      if ( window.confirm( "Are you sure to Delete ?" ) )
      {

        const url = "http://localhost:8714/api/admin/subcategory/delete/" + id;
        const { data: res } = await axios.delete( url );
        const createdmessage = res.message;
        const notify = notification( createdmessage );
        getCategoryData();
        navigate( "/categorymanagment" );

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
      width: 300
    },
    {
      field: "categoryname",
      headerName: "Main_Category",
      width: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: ( params ) =>
      {
        return (
          <>
            <Link to={ `/editcategory/${ params.row.id }` } style={ { textDecoration: "none" } }><Button color="primary" variant="contained" style={ { marginRight: 10 } } >Edit</Button></Link>
            <Button color="secondary" variant="contained" style={ { marginRight: 10 } } onClick={ () => { handleDelete( params.row.id ) } } >Delete</Button>
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
    <>

      <section >
        <div className='row' id="rowseen">
          <div className='col-lg-5 col-md-12 col-12' style={ { minWidth: "24%" } }>
            <AdminHome />
          </div>
          <div className='col-lg-5 col-md-12 col-12' id="navyblue" style={ { marginTop: "-560px", width: "92%", marginLeft: '152px' } }>
            <div className="page-wrapper bg-gra-01  font-poppins" style={ { background: "WHITE" } }>
              <div className="wrapper wrapper--w780" style={ { marginLeft: '0px' } }>
                <div>
                  <Link to='/categoryadding'><button className='btn btn-bg-dark' style={ { background: 'green', borderRadius: '6px', margin: '10px' } }> + ADD</button></Link>
                </div>


                <div className="userList" style={ { width: "100%", margin: "75px" } }>
                  <DataGrid
                    style={ { border: "2px solid black", color: "#042b54", marginLeft: "27px" } }
                    rows={ category }
                    disableSelectionOnClick
                    columns={ columns }
                    pageSize={ 5 }
                    rowsPerPageOptions={ [ 5 ] }
                    checkboxSelection
                    autoHeight={ true }
                  />
                </div>

















                <div>
                  <Table className={ classes.table } >
                    <TableHead>
                      <TableRow className={ classes.thead }>
                        <TableCell className={ classes.cell }>No:</TableCell>
                        <TableCell className={ classes.cell }>Sub Category</TableCell>
                        <TableCell className={ classes.cell }>Main Category</TableCell>
                        <TableCell className={ classes.cell } >Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { subcategory.map( ( sub, index ) => (
                        <TableRow className={ classes.row } key={ sub.id }>
                          <TableCell >{ ++index }</TableCell>
                          <TableCell>{ sub.subcategoryname }</TableCell>
                          <TableCell>{ category.map( ( cat ) => (
                            <p>
                              {
                                ( sub.parentCatId === cat._id ) && ( <h6>{ cat.categoryname }</h6> )
                              }
                            </p>

                          ) ) }</TableCell>
                          <TableCell style={ { display: "flex", justifyContent: "space-between" } }>
                            <Link to={ `/editsubcategory/${ sub._id }` } style={ { textDecoration: "none" } }><Button color="primary" variant="contained" style={ { marginRight: 10 } } >Edit</Button></Link>
                            <Button color="secondary" variant="contained" style={ { marginRight: 10 } } onClick={ () => { handleDeletesub( sub._id ) } } >Delete</Button>
                          </TableCell>
                        </TableRow>
                      ) ) }
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      <Footer />







    </>
  )
}

export default CategoryManagment

{/* <div>
                  <Table className={classes.table} >
                    <TableHead>
                      <TableRow className={classes.thead}>
                        <TableCell className={classes.cell}>No:</TableCell>
                        <TableCell className={classes.cell}>Main Category</TableCell>
                        <TableCell className={classes.cell} >Actions </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {category.map((cat, index) => (
                        <TableRow className={classes.row} key={cat.id}>
                          <TableCell >{++index}</TableCell>
                          <TableCell>{cat.categoryname}</TableCell>
                          <TableCell style={{ display: "flex", justifyContent: "space-between" }}>
                            <Link to={`/editcategory/${cat._id}`} style={{ textDecoration: "none" }}><Button color="primary" variant="contained" style={{ marginRight: 10 }} >Edit</Button></Link>
                            <Button color="secondary" variant="contained" style={{ marginRight: 10 }} onClick={() => { handleDelete(cat._id) }} >Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div> */}