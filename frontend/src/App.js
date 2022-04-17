import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHome from './Pages/User/Homepage';
import Signup from './component/User/Signup';
import Login from './component/User/Login';
import Cart from './component/User/Cart.jsx';
import OneProduct from './Pages/User/OneProduct';
import ProductList from './Pages/User/ProductList';
import Dashboard from './Pages/Admin/Dashboard';
import ProductManagment from './Pages/Admin/ProductManagment';
import ProductAdding from './Pages/Admin/ProductAdding';
import OrderMangment from './Pages/Admin/OrderMangment';
import UsersList from './Pages/Admin/UsersList';
import CategoryManagment from './Pages/Admin/CategoryManagment';
import CategoryAdding from './Pages/Admin/CategoryAdding';
import CategoryEditing from './Pages/Admin/CategoryEditing';
import SubCategoryEditing from './Pages/Admin/SubCategoryEditing';
import ProductEditing from './Pages/Admin/ProductEditing';
import AdminLogin from './Pages/Admin/AdminLogin';
import Loding from './component/Loding';
import CheckOut from './Pages/User/CheckOut';
import OrderSummery from './Pages/User/OrderSummery';
import Payment from './Pages/User/Payment';
import UserProfile from './Pages/User/UserProfile';
import Categoryoffer from './Pages/Admin/Categoryoffer';
import Coupons from './Pages/Admin/Coupons';
import Productoffer from './Pages/Admin/Productoffer';
import Productofferadding from './Pages/Admin/Productofferadding';
import CategoryOfferAdding from './Pages/Admin/CategoryOfferAdding';
import Couponsadding from './Pages/Admin/Couponsadding';
import SalesReport from './Pages/Admin/SalesReport';
import ErrorPage from './Pages/Admin/ErrorPage';
import SuccessPage from './Pages/User/SuccessPage';




function App ()
{


  return (

    <Router>
      <Routes>


        {/* user route */ }
        <Route exact path='/' element={ <UserHome /> } />
        <Route exact path='/register' element={ <Signup /> } />
        <Route exact path='/login' element={ <Login /> } />
        <Route exact path='/cart' element={ <Cart /> } />
        <Route exact path='/oneproduct/:id' element={ <OneProduct /> } />
        <Route exact path='/productlist' element={ <ProductList /> } />
        <Route exact path='/checkout' element={ <CheckOut /> } />
        <Route exact path='/ordersummary' element={ <OrderSummery /> } />
        <Route exact path='/payment' element={ <Payment /> } />
        <Route exact path='/Successorder' element={ <SuccessPage /> } />
        <Route exact path='/profile' element={ <UserProfile /> } />


        {/* Error Page */ }
        <Route path="*" element={ <ErrorPage /> }></Route>


        {/* Admin Routes */ }
        <Route exact path='/adminlogin' element={ <AdminLogin /> } />
        <Route exact path='/adminhome' element={ <Dashboard /> } />
        <Route exact path='/productmanagment' element={ <ProductManagment /> } />
        <Route exact path='/productadding' element={ <ProductAdding /> } />
        <Route exact path='/orders' element={ <OrderMangment /> } />
        <Route exact path='/users' element={ <UsersList /> } />
        <Route exact path='/categorymanagment' element={ <CategoryManagment /> } />
        <Route exact path='/categoryadding' element={ <CategoryAdding /> } />
        <Route exact path='/editcategory/:id' element={ <CategoryEditing /> } />
        <Route exact path='/editsubcategory/:id' element={ <SubCategoryEditing /> } />
        <Route exact path='/editproduct/:id' element={ <ProductEditing /> } />
        <Route exact path='/categoryoffer' element={ <Categoryoffer /> } />
        <Route exact path='/CategoryOfferAdding' element={ <CategoryOfferAdding /> } />
        <Route exact path='/Coupons' element={ <Coupons /> } />
        <Route exact path='/Couponsadding' element={ <Couponsadding /> } />
        <Route exact path='/Productoffer' element={ <Productoffer /> } />
        <Route exact path='/Productofferadding' element={ <Productofferadding /> } />
        <Route exact path='/salesreport' element={ <SalesReport /> } />


      </Routes>
    </Router>


  );
}

export default App;
