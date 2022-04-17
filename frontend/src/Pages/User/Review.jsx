import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';


const Hr = styled.hr`
background-color: #3861d7;
border: none;
margin-top: 12px;
margin-bottom: 12px;
height: 2px;
`;

toast.configure();

export default function Review ( { iid } )
{

  const [ cartdatas, setcartdatas ] = React.useState( [] );
  const [ count, setcount ] = React.useState( 0 );
  const [ addressselected, setaddressselected ] = React.useState();
  const navigate = useNavigate();
  React.useEffect( () =>
  {
    const usertoken = localStorage.getItem( "usertoken" );
    if ( !usertoken )
    {
      navigate( "/login" );
    }
    getcartdata();
    getAddress();
  }, [] );

  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }


  const getcartdata = async () =>
  {

    try
    {

      const id = localStorage.getItem( "userId" );
      const url = "http://localhost:8714/api/users/fetchcartdata/" + id;
      const { data: res } = await axios.get( url );
      const createdmessage = res.message;
      const { cartuser } = res.data;
      const number = cartuser.length;
      setcount( number );
      setcartdatas( cartuser );

    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );
      }

    } finally
    {
      console.log( "completed" )
    }
  };


  const getAddress = async () =>
  {

    try
    {
      const url = "http://localhost:8714/api/users/fetchaddressdata/" + iid;
      const { data: res } = await axios.get( url );
      const createdmessage = res.message;
      const { gotaddress } = res.data;
      setaddressselected( gotaddress );

    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );
      }

    } finally
    {
      console.log( "completed" )
    }
  };
  const grandTotal = localStorage.getItem( "grandtotal" );
  return (

    <React.Fragment >

      <List disablePadding>
        <Typography color="secondary" variant="h5" gutterBottom sx={ { mt: 2 } }>
          Order summary
        </Typography>


        { cartdatas.map( ( cartdata, index ) => (

          <ListItem sx={ { py: 1, px: 0 } }>
            <b>{ `${ index + 1 }.ProductId:` }</b><ListItemText secondary={ cartdata.productId } />
            <b>MRP:</b><ListItemText secondary={ `₹ ${ cartdata.mrp }` } />
            <Typography variant="body2"><b>Total: </b>{ `₹ ${ cartdata.proTotal }` }</Typography>
          </ListItem>

        ) ) }


        <Hr />
        <ListItem sx={ { py: 1, px: 0, fontSize: "25px" } }>
          <ListItemText ><b>Grand Total</b></ListItemText>
          <Typography variant="subtitle1" sx={ { fontWeight: 900, color: 'green', fontSize: "20px" } }>
            ₹ { grandTotal }
          </Typography>
        </ListItem>


      </List>
      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 6 }>
          <Typography color="secondary" variant="h5" gutterBottom sx={ { mt: 2 } }>
            Shipping To,
          </Typography>
          { addressselected && ( <><Typography gutterBottom>{ `${ addressselected.firstName } ${ addressselected.lastName }` }</Typography>
            <Typography gutterBottom>{ `${ addressselected.address1 } , ${ addressselected.address2 }` }</Typography>
            <Typography gutterBottom>{ `${ addressselected.city } , ${ addressselected.state }` }</Typography>
            <Typography gutterBottom>{ `Mob:${ addressselected.mobilenumber } ,Pincode: ${ addressselected.pincode }` }</Typography>
          </>
          ) }

        </Grid>
      </Grid>
    </React.Fragment>
  );
}