import React, { useEffect, useState } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'; 
import logo from '../assets/INESCTEC_logotipo_monocrom_white.png';
import Footer from '../components/Footer'; 
import image from '../assets/INESCTEC_circuito_Set2024-03-cropped.svg';
import AreaCard from '../components/AreaCard';

const HomePage = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/areas.json')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAreas(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error loading the data:', error);
        setAreas([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let isScrolling = false;

    const handleScroll = (event) => {
      if (isScrolling) return;

      isScrolling = true;

      setTimeout(() => {
        isScrolling = false;
      }, 800); 

      const scrollDirection = event.deltaY > 0 ? 'down' : 'up'; 
      const sections = document.querySelectorAll('.snap-section');
      let currentSectionIndex = 0;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - window.innerHeight / 2) {
          currentSectionIndex = index;
        }
      });

      let targetSectionIndex;

      if (scrollDirection === 'down') {
        targetSectionIndex = currentSectionIndex + 1;
        if (targetSectionIndex >= sections.length) {
          return;
        }
      }
      else {
        targetSectionIndex = currentSectionIndex - 1;
        if (targetSectionIndex < 0) {
          return;
        }
      }

      sections[targetSectionIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="font-mono">
      <Element name="top" className="min-h-screen snap-section">
        <main className="flex items-center justify-center bg-gradient-to-r from-dark-blue to-light-blue min-h-screen text-white">
          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl p-8">
            <div className="flex flex-col items-center md:items-start md:mr-8">
              <img src={logo} alt="INESC TEC" className="h-14 2xl:h-16" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl mt-4">Open Source Software</h2>
            </div>
            <div className="flex flex-col items-center mt-6 md:items-start md:mt-0 2xl:mt-2">
              <ScrollLink
                to="vision"
                smooth={true}
                duration={500}
                className="text-xl mb-4 md:text-2xl hover:underline md:mb-6 cursor-pointer 2xl:text-2xl"
              >
                {'>'} Our Vision
              </ScrollLink>
              <ScrollLink
                to="innovation-areas"
                smooth={true}
                duration={500}
                className="text-xl mb-4 md:text-2xl hover:underline md:mb-6 cursor-pointer 2xl:text-2xl"
              >
                {'>'} Innovation Areas
              </ScrollLink>
              <RouterLink
                to="/projects"
                className="text-xl md:text-2xl hover:underline cursor-pointer 2xl:text-2xl"
              >
                {'>'} Our Projects
              </RouterLink>
            </div>
          </div>
        </main>
      </Element>

      <Element name="vision" className="min-h-screen bg-white font-mono flex snap-section">
        <div className="w-full md:w-5/6 p-8 text-left mx-4 md:mx-20">
          <h1 className="text-4xl mt-6 mb-4 reverse-gradient-text font-bold flex items-center justify-between">
            <span>Open Source</span>
            <ScrollLink to="top" smooth={true} duration={500} className="text-dark-blue-2 cursor-pointer" style={{ marginTop: '5px' }}>
              <FontAwesomeIcon icon={faChevronUp} width={30} />
            </ScrollLink>
          </h1>
          <div className="h-[1px] bg-gradient-to-r from-dark-blue-2 to-light-blue mb-8"></div>
          <div className="space-y-12 text-black mt-20">
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Our Vision</h2>
              <p className="text-lg md:text-xl 3xl:text-2xl mb-16 text-justify">
                At INESC TEC, we believe in the power of open-source solutions to accelerate scientific innovation, enhance transparency, and foster collaboration within the research community. Our commitment is to develop and share technologies that advance global research efforts, empowering scientists and communities to collaborate, innovate, and drive meaningful progress.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Where to start?</h2>
              <p className="text-lg md:text-xl 3xl:text-2xl mb-16 text-justify">
                Whether you’re a researcher, developer, or enthusiast, you can access our tools, and collaborate with a diverse community of experts. Dive into our <a href='https://github.com/INESCTEC' className='text-dark-blue-2 hover:text-light-blue-2' rel="noreffer noreferrer" target='_blank'>Official Github</a> and start contributing to cutting-edge research today.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Contacts</h2>
              <p className="text-lg md:text-xl 3xl:text-2xl mb-16 text-justify">
                Whether you have questions, feedback, or partnership ideas, feel free to contact us at
                <a
                  href="mailto:oss@inesctec.pt"
                  className="text-dark-blue hover:underline hover:text-light-blue"
                >
                  {' '}oss@inesctec.pt
                </a>.
                We are open to collaboration and committed to fostering open science initiatives.
              </p>
            </section>
          </div>
        </div>
        <div className="hidden md:block w-1/6 relative">
          <img src={image} alt="Description" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </Element>

      <div className="w-full h-[1px] bg-gradient-to-r from-dark-blue-2 to-light-blue py-0.5"></div>

      <Element name="innovation-areas" className="min-h-screen bg-white font-mono flex snap-section">
        <div className="w-full md:w-5/6 p-8 text-left mx-4 md:mx-20">
          <h1 className="text-4xl mt-6 mb-4 reverse-gradient-text font-bold flex items-center justify-between">
            <span>Innovation Areas</span>
            <ScrollLink to="top" smooth={true} duration={500} className="text-dark-blue-2 cursor-pointer" style={{ marginTop: '5px' }}>
              <FontAwesomeIcon icon={faChevronUp} width={30} />
            </ScrollLink>
          </h1>
          <div className="h-[1px] bg-gradient-to-r from-dark-blue to-light-blue"></div>
          <div className="space-y-12 text-black mt-6">
            <section>
              <p className="text-lg md:text-xl 3xl:text-2xl mb-16 text-justify">
                Explore our key areas of innovation where we strive to make a difference through open-source solutions and collaborative research. Stay tuned as we continue to expand and showcase our projects in these domains.
              </p>
            </section>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue-2"></div>
              </div>
            ) : areas.length > 0 ? (
              areas.map((area, index) => (
                <AreaCard key={index} area={area} />
              ))
            ) : (
              <p className="text-center text-gray-500">No innovation areas found.</p>
            )}
            
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
