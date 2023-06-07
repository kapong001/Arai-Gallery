import React from "react";
import Layout from "../components/Layout";
import Contact from '../assets/Contact.jpg';
const ContactPage = () => {
    return (
        <Layout>
            <div className="contactcontainer">
                <div className="contactcard">
                    <div className="left">
                        <img src={Contact} alt="Contact" />
                    </div>
                    <div className="right text-center'">
                        <h3>Contact Us</h3>
                        <div className="contact">
                            <div className="address">
                                <div className="email">
                                    <h4>Contact</h4>
                                    <p>ARAI@ARAI.COM</p>
                                </div>
                                <div className="location">
                                    <h4>Based in</h4>
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

export default ContactPage;
