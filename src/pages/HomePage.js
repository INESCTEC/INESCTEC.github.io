import React, { useEffect, useState } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/INESCTEC_logotipo_monocrom_white.png';
import Footer from '../components/Footer';
import AreaCard from '../components/AreaCard';
import ParticleNetwork from '../components/ParticleNetwork';

const HomePage = () => {
  const [areas, setAreas] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/areas.json').then(res => res.json()),
      fetch('/projects.json').then(res => res.json())
    ])
      .then(([areasData, projectsData]) => {
        if (Array.isArray(areasData)) {
          setAreas(areasData);
        }
        if (Array.isArray(projectsData)) {
          setProjects(projectsData);
        }
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setAreas([]);
        setProjects([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Calculate stats
  const totalProjects = projects.length;
  const totalRepos = projects.reduce((sum, p) => sum + (p.total_repositories || 0), 0);
  const totalStars = projects.reduce((sum, p) => sum + (p.total_stars || 0), 0);

  return (
    <div id="home-scroll-container" className="font-mono h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <Element name="top" className="min-h-screen snap-start">
        <main className="relative flex items-center justify-center bg-gradient-to-r from-dark-blue to-light-blue min-h-screen text-white overflow-hidden">
          <ParticleNetwork />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full max-w-4xl p-8">
            <div className="flex flex-col items-center md:items-start md:mr-8">
              <img src={logo} alt="INESC TEC" className="h-14 2xl:h-16" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl mt-4">Open Source Software</h2>
              <p className="text-sm md:text-base text-white/80 mt-2 text-center md:text-left">
                Advancing research through collaborative innovation
              </p>
              <p className="text-xs md:text-sm text-white/60 mt-1">
                {totalProjects > 0 ? `${totalProjects} Projects` : ''}
                {totalProjects > 0 && totalRepos > 0 ? ' · ' : ''}
                {totalRepos > 0 ? `${totalRepos} Repositories` : ''}
                {totalRepos > 0 && totalStars > 0 ? ' · ' : ''}
                {totalStars > 0 ? `${totalStars.toLocaleString()} Stars` : ''}
              </p>
            </div>
            <div className="flex flex-col items-center mt-6 md:items-start md:mt-0 2xl:mt-2">
              <ScrollLink
                to="vision"
                smooth={true}
                duration={500}
                containerId="home-scroll-container"
                className="hero-nav-link text-xl mb-4 md:text-2xl md:mb-6 cursor-pointer 2xl:text-2xl"
              >
                Our Vision
              </ScrollLink>
              <ScrollLink
                to="innovation-areas"
                smooth={true}
                duration={500}
                containerId="home-scroll-container"
                className="hero-nav-link text-xl mb-4 md:text-2xl md:mb-6 cursor-pointer 2xl:text-2xl"
              >
                Innovation Areas
              </ScrollLink>
              <RouterLink
                to="/projects"
                className="hero-nav-link text-xl md:text-2xl cursor-pointer 2xl:text-2xl"
              >
                Our Projects
              </RouterLink>
            </div>
          </div>

          {/* Scroll indicator */}
          <ScrollLink
            to="vision"
            smooth={true}
            duration={500}
            containerId="home-scroll-container"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10 animate-bounce"
          >
            <FontAwesomeIcon icon={faChevronDown} className="text-white/70 text-2xl" />
          </ScrollLink>
        </main>
      </Element>

      <Element name="vision" className="min-h-screen bg-white font-mono snap-start">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Left Column - Title and Description */}
          <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-between">
            <div>
              <ScrollLink to="top" smooth={true} duration={500} containerId="home-scroll-container" className="next-indicator mb-4">
                <FontAwesomeIcon icon={faChevronUp} />
                <span>Back to top</span>
              </ScrollLink>
              <h1 className="text-4xl md:text-5xl reverse-gradient-text font-bold mb-6">
                Open Source
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Discover our commitment to open-source solutions that accelerate scientific innovation and foster collaboration within the research community.
              </p>
            </div>

            {/* Next Section Indicator */}
            <ScrollLink
              to="innovation-areas"
              smooth={true}
              duration={500}
              containerId="home-scroll-container"
              className="next-indicator mt-8 md:mt-0"
            >
              <FontAwesomeIcon icon={faChevronDown} />
              <span>Next: Innovation Areas</span>
            </ScrollLink>
          </div>

          {/* Right Column - Timeline with Cards */}
          <div className="w-full md:w-[60%] p-8 md:p-12">
            <div className="timeline-container">
              <div className="timeline-line"></div>

              {/* Card 01 - Our Vision */}
              <div className="timeline-item">
                <div className="timeline-chevron">
                  <FontAwesomeIcon icon={faChevronDown} className="text-dark-blue text-xs" />
                </div>
                <div className="dark-card text-left">
                  <h2 className="text-xl font-bold mb-3 text-gray-900">Our Vision</h2>
                  <p className="text-gray-600 leading-relaxed text-left">
                    At INESC TEC, we believe in the power of open-source solutions to accelerate scientific innovation, enhance transparency, and foster collaboration within the research community. Our commitment is to develop and share technologies that advance global research efforts.
                  </p>
                </div>
              </div>

              {/* Card 02 - Where to Start */}
              <div className="timeline-item">
                <div className="timeline-chevron">
                  <FontAwesomeIcon icon={faChevronDown} className="text-dark-blue text-xs" />
                </div>
                <div className="dark-card text-left">
                  <h2 className="text-xl font-bold mb-3 text-gray-900">Where to start?</h2>
                  <p className="text-gray-600 leading-relaxed mb-4 text-left">
                    Whether you're a researcher, developer, or enthusiast, you can access our tools and collaborate with a diverse community of experts.
                  </p>
                  <a
                    href="https://github.com/INESCTEC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-dark-blue text-white font-medium rounded-lg hover:bg-light-blue transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    View GitHub
                  </a>
                </div>
              </div>

              {/* Card 03 - Contacts */}
              <div className="timeline-item">
                <div className="timeline-chevron">
                  <FontAwesomeIcon icon={faChevronDown} className="text-dark-blue text-xs" />
                </div>
                <div className="dark-card text-left">
                  <h2 className="text-xl font-bold mb-3 text-gray-900">Contacts</h2>
                  <p className="text-gray-600 leading-relaxed mb-4 text-left">
                    Whether you have questions, feedback, or partnership ideas, we're here to help. We are open to collaboration.
                  </p>
                  <a
                    href="mailto:oss@inesctec.pt"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-dark-blue font-medium rounded-lg border-2 border-dark-blue hover:bg-dark-blue hover:text-white transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>

      <Element name="innovation-areas" className="min-h-screen bg-white font-mono snap-start">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Left Column - Title and Description */}
          <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-between">
            <div>
              <ScrollLink to="vision" smooth={true} duration={500} containerId="home-scroll-container" className="next-indicator mb-4">
                <FontAwesomeIcon icon={faChevronUp} />
                <span>Back to Open Source</span>
              </ScrollLink>
              <h1 className="text-4xl md:text-5xl reverse-gradient-text font-bold mb-6">
                Innovation Areas
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explore our key areas of innovation where we strive to make a difference through open-source solutions and collaborative research.
              </p>
            </div>

          </div>

          {/* Right Column - Timeline with Area Cards */}
          <div className="w-full md:w-[60%] p-8 md:p-12">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue-2"></div>
              </div>
            ) : areas.length > 0 ? (
              <div className="timeline-container">
                <div className="timeline-line"></div>
                {areas.map((area, index) => (
                  <AreaCard key={index} area={area} index={index} darkMode={true} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No innovation areas found.</p>
            )}
          </div>
        </div>
      </Element>
      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
