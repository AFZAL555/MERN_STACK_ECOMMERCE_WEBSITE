import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../component/User/Layout/Footer'
import PrimarySearchAppBar from '../../component/User/Layout/NavBar'

const SuccessPage = () => {
  return (
    <div>
         <PrimarySearchAppBar />
         <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
        <h5 style={{marginBottom: "30px"}}> Order has been created successfully. Your order is placed.</h5>

        <div>
          <Link to="/">
            {" "}
            <button
              className="btn  btn-lg  mt-5"
              style={{ backgroundColor: "teal", color: "white" }}
              type="button"
            >
              Go to Homepage
            </button>
          </Link>

          <Link to="/profile">
            {" "}
            <button
              className="btn  btn-lg  mt-5"
              style={{ backgroundColor: " green", color: "white" }}
              type="button"
            >
              View orders
            </button>
          </Link>
        </div>
      </div>

         <div style={{marginTop:"76vh" }}> <Footer /></div>
    </div>
  )
}

export default SuccessPage