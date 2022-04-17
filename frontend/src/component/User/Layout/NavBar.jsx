import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Input } from '@material-ui/core';
import { Search, ShoppingCart } from '@material-ui/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast } from 'react-toastify';
import useStyles from './navbar';

toast.configure();

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius:5px;
`;
const PrimarySearchAppBar = () =>
{
    const user = localStorage.getItem( "userId" );
    const [ count, setcount ] = useState( 0 );
    useEffect( () =>
    {
        const usertoken = localStorage.getItem( "usertoken" );
        if ( !usertoken )
        {
            setuserstate( false );
        } else
        {
            setuserstate( true );
        }
        getcount();

    }, [ count ] );
    const [ userstate, setuserstate ] = useState( false );
    const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = useState( null );
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }

    const isMobileMenuOpen = Boolean( mobileMoreAnchorEl );

    const handleMobileMenuClose = () => setMobileMoreAnchorEl( null );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const handleLogout = () =>
    {
        localStorage.removeItem( "usertoken" );
        localStorage.removeItem( "userId" );

        window.location.reload();
    };
    const getcount = async () =>
    {
        try
        {

            const id = user;

            const url = "http://localhost:8714/api/users/cartcount/" + id;
            const { data: res } = await axios.get( url );

            const createdmessage = res.message;

            const { ount } = res.data;
            setcount( ount );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {

                const errornotify = notification2( error.response.data.message );

            }
        } finally
        {
            console.log( "Product Listed" )
        }
    };


    const renderMobileMenu = (
        <Menu anchorEl={ mobileMoreAnchorEl } anchorOrigin={ { vertical: 'top', horizontal: 'right' } } id={ mobileMenuId } keepMounted transformOrigin={ { vertical: 'top', horizontal: 'right' } } open={ isMobileMenuOpen } onClose={ handleMobileMenuClose }>

            <MenuItem>
                <IconButton component={ Link } to="/cart" aria-label="Show cart items" color="inherit">
                    <ShoppingCart />

                </IconButton>
                <p>Cart</p>
            </MenuItem>




        </Menu>
    );

    return (
        <div >
            <AppBar position="fixed" className={ classes.appBar } color="inherit" style={ { backgroundColor: "black" } }>
                <Toolbar >
                    <Typography component={ Link } to="/" variant="h7" className={ classes.title } color="inherit">
                        <img src="/apple-icon.png" alt="commerce.js" height="25px" className={ classes.image } /> BRO-CART
                    </Typography>
                    <div className={ classes.grow } />
                    { !user ? (
                        <div style={ { display: "flex" } }>


                            <div className={ classes.button }>
                                <IconButton aria-label="Show cart items" color="inherit">
                                    <Link to="/login"><LoginIcon style={ { color: "#63efe8" } } /></Link>
                                </IconButton>
                            </div>


                        </div>
                    ) : (

                        <div style={ { display: "flex" } }>

                            <div className={ classes.button }>
                                <IconButton component={ Link } to="/cart" aria-label="Show cart items" color="inherit">
                                    <ShoppingCart style={ { color: " #63efe8" } } />

                                </IconButton>
                            </div>
                            { userstate ? ( <div className={ classes.button }>
                                <IconButton component={ Link } to="/profile" aria-label="Show cart items" color="inherit">
                                    <AccountCircleIcon style={ { color: "#63efe8" } } />
                                </IconButton>
                            </div> ) : null }
                            { userstate ? ( <div className={ classes.button }>
                                <IconButton aria-label="Show cart items" color="inherit">
                                    <LogoutIcon style={ { color: "#63efe8" } } onClick={ handleLogout } />
                                </IconButton>
                            </div> ) : ( <div className={ classes.button }>
                                <IconButton aria-label="Show cart items" color="inherit">
                                    <Link to="/login"><LoginIcon style={ { color: "#63efe8" } } /></Link>
                                </IconButton>
                            </div> ) }



                        </div>
                    )

                    }
                </Toolbar>
            </AppBar>
            { renderMobileMenu }
        </div>
    );
};

export default PrimarySearchAppBar;