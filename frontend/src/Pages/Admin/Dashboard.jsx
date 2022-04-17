import React, { useEffect, useMemo, useState } from 'react';
import AdminHome from './AdminHome';
import Footer from '../../component/User/Layout/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import '../../component/Admin/design.css';
import FeaturedInfo from '../../component/Admin/FeaturedInfo'
import Chart from '../../component/Admin/Chart'
import WidgetSm from '../../component/Admin/WidgetSm'
import WidgetLg from '../../component/Admin/WidgetLg'
import Loding from '../../component/Loding';
import axios from "axios";

const Dashboard = () =>
{
    const navigate = useNavigate();
    const MONTHS = useMemo( () => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ], [] );
    const [ loading, setLoading ] = useState( false );
    const [ userStatics, setUserStatics ] = useState( [] );
    useEffect( () =>
    {
        const admintoken = localStorage.getItem( "adminToken" );
        if ( !admintoken )
        {
            navigate( "/adminlogin" );
        }
        userstatices();

    }, [ MONTHS ] );






    const userstatices = async () =>
    {
        try
        {

            setLoading( true );
            const url = "http://localhost:8714/api/admin/userstatics";
            const { data: res } = await axios.get( url );

            const createdmessage = res.message;
            const { userstaticss } = res.data;

            userstaticss.map( ( item ) =>
                setUserStatics( ( prev ) =>
                    [ ...prev, { firstName: MONTHS[ item._id - 1 ], "Active User": item.total }, ] ) );

        } catch ( error )
        {
            if ( error.response && error.response.status >= 400 && error.response.status <= 500 )
            {
                console.table( error.response.data.message )

            }
        } finally
        {
            setLoading( false );
        }
    };

    if ( loading )
    {
        return (
            <>
                <Loding />
            </>
        )
    };



    return (
        <div>
            <section >
                <div className='row' id="rowseen">
                    <div className='col-lg-5 col-md-12 col-12' style={ { minWidth: "24%", } }>
                        <AdminHome />
                    </div>
                    <div className='col-lg-5 col-md-12 col-12' style={ { background: "navy", marginTop: "-560px", width: "92%", marginLeft: '152px' } }>
                        <div className="page-wrapper bg-gra-01  font-poppins" style={ { background: "WHITE", minHeight: "143vh" } }>
                            <div className="wrapper wrapper--w780" style={ { marginLeft: '0px' } }>
                                <h1></h1><br /><br />

                                <div className="home">
                                    <FeaturedInfo />
                                    <Chart
                                        data={ userStatics }
                                        title="User Analytics"
                                        grid
                                        dataKey="Active User"
                                    />
                                    <div className="homeWidgets">

                                        <WidgetLg />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </div >
    )
}

export default Dashboard
