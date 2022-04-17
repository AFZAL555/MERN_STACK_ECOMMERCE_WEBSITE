import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { Rating } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



toast.configure();



export default function StarRating ( { id } )
{
  const [ value, setValue ] = useState( 0 );
  const userid = localStorage.getItem( "userId" );


  const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
  const notification2 = ( m ) => { toast.warning( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }



  useEffect( () =>
  {
    if ( value != 0 )
    {
      ratingupdating();
    }

  }, [ value ] )


  const ratingupdating = async () =>
  {
    try
    {

      const url = "http://localhost:8714/api/users/addrating";
      const { data: res } = await axios.post( url, { useriid, value, id } );

      const notify = notification( res.message );


    } catch ( error )
    {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
      {
        const errornotify = notification2( error.response.data.message );

      }
    } finally
    {

      console.log( "Rating adding processs done!." )
    }
  };


  return (
    <div>
      <Box align="left" component="fieldset" mb={ 3 } borderColor="transparent">
        <Rating
          value={ value }
          name="rating"
          onChange={ ( event, newValue ) =>
          {
            setValue( newValue );
          } }

        />
      </Box>
    </div>
  )
}