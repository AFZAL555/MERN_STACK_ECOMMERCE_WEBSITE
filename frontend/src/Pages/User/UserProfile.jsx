import React, { useEffect, useState } from 'react'
import Footer from '../../component/User/Layout/Footer'
import PrimarySearchAppBar from '../../component/User/Layout/NavBar'
import Profile from '../../component/User/Profile';
import Address from '../../component/User/Address'
import { AppBar, Toolbar, Button } from '@material-ui/core';
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast } from 'react-toastify';
import useStyles from '../../component/User/usersidebar';
import Order from '../../component/User/Order';
import { useNavigate } from 'react-router-dom';

toast.configure();

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius:5px;
`;

const UserProfile = () => {

    const classes = useStyles();

    const [profile, setprofile] = useState(false)
    const [order, setorder] = useState(false)
    const [address, setaddress] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const usertoken = localStorage.getItem("usertoken");
		if (!usertoken) {
            navigate("/login");
        }
        setprofile(true);
        setorder(false);
        setaddress(false);
	  }, []); 


    return (
        <div >

            <PrimarySearchAppBar />
            <>
                <div >
                    <AppBar className={classes.appBar} color="inherit" style={{ marginTop: "66px", marginBottom: "10px", backgroundColor: "rgb(180 151 214)", display: "flex" }}>
                        <Toolbar style={{ display: "flex", justifyContent: "center" }}>

                            <div>
                                <Button onClick={() => { setprofile(true); setorder(false); setaddress(false) }} color="secondary" variant="contained" style={{ marginRight: 20 }} >Profile </Button>
                            </div>
                            <div>
                                <Button onClick={() => { setorder(true); setprofile(false); setaddress(false) }} color="secondary" variant="contained" style={{ marginRight: 20 }} >My Orders </Button>
                            </div>
                            <div>
                                <Button onClick={() => { setaddress(true); setprofile(false); setorder(false); }} color="secondary" variant="contained" style={{ marginRight: 20 }} >Address </Button>
                            </div>
                        </Toolbar>
                    </AppBar>

                </div>


            </>


            {profile && <Profile />}
            {address && <Address />}
            {order && <Order />}


        </div>
    )
}

export default UserProfile