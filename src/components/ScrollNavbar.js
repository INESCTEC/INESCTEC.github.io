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
      <nav className="flex justify-between items-center px-6 py-4 md:px-8">
        <Link to="/" className="flex items-end group">
          <img src={logo} alt="INESC TEC" className="h-8 md:h-10 w-auto" />
          <span className="hidden md:block ml-3 text-dark-blue-2 font-bold text-xl self-end group-hover:text-light-blue-2 transition-colors">
            OSS
          </span>
        </Link>

        <ul className="flex items-center space-x-6 text-dark-blue-2 font-semibold">
          <li>
            <button
              onClick={() => handleLinkClick('/')}
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
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
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
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
