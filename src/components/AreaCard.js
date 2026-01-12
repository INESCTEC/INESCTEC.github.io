import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faCodeBranch as faCodeBranchSolid, faCode, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ProjectFallbackLogo = ({ name, size = 'md' }) => {
  const initials = name
    .split(/[\s-_]+/)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  const sizeClasses = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-10 w-10 text-sm';

  return (
    <div className={`${sizeClasses} bg-gradient-to-br from-dark-blue to-light-blue rounded-lg flex items-center justify-center`}>
      {initials ? (
        <span className="text-white font-bold">{initials}</span>
      ) : (
        <FontAwesomeIcon icon={faCode} className="text-white" />
      )}
    </div>
  );
};

const AreaCard = ({ area, index = 0, darkMode = false }) => {
  const [projectImages, setProjectImages] = useState({});
  const navigate = useNavigate();

  // Animation delay class based on index
  const delayClasses = ['', 'animation-delay-100', 'animation-delay-200', 'animation-delay-300'];
  const animationDelay = delayClasses[index] || delayClasses[3];

  // Calculate totals from featured projects
  const totalStars = area.featured_projects.reduce((sum, p) => sum + (p.total_stars || 0), 0);
  const totalRepos = area.featured_projects.reduce((sum, p) => sum + (p.total_repos || 0), 0);

  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      for (const project of area.featured_projects) {
        try {
          const module = await import(`../assets/${project.project_logo}`);
          images[project.project_name] = module.default;
        } catch (err) {
          console.error(`Error loading logo for ${project.project_name}:`, err);
          images[project.project_name] = null;
        }
      }
      setProjectImages(images);
    };

    loadImages();
  }, [area.featured_projects]);

  const handleSeeProjectsClick = () => {
    navigate(`/projects?category=${encodeURIComponent(area.area)}`);
    window.scrollTo(0, 0);
  };

  // Dark Mode Layout
  if (darkMode) {
    return (
      <>
        {/* Mobile: Compact card layout */}
        <div className={`md:hidden bg-white border border-gray-200 rounded-lg p-4 mb-3 border-l-4 border-l-dark-blue shadow-sm text-left animate-fade-in-up ${animationDelay}`}>
          <h2 className="text-base font-bold text-gray-900 mb-3">{area.area}</h2>
          <div className="space-y-2 mb-3">
            {area.featured_projects.slice(0, 3).map((project) => (
              <div key={project.project_name} className="flex items-center justify-between">
                <a
                  href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  {projectImages[project.project_name] ? (
                    <img
                      src={projectImages[project.project_name]}
                      alt={`${project.project_name} logo`}
                      className="h-5 w-auto"
                    />
                  ) : (
                    <ProjectFallbackLogo name={project.project_name} size="sm" />
                  )}
                </a>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStarRegular} />
                    <span>{project.total_stars || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCodeBranchSolid} />
                    <span>{project.total_repos || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleSeeProjectsClick}
            className="group flex items-center text-dark-blue font-bold text-xs hover:text-light-blue transition-colors duration-200"
          >
            <span className="group-hover:underline">See all projects</span>
            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </button>
        </div>

        {/* Desktop: Timeline layout */}
        <div className={`hidden md:block timeline-item animate-fade-in-up ${animationDelay}`}>
          <div className="timeline-chevron">
            <FontAwesomeIcon icon={faChevronDown} className="text-dark-blue text-xs" />
          </div>
          <div className="dark-card flex text-left">
            <div className="w-2/3 pr-6 flex flex-col">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">{area.area}</h2>
              <p className="text-base text-gray-600 leading-relaxed mb-4 text-left">
                {area.area_description || 'No description available.'}
              </p>
              <button
                onClick={handleSeeProjectsClick}
                className="group flex items-center text-dark-blue font-bold text-sm hover:text-light-blue transition-colors duration-200 mt-auto"
              >
                <span className="group-hover:underline">See all projects</span>
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </button>
            </div>
            <div className="w-1/3">
              <h3 className="text-dark-blue font-bold text-xs uppercase tracking-wide mb-3">
                Featured Projects
              </h3>
              <div className="space-y-2">
                {area.featured_projects.slice(0, 3).map((project) => (
                  <div key={project.project_name} className="flex items-center justify-between">
                    <a
                      href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      {projectImages[project.project_name] ? (
                        <img
                          src={projectImages[project.project_name]}
                          alt={`${project.project_name} logo`}
                          className="h-6 w-auto"
                        />
                      ) : (
                        <ProjectFallbackLogo name={project.project_name} size="sm" />
                      )}
                    </a>
                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faStarRegular} />
                        <span>{project.total_stars || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCodeBranchSolid} />
                        <span>{project.total_repos || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Default Light Mode Layout
  return (
    <>
      {/* Desktop Layout */}
      <div
        className={`hidden md:flex justify-between bg-white text-black font-sans rounded-xl border border-gray-200 shadow-sm p-6 mb-8 relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-gradient-to-b before:from-dark-blue before:to-light-blue transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-300 animate-fade-in-up ${animationDelay}`}
      >
        {/* Left Section */}
        <div className="w-2/3 pr-8 flex flex-col items-start">
          <h2 className="text-4xl font-black mb-4 reverse-gradient-text">
            {area.area}
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed" style={{ maxWidth: '90%' }}>
            {area.area_description || 'No description available.'}
          </p>
          <button
            onClick={handleSeeProjectsClick}
            className="group flex items-center text-dark-blue-2 font-bold text-lg mt-auto hover:text-dark-blue transition-colors duration-200"
          >
            <span className="group-hover:underline">See projects</span>
            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/3">
          <h3 className="text-dark-blue-2 font-bold text-sm uppercase tracking-wide mb-4">
            Featured Projects
          </h3>
          <div className="space-y-3">
            {area.featured_projects.map((project) => (
              <div key={project.project_name} className="flex items-center justify-between">
                <a
                  href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  {projectImages[project.project_name] ? (
                    <img
                      src={projectImages[project.project_name]}
                      alt={`${project.project_name} logo`}
                      className="h-9 w-auto"
                    />
                  ) : (
                    <ProjectFallbackLogo name={project.project_name} />
                  )}
                </a>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStarRegular} className="text-xs" />
                    <span>{project.total_stars || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCodeBranchSolid} className="text-xs" />
                    <span>{project.total_repos || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={`md:hidden flex flex-col items-center text-center p-5 bg-white border border-gray-200 rounded-xl shadow-sm relative overflow-hidden before:content-[''] before:absolute before:left-0 before:right-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-dark-blue before:to-light-blue transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 animate-fade-in-up ${animationDelay}`}>
        <h2 className="text-3xl font-black mb-3 reverse-gradient-text">
          {area.area}
        </h2>

        <div className="flex justify-center items-center gap-6 mb-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faStarRegular} className="text-xs" />
            <span>{totalStars}</span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCodeBranchSolid} className="text-xs" />
            <span>{totalRepos}</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mb-4">
          {area.featured_projects.map((project) => (
            <a
              key={project.project_name}
              href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              {projectImages[project.project_name] ? (
                <img
                  src={projectImages[project.project_name]}
                  alt={`${project.project_name} logo`}
                  className="h-8 w-auto"
                />
              ) : (
                <ProjectFallbackLogo name={project.project_name} size="sm" />
              )}
            </a>
          ))}
        </div>

        <button
          onClick={handleSeeProjectsClick}
          className="group flex items-center text-dark-blue-2 font-bold text-base hover:text-dark-blue transition-colors duration-200"
        >
          <span className="group-hover:underline">See projects</span>
          <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
        </button>
      </div>
    </>
  );
};

export default AreaCard;

