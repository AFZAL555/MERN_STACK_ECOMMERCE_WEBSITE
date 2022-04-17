import React, { useEffect } from 'react';
import HeroSection from '../../component/User/Layout/HeroSection.jsx';
import PrimarySearchAppBar from '../../component/User/Layout/NavBar.jsx';
import Footer from '../../component/User/Layout/Footer'
import Slider from '../../component/User/Layout/Slider.jsx';
import Categories from '../../component/User/Layout/Categories.jsx';
import Products from '../../component/User/Layout/Products.jsx';
import Marque from '../../component/User/Layout/Marque.jsx'
import { useNavigate } from 'react-router-dom';

function Homepage ()
{
    const navigate = useNavigate();

    useEffect( () =>
    {
        const usertoken = localStorage.getItem( "usertoken" );
        if ( !usertoken )
        {
            navigate( "/login" );
        }

    }, [] );


    return (
        <div >

            <PrimarySearchAppBar />
            <HeroSection />
            <Marque />
            <Slider />
            <Categories />
            <center><h1>..Featured..</h1></center>
            <Products />
            <Slider />
            <Footer />

        </div>
    );

}

export default Homepage;
