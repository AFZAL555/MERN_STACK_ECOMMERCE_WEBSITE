import React from 'react'
import AdminHome from '../Pages/Admin/AdminHome'
import Footer from './User/Layout/Footer'

const Loding = () =>
{
    return (
        <div>
            <section >
                <div className='row' id="rowseen">
                    <div className='col-lg-5 col-md-12 col-12' style={ { minWidth: "24%" } }>
                        <AdminHome />
                    </div>
                    <div className='col-lg-5 col-md-12 col-12' style={ { background: "white", marginTop: "-560px", width: "92%", marginLeft: '152px' } }>
                        <div className="page-wrapper bg-gra-01  font-poppins" style={ { background: "white" } }  >
                            <div className="loader"></div>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </div>
    )
}

export default Loding