import React, { useEffect, useState } from 'react'
import { Avatar, Button, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Fingerprint } from '@material-ui/icons';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";

toast.configure();
const useStyle = makeStyles({
  error: {
    fontSize: 12,
    color: '#ff0000',
    lineHeight: 0,
    marginTop: 10,
    fontWeight: 600
  }
});

const Profile = () => {
  const classes = useStyle();


  const [editordata, seteditordata] = useState(false);

  const [userdatas, setuserdatas] = useState();

  const [mob, setmob] = useState('');
  const [Mobcheck, setMobcheck] = useState(true);

  const [fn, setfn] = useState('');
  const [fncheck, setfncheck] = useState(true);

  const [ln, setln] = useState('');
  const [lncheck, setlncheck] = useState(true);

  const [usn, setusn] = useState('');
  const [usncheck, setusncheck] = useState(true);

  const [email, setemail] = useState('');
  const [emailcheck, setemailcheck] = useState(true);

  const [isCopied, setIsCopied] = useState(false);

  const navigate = useNavigate();


  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    mobileNumber: "",
  });
 
  useEffect(() => {
    const usertoken = localStorage.getItem("usertoken");
		if (!usertoken) {
      navigate("/login");
    }
    getuserdata();
    seteditordata(false)
    }, []);

  useEffect(() => {
    setMobcheck(false);
  }, [mob]);

  useEffect(() => {
    setfncheck(false);
  }, [fn]);

  useEffect(() => {
    setlncheck(false);
  }, [ln]);

  useEffect(() => {
    setusncheck(false);
  }, [usn]);

  useEffect(() => {
    setemailcheck(false);
  }, [email]);


  // toast notification
  const notification = (m) => { toast.success(' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, }); }
  const notification2 = (m) => { toast.warning(' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, }); }


  const getuserdata = async () => {
    try {
      
      const id = localStorage.getItem("userId")
      const url = "http://localhost:8714/api/users/getprofiledata/" + id;
      const { data: res } = await axios.get(url);
      const { userdata } = res.data;
      const message = res.messge;
      setuserdatas(userdata);
     } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
       const errornotify = notification2(error.response.data.message);
      }
    }

  }
  const handlevalidationmob = (e) => {

    let value = e.target.value;
    if (value === '') {
      setMobcheck(true);

    }
    else if (value.length > 10) {
      setMobcheck(true);

    }
    else if (value.length < 10) {
      setMobcheck(true);

    }
    else if (value === " ") {
      setMobcheck(true);

    } else if (isNaN(value)) {
      setMobcheck(true);

    } else {
      setmob({ ...mob, value });
      setMobcheck(false);
      setData({ ...data, [e.target.name]: value });

    }

  }
  const handlevalidationfn = (e) => {

    const value1 = e.target.value;
    const re = /^[A-Za-z ]+$/
    if (value1 === '') {
      setfncheck(true)
    } else if (!re.test(value1)) {
      setfncheck(true)
    } else if (value1.length > 10) {
      setfncheck(true)
    }
    else if (value1 === " ") {
      setfncheck(true)
    } else {
      setfn({ ...fn, value1 });
      setfncheck(false);
      setData({ ...data, [e.target.name]: value1 });
    }

  }

  const handlevalidationemail = (e) => {
    const value2 = e.target.value;
    const atposition = value2.indexOf("@");
    const dotposition = value2.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= value2.length) {
      setemailcheck(true);
    }
    else if (value2 === '') {
      setemailcheck(true);
    }
    else if (value2 === " ") {
      setemailcheck(true)
    }
    else {
      setemail({ ...email, value2 });
      setemailcheck(false);
      setData({ ...data, [e.target.name]: value2 });
    }
  }
  const handlevalidationln = (e) => {
    const value4 = e.target.value;
    const re = /^[A-Za-z ]+$/
    if (value4 === '') {
      setlncheck(true)
    } else if (!re.test(value4)) {
      setlncheck(true)
    } else if (value4.length > 10) {
      setlncheck(true)
    }
    else if (value4 === " ") {
      setlncheck(true)
    } else {
      setln({ ...ln, value4 });
      setlncheck(false);
      setData({ ...data, [e.target.name]: value4 });
    }

  }
  const handlevalidationusn = (e) => {
    const value3 = e.target.value;
    if (value3 === '') {
      setusncheck(true)
    }
    else if (value3.length > 6) {
      setusncheck(true)
    }
    else if (value3 === " ") {
      setusncheck(true)
    } else {
      setusn({ ...usn, value3 });
      setusncheck(false);
      setData({ ...data, [e.target.name]: value3 });
    }

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fncheck && !lncheck && !usncheck && !Mobcheck && !emailcheck && (mob != '') && (fn != '') && (ln != '') && (usn != '') && (email != '')) {
      try {
        const id = localStorage.getItem("userId");
        const url = "http://localhost:8714/api/users/edituserdata/" + id;
        const { data: res } = await axios.post(url, data);
        const createdmessage = res.message;
        const notify = notification(createdmessage);
        seteditordata(false)

      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        const errornotify = notification2(error.response.data.message);
        }
      }
    } else {
      const errornotify23 = notification2("Please Fill Valid Data!");
    }
  };
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };



  return (
    <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins" style={{ paddingTop: "36px" }}>
      <center>
        <div className="wrapper wrapper--w780" style={{ margin: "110px" }}>
          <div className="card card-3">
            <div className="card-body">

              <center><h2 className="title"><span>My profile</span></h2></center>


              <Avatar style={{ backgroundColor: "white", margin: "5px auto" }}>
                <IconButton aria-label="fingerprint" color="secondary">
                  <Fingerprint />
                </IconButton></Avatar><br />

              {editordata ? (<Grid container spacing={3} >
                <Grid item xs={12} sm={6}>
                  <TextField id="outlined-basic" onChange={(e) => { handlevalidationfn(e); }} name='firstName' variant="outlined" label='First Name' autoComplete="off" fullWidth />
                  {fncheck && <Typography className={classes.error}>Please enter valid First Name</Typography>}
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField id="outlined-basic" onChange={(e) => { handlevalidationln(e); }} name="lastName" label="Last name" fullWidth autoComplete="off" variant="outlined" />
                  {lncheck && <Typography className={classes.error}>Please enter valid last Name</Typography>}
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField id="outlined-basic" onChange={(e) => { handlevalidationusn(e); }} name="userName" label="UserName" fullWidth autoComplete="off" variant="outlined" />
                  {usncheck && <Typography className={classes.error}>Please enter valid username</Typography>}
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField id="outlined-basic" onChange={(e) => { handlevalidationmob(e); }} name="mobileNumber" label="Mobile Number" fullWidth autoComplete="off" variant="outlined" />
                  {Mobcheck && <Typography className={classes.error}>Please enter valid Mobile Number</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" onChange={(e) => { handlevalidationemail(e); }} name="email" label="Email" fullWidth autoComplete="off" variant="outlined" />
                  {emailcheck && <Typography className={classes.error}>Please enter valid Email</Typography>}
                </Grid>
                <center>
                  <div>

                    <Button onClick={handleSubmit} variant="contained" color="secondary" style={{ marginRight: 20 }} type='submit' >Save </Button>
                  </div>
                </center>
              </Grid>) :
                (<div >

                  {userdatas && (<Grid container spacing={3} >

                    <Grid item xs={12} sm={6}>
                      <TextField id="outlined-basic" disabled defaultValue={userdatas.firstName} name='firstName' variant="outlined" label='First Name' autoComplete="off" fullWidth />

                    </Grid>
                    <Grid item xs={12} sm={6} >
                      <TextField id="outlined-basic" disabled defaultValue={userdatas.lastName} name="lastName" label="Last name" fullWidth autoComplete="off" variant="outlined" />

                    </Grid>
                    <Grid item xs={12} sm={6} >
                      <TextField id="outlined-basic" disabled defaultValue={userdatas.userName} name="userName" label="UserName" fullWidth autoComplete="off" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                      <TextField id="outlined-basic" disabled defaultValue={userdatas.mobileNumber} name="mobileNumber" label="Mobile Number" fullWidth autoComplete="off" variant="outlined" />

                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="outlined-basic" disabled defaultValue={userdatas.email} name="email" label="Email" fullWidth autoComplete="off" variant="outlined" />
                    </Grid>
                    <center>
                      <div style={{ marginBottom: "15px" }}>
                        <Button onClick={() => { seteditordata(true) }} variant="contained" color="secondary" style={{ marginRight: 20 }} >Edit Profile </Button>

                      </div>


                    </center>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>

                      <TextField id="outlined-basic" disabled defaultValue={userdatas.referralcode} name="referralcode" label="Your Referralcode " fullWidth autoComplete="off" variant="outlined" />
                      <CopyToClipboard text={userdatas.referralcode} onCopy={onCopyText}>
                        <span style={{ color: "green" }}>{isCopied ? "Copied!" : <MdContentCopy style={{ color: 'white', width: '23px', height: "fit-content" }} />}</span>
                      </CopyToClipboard>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>

                      <TextField id="outlined-basic" disabled defaultValue={userdatas.wallet} name="wallet" label="Your Wallet  Amount !"  autoComplete="off" variant="outlined" />

                    </Grid>
                  </Grid>)}
                </div>)}
            </div>
          </div>
        </div>
      </center>
    </div>)
}

export default Profile