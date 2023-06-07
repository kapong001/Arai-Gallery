import React from "react";
import Layout from "../components/Layout";
import Contact from "../assets/Contact.jpg"
const SocialPage = () => {
    return (
        <Layout>
            <div className="contactcontainer">
                <div className="contactcard">
                    <div className="left">
                        <img src={Contact} alt="Contact" />
                    </div>
                    <div className="right text-center'">
                        <h4>social</h4>
                        <div className="contact">
                            <div className="address">
                                <div className="email">
                                    <p>
                                        IG: <a href="https://www.instagram.com/MXSSRW">MXSSRW</a>
                                        <br />
                                        LINE: 3422
                                    </p>
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

export default SocialPage;