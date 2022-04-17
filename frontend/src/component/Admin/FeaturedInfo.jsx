import React from 'react';
import { useState, useEffect } from "react";
import './design.css';
import axios from "axios";

const FeaturedInfo = () =>
{

    const [ income, setIncome ] = useState( [] );
    const [ length, setLength ] = useState( 0 );
    const [ orders, setOrders ] = useState( 0 );

    useEffect( () =>
    {
        getIncome();
        gettotalorder();
    }, [] );

    const getIncome = async () =>
    {
        try
        {
            console.log( "Fetching admin income....... started....!" )
            const url = "http://localhost:8714/api/admin/fechincome";
            const { data: res } = await axios.get( url );
            const createdmessage = res.message;
            const { adminincomes } = res.data;
            setIncome( adminincomes );
            setLength( adminincomes.length );

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message )
            }
        } finally
        {
            console.log( 'done' )
        }
    };

    const gettotalorder = async () =>
    {
        try
        {

            const url = "http://localhost:8714/api/admin/totalorder";
            const { data: res } = await axios.get( url );
            const createdmessage = res.message;
            const { totalorders } = res.data;
            setOrders( totalorders );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.log( error.response.data.message )
            }
        } finally
        {
            console.log( 'done' )
        }
    };


    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">
                        ₹{ ( income.length > 1 ) ? ( ( ( ( income[ 1 ]?.total ) * 40 ) / 100 ) - ( orders * 40 ) ) : ( ( ( ( income[ 0 ]?.total ) * 40 ) / 100 ) - ( orders * 40 ) ) }
                    </span>

                </div>
                <span className="featuredSub">This month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">
                        ₹{ ( income[ length - 1 ]?.total ) }
                    </span>
                </div>
                <span className="featuredSub">This month sales</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Shipping Charge</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">₹{ orders * 40 }</span>
                </div>
                <span className="featuredSub">Total charge till Now</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Orders</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{ orders }</span>
                </div>
                <span className="featuredSub">Total orders till now</span>
            </div>
        </div>
    )
}

export default FeaturedInfo