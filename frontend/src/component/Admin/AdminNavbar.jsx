import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Input } from '@material-ui/core';
import { Search, ShoppingCart } from '@material-ui/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from "styled-components";
import LogoutIcon from '@mui/icons-material/Logout';

import useStyles from './AdminNavbar.js';

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius:5px;
`;
const AdminBar = () =>
{
    const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = useState( null );
    const [ adminstate, setadminstate ] = useState( false );
    const classes = useStyles();
    const navigate = useNavigate();

    const isMobileMenuOpen = Boolean( mobileMoreAnchorEl );
    const handleMobileMenuClose = () => setMobileMoreAnchorEl( null );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu anchorEl={ mobileMoreAnchorEl } anchorOrigin={ { vertical: 'top', horizontal: 'right' } } id={ mobileMenuId } keepMounted transformOrigin={ { vertical: 'top', horizontal: 'right' } } open={ isMobileMenuOpen } onClose={ handleMobileMenuClose }>

            <MenuItem>

            </MenuItem>

        </Menu>
    );


    useEffect( () =>
    {
        setadminstate( false );
        const admintoken = localStorage.getItem( "adminToken" );
        if ( !admintoken )
        {
            navigate( "/adminlogin" );
            setadminstate( false );
        } else
        {
            setadminstate( true );

        }
    }, [] );
    const handleLogout = () =>
    {

        localStorage.removeItem( "adminToken" );
        window.location.reload();

    };



    return (
        <div >
            <AppBar position="fixed" className={ classes.appBar } color="inherit" style={ { backgroundColor: "black" } }>
                <Toolbar>
                    <Typography component={ Link } to="/adminhome" variant="h7" className={ classes.title } color="inherit">
                        <img src="/apple-icon.png" alt="commerce.js" height="25px" className={ classes.image } /> BRO-CART
                    </Typography>

                    { adminstate ? ( <div className={ classes.button }>
                        <IconButton aria-label="Show cart items" color="inherit">
                            <LogoutIcon style={ { color: "#63efe8" } } onClick={ handleLogout } />
                        </IconButton>
                    </div> ) : null }
                </Toolbar>
            </AppBar>
            { renderMobileMenu }
        </div>
    );
};

export default AdminBar;