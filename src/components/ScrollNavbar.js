import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import logo from '../assets/INESCTEC_logotipo_color_rgb.png';

const ScrollNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 50); 
    };

    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]); 

  const handleLinkClick = (targetPath) => {
    navigate(targetPath);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-20 shadow-md transition-opacity duration-300 ${
        showNavbar ? 'opacity-100' : 'opacity-0'
      } bg-white navbar-large`}
    >
      <nav className="flex justify-between items-center p-8">
        <div className="flex items-end">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 w-auto md:h-10 w-auto" />
          </Link>
          <span className="hidden md:block ml-3 text-dark-blue-2 font-bold text-xl self-end">OSS</span>
        </div>
        
        <ul className="flex items-center space-x-4 text-dark-blue-2 font-semibold text-lg">
          <li>
            <button
              onClick={() => handleLinkClick('/')} 
              className={`pb-2 ${
                location.pathname === '/' ? 'border-b-2 border-light-blue-2' : ''
              }`}
            >
              Home
            </button>
          </li>
          <span className="text-dark-blue-2">|</span>
          <li>
            <button
              onClick={() => handleLinkClick('/projects')} 
              className={`pb-2 ${
                location.pathname === '/projects' ? 'border-b-2 border-dark-blue-2' : ''
              }`}
            >
              Projects
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ScrollNavbar;
