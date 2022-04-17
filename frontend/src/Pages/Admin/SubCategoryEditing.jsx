import { TextField, Avatar, makeStyles, Typography } from '@material-ui/core';
import CategoryIcon from '@mui/icons-material/Category';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../component/User/Layout/Footer';
import AdminHome from './AdminHome';

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

const SubCategoryEditing = () =>
{
    const classes = useStyle();
    const navigate = useNavigate()
    const { id } = useParams();

    const [ subcat, setsubcat ] = useState( '' );
    const [ subcatcheck, setsubcatcheck ] = useState( true );
    const [ data, setData ] = useState( { subcategoryname: '', categoryname: '' } );
    const [ maincat, setmaincat ] = useState( '' );
    const [ maincheck, setmaincheck ] = useState( true );

    useEffect( () =>
    {
        setsubcatcheck( false );
        setmaincheck( false );
        getSubCategoryById();
    }, [ subcat, maincat ] );

    useEffect( () =>
    {
        const admintoken = localStorage.getItem( "adminToken" );
        if ( !admintoken )
        {
            navigate( "/adminlogin" );
        }
    }, [] );

    const getSubCategoryById = async () =>
    {
        try
        {

            const url = "http://localhost:8714/api/admin/subcategoryname/" + id;
            const { data: res } = await axios.get( url );
            const createdmessage = res.message;

            const { Child, Parent } = res.data;
            const subcatname = Child.subcategoryname;
            const parentname = Parent.categoryname;
            setsubcat( subcatname );
            setmaincat( parentname );



        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {

                const errornotify = notification2( error.response.data.message );

            }
        }
    };

    const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }

    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {

            const url = "http://localhost:8714/api/admin/subcategoryname/subupdate/" + id;

            const { data: res } = await axios.post( url, data );
            const createdmessage = res.message;
            const notify = notification( createdmessage );
            navigate( "/categorymanagment" );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {

                const errornotify = notification2( error.response.data.message );

            }
        }
    };

    const handleChangename = ( e ) =>
    {
        const value = e.target.value;

        const re = /^[A-Za-z ]+$/
        if ( value === '' )
        {
            setsubcatcheck( true )
        } else if ( !re.test( value ) )
        {
            setsubcatcheck( true )
        } else if ( value.length > 15 )
        {
            setsubcatcheck( true )
        }
        else if ( value === " " )
        {
            setsubcatcheck( true )
        } else
        {
            setsubcat( { ...subcat, value } );
            setsubcatcheck( false );
            setData( { ...data, [ e.target.name ]: value } );
        }
    }
    const handleChangenamemain = ( e ) =>
    {
        const value = e.target.value;

        const re = /^[A-Za-z ]+$/
        if ( value === '' )
        {
            setmaincheck( true )
        } else if ( !re.test( value ) )
        {
            setmaincheck( true )
        } else if ( value.length > 15 )
        {
            setmaincheck( true )
        }
        else if ( value === " " )
        {
            setmaincheck( true )
        } else
        {
            setmaincat( { ...maincat, value } );
            setmaincheck( false );
            setData( { ...data, [ e.target.name ]: value } );
        }
    }

    return (
        <>
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
                                        <center><h2 className="title">Editing New Category</h2></center>
                                        <Avatar style={ { backgroundColor: "rgb(204 166 221)", margin: "5px auto" } }><CategoryIcon /></Avatar>

                                        { subcat && ( <div className="input-group">
                                            <TextField autoComplete="off" id="outlined-basic" onChange={ ( e ) => { handleChangename( e ) } } name='subcategoryname' label="Enter Sub-Category" defaultValue={ subcat } variant="outlined" fullWidth />
                                            { subcatcheck && <Typography className={ classes.error }>Please enter valid Sub Category</Typography> }
                                        </div> ) }
                                        { maincat && ( <div className="input-group">
                                            <TextField autoComplete="off" id="outlined-basic" onChange={ ( e ) => { handleChangenamemain( e ) } } name='categoryname' label="Enter MainCategory" defaultValue={ maincat } variant="outlined" fullWidth />
                                            { maincheck && <Typography className={ classes.error }>Please enter valid Main Category</Typography> }
                                        </div> ) }
                                        <div className="p-t-10">
                                            <center> <button className="btn btn--pill btn--green" type="submit" onClick={ handleSubmit } >Edit Category</button></center>
                                        </div>
                                    </div>
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

export default SubCategoryEditing;