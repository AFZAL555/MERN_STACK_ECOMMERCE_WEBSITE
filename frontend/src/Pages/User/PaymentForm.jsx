import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function PaymentForm ()
{
  return (
    <React.Fragment>
      <Typography color="secondary" variant="h5" gutterBottom sx={ { mt: 2 } }>
        Payment Method
      </Typography>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } md={ 6 }>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              defaultValue="cod"
            >
              <FormControlLabel value="cod" control={ <Radio /> } label="Cash on delivery (COD) " />
              <FormControlLabel value="razorpay" control={ <Radio /> } label="RazorPay " />
              <FormControlLabel value="paypal" control={ <Radio /> } label="PayPal " />
            </RadioGroup>
          </FormControl>

        </Grid>
      </Grid>
    </React.Fragment>
  );
}