import React from "react";
import Layout from "../components/Layout";
import {Link} from "react-router-dom";
import LandingPic from "../assets/LandingPic.jpg";
import CategoryLeft from "../assets/CategoryLeft.png";
import CategoryRight from "../assets/CategoryRight.png";
import { useAuth } from "../context/auth";
const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

const LandPage = () =>{
    const [auth,setAuth]=useAuth()
    return(
        <Layout>
            {/* <div className='landing-pic-container'>
                <img src={LandingPic} alt="LandingPic" />
                <Link to='/collection' className="landing-pic-text">COLLECTION</Link>
            </div>

            <div className="dual-image-container">
                <Link to='/usercollection'><img className="left-image" src={CategoryLeft} alt="Left" onClick={scrollToTop}/></Link>
                <Link to='/collection/EPL'><img className="right-image" src={CategoryRight} alt="Right" onClick={scrollToTop}/></Link>
            </div> */}
            <pre>{JSON.stringify(auth, null, 4)}</pre>

        </Layout>
    );
};

export default LandPage;