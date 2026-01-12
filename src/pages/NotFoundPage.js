import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCode } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-dark-blue to-light-blue flex items-center justify-center font-mono">
      <div className="text-center text-white p-8">
        <div className="mb-8">
          <FontAwesomeIcon icon={faCode} className="text-8xl opacity-50" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">Page Not Found</h2>
        <p className="text-lg mb-8 opacity-80 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-dark-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Back to Home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-dark-blue transition-colors duration-200"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
