import React from 'react'
import './error.css'

const ErrorPage = () => {
    return (
        <div className="errorpage">
            <section className="page_404">
                <div>
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "61vh",
                            width: "100%",
                        }}
                    >
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center ">404</h1>
                                </div>

                                <div className="contant_box_404">
                                    <h3 className="h2">Look like you're lost</h3>
                                    <p>Page Not Found: BRO-CART 404 Error Pages</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ErrorPage