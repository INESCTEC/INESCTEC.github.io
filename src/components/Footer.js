import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { MarkGithubIcon } from '@primer/octicons-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-dark-blue to-light-blue text-white py-6 font-mono">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-8 text-sm">
          <a
            href="https://github.com/INESCTEC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-200 transition-colors"
          >
            <MarkGithubIcon size={18} />
            <span>GitHub</span>
          </a>
          <a
            href="mailto:oss@inesctec.pt"
            className="flex items-center gap-2 hover:text-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Contact us</span>
          </a>
          <a
            href="https://github.com/INESCTEC/.github/blob/main/documents/code_of_conduct.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-colors"
          >
            Code of Conduct
          </a>
        </div>
        <div className="mt-4 md:mt-0 text-center md:text-right text-sm opacity-80">
          {new Date().getFullYear()} INESC TEC
        </div>
      </div>
    </footer>
  );
};

export default Footer;
