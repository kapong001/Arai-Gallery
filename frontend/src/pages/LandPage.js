import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LandingPic from "../assets/LandingPic.jpg";
import CategoryLeft from "../assets/CategoryLeft.png";
import CategoryRight from "../assets/CategoryRight.png";
import LandingPic2 from "../assets/LandingPic2.jpg";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const LandPage = () => {
  const categoryData = {
    _id: "64745455f96c79ce1648ffd1",
    name: "EPL",
    slug: "epl",
    __v: 0
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        selectedItem={currentSlide}
        onChange={setCurrentSlide}
        infiniteLoop
        autoPlay
        interval={5000}
        stopOnHover={false}
      >
        <div className="landing-pic-container">
          <Link to="/collection">
            <img src={LandingPic} alt="LandingPic" />
          </Link>
        </div>

        <div className="landing-pic-container">
          <Link to="/collection">
            <img src={LandingPic2} alt="LandingPic" />
          </Link>
        </div>
      </Carousel>
      <Link to="/collection" className="landing-pic-text">
        COLLECTION
      </Link>
      <div className="dual-image-container" key={categoryData._id}>
        <Link to="/usercollection">
          <img
            className="left-image"
            src={CategoryLeft}
            alt="Left"
            onClick={scrollToTop}
          />
        </Link>
        <Link to={`/category/${categoryData.slug}`}>
          <img
            className="right-image"
            src={CategoryRight}
            alt="Right"
            onClick={scrollToTop}
          />
        </Link>
      </div>
    </Layout>
  );
};

export default LandPage;
