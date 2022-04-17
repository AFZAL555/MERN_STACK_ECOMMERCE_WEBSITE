import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './design.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';



const SideBar = () =>
{
    return (
        <Fragment>

            <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                        <li>
                            <Link to="/adminhome"><DashboardIcon /> Dashboard </Link>
                        </li>
                        <li>
                            <Link to="/categorymanagment"><CategoryIcon /> Category </Link>
                        </li>

                        <li>
                            <Link to="/productmanagment" className="dropdown-toggle"><DevicesOtherIcon /> Products</Link>
                        </li>

                        <li>
                            <Link to="/orders"><ShoppingCartIcon /> Orders</Link>
                        </li>

                        <li>
                            <Link to="/users"><GroupIcon /> Users</Link>
                        </li>
                        <li>
                            <Link to="/categoryoffer"><CategoryIcon /> Category Offer </Link>
                        </li>
                        <li>
                            <Link to="/productoffer"><DevicesOtherIcon /> Product Offer  </Link>
                        </li>
                        <li>
                            <Link to="/coupons"><DashboardIcon /> Coupons </Link>
                        </li>
                        <li>
                            <Link to="/salesreport"><DevicesOtherIcon />Sales Report </Link>
                        </li>

                    </ul>
                </nav>
            </div>

        </Fragment>
    )
}

export default SideBar
