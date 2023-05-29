import React from 'react';
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
const Footer = () => {
  return (
    <div className='footer bg-white text-light p-3 d-flex justify-content-center'>
      <p className='mt-3'>
        <Link to="/contact" className="footer-link" onClick={scrollToTop}>CONTACT</Link>
        <Link to="/services" className="footer-link" onClick={scrollToTop}>SERVICES</Link>
        <Link to="/social" className="footer-link" onClick={scrollToTop}>SOCIAL</Link>
      </p>
    </div>
  );
};

export default Footer;
