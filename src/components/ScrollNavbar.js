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
      className={`fixed top-0 left-0 w-full z-20 shadow-md transition-all duration-300 ${
        showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      } bg-white`}
      style={{ pointerEvents: showNavbar ? 'auto' : 'none' }}
    >
      <nav className="flex justify-between items-center px-4 py-3 md:px-8 md:py-4">
        <Link to="/" className="flex items-center group">
          <img src={logo} alt="INESC TEC" className="h-6 md:h-10 w-auto" />
          <span className="hidden md:block ml-3 text-dark-blue-2 font-bold text-xl group-hover:text-light-blue-2 transition-colors">
            OSS
          </span>
        </Link>

        <ul className="flex items-center space-x-2 md:space-x-6 text-dark-blue-2 font-semibold">
          <li>
            <button
              onClick={() => handleLinkClick('/')}
              className={`px-2 py-1.5 md:px-3 md:py-2 text-sm md:text-base rounded-lg transition-all duration-200 ${
                location.pathname === '/'
                  ? 'bg-dark-blue-2 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleLinkClick('/projects')}
              className={`px-2 py-1.5 md:px-3 md:py-2 text-sm md:text-base rounded-lg transition-all duration-200 ${
                location.pathname === '/projects'
                  ? 'bg-dark-blue-2 text-white'
                  : 'hover:bg-gray-100'
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
