import React from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'; 
import logo from '../assets/INESCTEC_teste2.png';
import Footer from '../components/Footer'; 
import image from '../assets/INESCTEC_circuito_Set2024-03-cropped.svg';

const HomePage = () => {
  return (
    <div className="font-mono">
      <Element name="top" className="min-h-screen">
        <main className="flex items-center justify-center bg-gradient-to-r from-dark-blue to-light-blue min-h-screen text-white">
          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl p-8">
            <div className="flex flex-col items-center md:items-start md:mr-8">
              <img src={logo} alt="INESC TEC" className="h-14" />
              <h2 className="text-2xl md:text-3xl mt-4">Open Source Software</h2>
            </div>
            <div className="flex flex-col items-center mt-6 md:items-start md:mt-0">
              <ScrollLink
                to="vision"
                smooth={true}
                duration={500}
                className="text-xl mb-4 md:text-2xl hover:underline md:mb-6 cursor-pointer"
              >
                {'>'} Our Vision
              </ScrollLink>
              <RouterLink
                to="/projects"
                className="text-xl md:text-2xl hover:underline cursor-pointer"
              >
                {'>'} Our Projects
              </RouterLink>
            </div>
          </div>
        </main>
      </Element>
      <Element name="vision" className="min-h-screen bg-white font-mono flex">
        <div className="w-full md:w-5/6 p-8 text-left mx-4 md:mx-20">  
          <h1 className="text-4xl mt-6 mb-4 reverse-gradient-text font-bold flex items-center justify-between">
            <span>Open Source</span>
            <ScrollLink to="top" smooth={true} duration={500} className="text-dark-blue-2 cursor-pointer" style={{ marginTop: '5px' }}>
              <FontAwesomeIcon icon={faChevronUp} width={30} />
            </ScrollLink>
          </h1>
          <hr className="border-0 h-1 bg-gradient-to-r from-dark-blue to-light-blue mb-8" />
          <div className="space-y-12 text-black mt-20">
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Our Vision</h2>
              <p className="text-xl mb-16">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus luctus enim sed semper. Aliquam pellentesque sem in gravida aliquet.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Where to start?</h2>
              <p className="text-xl mb-16">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus luctus enim sed semper. Aliquam pellentesque sem in gravida aliquet.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Contacts</h2>
              <p className="text-xl mb-16">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus luctus enim sed semper. Aliquam pellentesque sem in gravida aliquet.
              </p>
            </section>
          </div>
        </div>
        <div className="hidden md:block w-1/6 relative">  
          <img src={image} alt="Description" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </Element>
      <Footer />
    </div>
  );
};

export default HomePage;
