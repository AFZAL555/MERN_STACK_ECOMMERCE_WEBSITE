import React, { useEffect, useState } from 'react'
import axios from "axios";
const Marque = () =>
{
    const [ coupondata, setcoupondata ] = useState( [] )
    useEffect( () =>
    {
        getcoupondata();
    }, [] );

    const getcoupondata = async () =>
    {
        try
        {
            const url = "http://localhost:8714/api/users/coupondata";
            const { data: res } = await axios.get( url );
            const { coupons } = res.data;
            setcoupondata( coupons );
        } catch ( error )
        {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            )
            {
                console.log( error.message )

            }
        }
    }
    return (
        <div>

            { coupondata && ( <marquee direction="left"
                style={ { color: "red", } }>
                { coupondata.map( ( coupon ) => <p>.....Coupon For Redeem:"{ coupon.code }"....</p> ) }
            </marquee>
            ) }


        </div>
    )
}

export default Marque