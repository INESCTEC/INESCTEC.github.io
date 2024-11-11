import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/INESCTEC_logotipo_monocrom_white.png';

const ScrollNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-20 shadow-md transition-opacity duration-300 ${
        showNavbar ? 'opacity-100' : 'opacity-0'
      } navbar-gradient navbar-large`}
    >
      <nav className="flex justify-between items-center p-8">
        <div className="flex items-end">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 w-auto md:h-10 w-auto" />
          </Link>
          <span className="hidden md:block ml-3 text-white text-xl self-end">Open Source Software</span>
        </div>
        
        <ul className="flex items-center space-x-4 text-white text-lg">
          <li>
            <Link
              to="/"
              className={`pb-2 ${
                location.pathname === '/' ? 'border-b-2 border-white' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <span className="text-white">|</span>
          <li>
            <Link
              to="/projects"
              className={` ${
                location.pathname === '/projects' ? 'border-b-2 border-white' : ''
              }`}
            >
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ScrollNavbar;
