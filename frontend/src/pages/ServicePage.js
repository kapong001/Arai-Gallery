import React from "react";
import Layout from "../components/Layout";
import Contact from '../assets/Contact.jpg'
const ServicePage = () =>{
    return(
        <Layout>
            <div className="contactcontainer">
                <div className="contactcard">
                    <div className="left">
                        <img src={Contact} alt="Contact" />
                    </div>
                    <div className="right text-center'">
                        <h4>Term</h4>
                        <div className="contact">
                            <div className="address">
                                <div className="email">
                                    <h6>request</h6>
                                    <p>เสื้อต้องพรีเมี่ยมจริง แอดมินถึงจะรับ</p>
                                </div>
                                <div className="location">
                                    <h6>Based in</h6>
                                    <p>MAE YA, chiang mai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ServicePage;