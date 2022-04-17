import "./WidgetLg.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const WidgetLg = () =>
{

    const [ transactions, setTransactions ] = useState( [] );

    useEffect( () =>
    {
        getlatestorder();
    }, [] );



    const getlatestorder = async () =>
    {
        try
        {

            const url = "http://localhost:8714/api/admin/getlatestorder";
            const { data: res } = await axios.get( url );
            const createdmessage = res.message;
            const { getlatestorders } = res.data;
            setTransactions( getlatestorders );


        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.table( error.response.data.message )
            }
        } finally
        {
            console.log( 'done' );
        }
    };
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">

                    <th className="widgetLgTh">Order Id:</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Method</th>
                </tr>

                { transactions.length > 0 &&
                    transactions.map( ( transc, index ) => (
                        <tr className="widgetLgTr" key={ index }>

                            <td className="widgetLgUser">
                                <span className="widgetLgName">{ transc._id }</span>
                            </td>
                            <td className="widgetLgDate">
                                { new Date( transc.createdAt ).toDateString() }
                            </td>
                            <td className="widgetLgAmount">{ transc.grandtotal }</td>
                            <td className="widgetLgAmount">{ transc.paymentmethod }</td>
                        </tr>
                    ) ) }
            </table>
        </div>
    );
}

export default WidgetLg