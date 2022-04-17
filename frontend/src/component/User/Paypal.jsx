import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";


toast.configure();

const Paypal = ( { GrandTotal } ) =>
{
    const paypal = useRef();
    const navigate = useNavigate();



    const notification = ( m ) => { toast.success( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }
    const notification2 = ( m ) => { toast.error( ' ' + m, { theme: "dark", position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, } ); }



    useEffect( () =>
    {
        const placeorder = async () =>
        {
            try
            {
                const userid = localStorage.getItem( 'userId' )
                const iid = localStorage.getItem( 'aii' );
                const GrandTotal = localStorage.getItem( 'grandtotal' )
                const paymentoption = 'PayPal';
                const data = {
                    userid,
                    iid,
                    GrandTotal,
                    paymentoption,
                }
                const url = "http://localhost:8714/api/users/neworderPaypal";
                const { data: res } = await axios.post( url, data );
                const createdmessage = res.message;
                navigate( '/Successorder' );
                localStorage.removeItem( 'aii' );
                localStorage.removeItem( 'grandtotal' )
                const notify = notification( createdmessage );

            } catch ( error )
            {
                if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
                {
                    const errornotify = notification2( error.response.data.message );

                }
            } finally
            {
                console.log( "Order Placing completed" )
            }

        };
        window.paypal.Buttons( {
            createOrder: ( data, actions, err ) =>
            {
                return actions.order.create( {
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Thank You For Shopping From BRO-CART.",
                            amount: {
                                currency_code: "USD",
                                value: GrandTotal,
                            },

                        },
                    ],
                } );
            },
            onApprove: async ( data, actions ) =>
            {
                const order = await actions.order.capture();

                const payid = order.id;
                const paystatus = order.status;
                const paymentid = localStorage.setItem( 'paymentid', payid );
                const paymentstatus = localStorage.setItem( 'paymentstatus', paystatus );
                placeorder();


            },
            onCancel: async ( data ) =>
            {
                navigate( '/cart' );
                const errornotify = notification2( "Payment Cancelled ..." );
            },

            onError: ( err ) =>
            {

                navigate( "/cart" );
            },
            style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'pill',
                label: 'pay'
            }
        } )
            .render( paypal.current );

    }, [ GrandTotal ] );

    return (
        <div>

            <div ref={ paypal }></div>
        </div>
    )
}
export default Paypal