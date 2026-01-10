import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faCodeBranch as faCodeBranchSolid, faCode } from '@fortawesome/free-solid-svg-icons';
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

const AreaCard = ({ area }) => {
  const [projectImages, setProjectImages] = useState({});
  const navigate = useNavigate();

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

  return (
    <>
      {/* Desktop Layout */}
      <div
        className="hidden md:flex justify-between card-gradient text-black font-sans rounded-lg shadow-md p-6 mb-8 relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-dark-blue-2"
        style={{ '--tw-gradient-from': area.area === 'Energy' ? 'bg-dark-blue-2' : 'bg-industry-red' }}
      >
        {/* Left Section */}
        <div className="w-2/3 pr-6 flex flex-col items-start">
          <h2 className="text-4xl font-black mb-6 reverse-gradient-text">
            {area.area}
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed overflow-hidden" style={{ maxWidth: '90%' }}>
            {area.area_description || 'No description available.'}
          </p>
          <button onClick={handleSeeProjectsClick} className="text-black font-extrabold text-lg mt-3 hover:underline">
            &gt; See projects
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/3 mr-6">
          <h3 className="text-dark-blue-2 font-black text-xl mb-4">
            Featured Projects
          </h3>
          <div className="space-y-4">
            {area.featured_projects.map((project) => (
              <div key={project.project_name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <a href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`} target="_blank" rel="noopener noreferrer">
                    {projectImages[project.project_name] ? (
                      <img
                        src={projectImages[project.project_name]}
                        alt={`${project.project_name} logo`}
                        className="h-10 w-auto"
                      />
                    ) : (
                      <ProjectFallbackLogo name={project.project_name} />
                    )}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faStarRegular} className="mr-1" />
                    <span>{project.total_stars || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCodeBranchSolid} className="ml-4 mr-1" />
                    <span>{project.total_repos || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center text-center p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-4xl font-black mb-2 text-energy-yellow">
          {area.area}
        </h2>

        <div className="flex justify-center items-center space-x-6 mb-4 mt-1 text-gray-600">
          <div className="flex items-center space-x-1 text-black">
            <FontAwesomeIcon icon={faStarRegular} />
            <span>{totalStars}</span>
          </div>
          <div className="flex items-center space-x-1 text-black">
            <FontAwesomeIcon icon={faCodeBranchSolid} />
            <span>{totalRepos}</span>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6 mb-4">
          {area.featured_projects.map((project) => (
            <a
              key={project.project_name}
              href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {projectImages[project.project_name] ? (
                <img
                  src={projectImages[project.project_name]}
                  alt={`${project.project_name} logo`}
                  className="h-7 w-auto rounded"
                />
              ) : (
                <ProjectFallbackLogo name={project.project_name} size="sm" />
              )}
            </a>
          ))}
        </div>

        <button
          onClick={handleSeeProjectsClick}
          className="text-black font-extrabold text-lg mt-1 hover:underline"
        >
          &gt; See Projects
        </button>
      </div>
    </>
  );
};

export default AreaCard;

