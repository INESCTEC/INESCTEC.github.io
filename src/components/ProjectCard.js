import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GitHubIcon from '../assets/github-icon.png';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faCodeBranch as faCodeBranchSolid } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({ project, onTagClick }) => { 
  const [showAllTags, setShowAllTags] = useState(false); 
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (project.project_logo) {
      import(`../assets/${project.project_logo}`)
        .then((module) => {
          setImageSrc(module.default);
        })
        .catch((err) => {
          console.error("Error loading project logo:", err);
          setImageSrc(null); 
        });
    } else {
      setImageSrc(null); 
    }
  }, [project.project_logo]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const defaultLogo = 'data:image/png;base64,<base64-encoded-image>';

  const filteredTags = project.project_tags
    ? project.project_tags.filter(tag => tag !== project.project_area)
    : [];

  const maxTagsToShow = 3; 
  const extraTags = filteredTags.length > maxTagsToShow ? filteredTags.slice(maxTagsToShow) : [];
  const visibleTags = showAllTags ? filteredTags : filteredTags.slice(0, maxTagsToShow);

  return (
    <>
      <div className="hidden md:flex justify-between bg-white text-black font-mono relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b from-dark-blue-2 to-light-blue-2 mb-12 ml-8 mr-12 md:mx-16">
        <div className="flex-auto pl-4" style={{ width: '65%' }}>
          <div className="flex flex-col items-start space-y-2 mb-2">
            <a href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`} target="_blank" rel="noopener noreferrer">
              <img
                src={imageSrc || defaultLogo}
                alt={project.project_name}
                className="h-12 w-auto"
              />
            </a>
            {project.project_website ? (
              <a href={project.project_website} target="_blank" className="text-dark-blue-2 text-md" rel="noreferrer">
                Project Website
              </a>
            ) : (
              <span className="block h-6"></span>
            )}
          </div>
          <div className="text-gray-700 mb-4 text-start max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl">
            <p>
              {project.project_description
                ? project.project_description
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus luctus enim sed semper. Aliquam pellentesque sem in gravida aliquet.'}
            </p>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="px-3 py-1 bg-light-blue-2 text-white font-bold rounded-full text-sm cursor-pointer" onClick={() => onTagClick(project.project_area)}>
              {project.project_area}
            </span>

            {visibleTags.map((tag, index) => (
              <span
                key={tag + index}
                className="px-3 py-1 bg-light-blue-2 text-white font-bold rounded-full text-sm cursor-pointer" 
                onClick={() => onTagClick(tag)} 
              >
                {tag}
              </span>
            ))}

            {extraTags.length > 0 && !showAllTags && (
              <span
                className="px-3 py-1 bg-light-blue-2 text-white font-bold rounded-full text-sm cursor-pointer"
                onClick={() => setShowAllTags(true)} 
              >
                ...
              </span>
            )}

            {showAllTags && (
              <div className="absolute z-10 mt-1 p-2 bg-white border border-gray-200 shadow-lg rounded-md">
                {extraTags.map((tag, index) => (
                  <span
                    key={tag + index}
                    className="block px-3 py-1 bg-light-blue-2 text-white font-bold rounded-full text-sm cursor-pointer mb-1"
                    onClick={() => onTagClick(tag)}
                  >
                    {tag}
                  </span>
                ))}
                <button
                  className="mt-1 text-xs text-dark-blue-2"
                  onClick={() => setShowAllTags(false)} 
                >
                  Show less
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-none pl-4" style={{ width: '32%' }}>
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="font-semibold mb-3 text-start">Top OSS Repositories</h3>
              <div className="flex flex-col space-y-3 mb-3" style={{ maxHeight: 'calc(100% - 40px)', overflowY: 'auto' }}>
                {project.top_repositories && project.top_repositories.length > 0 ? (
                  project.top_repositories.map(repo => (
                    <div key={repo.name} className="flex justify-between text-start">
                      <div className="flex items-start">
                        <img src={GitHubIcon} alt="GitHub" className="h-6 w-6 mr-2 mb-1" />
                        <a href={`https://github.com/INESCTEC/${repo.name}`} className="text-def-grey" target="_blank" rel="noopener noreferrer">
                          {truncateText(repo.name, 30)} 
                        </a>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">{repo.stars}</span>
                        <FontAwesomeIcon icon={faStarRegular} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center w-full">No repositories available.</p>
                )}
              </div>
            </div>
            <div className="mt-auto text-end">
              <a href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`} className="text-dark-blue-2" target="_blank" rel="noopener noreferrer">
                <button className="text-dark-blue-2">See repositories</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden bg-white text-black font-mono relative z-10 mb-8 mx-4 sm:mx-8">
        <div className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-4">
            <img
              src={imageSrc || defaultLogo}
              alt={project.project_name}
              className="h-12 w-auto"
            />
            <div className="flex items-center space-x-2 mt-2 mb-2 text-sm">
              <div className="items-center">
                <img src={GitHubIcon} alt="GitHub" className="h-4 w-4" />
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faStarRegular} />
                <span className="ml-1">{project.total_stars}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCodeBranchSolid} />
                <span className="ml-1">{project.total_repositories}</span>
              </div>
            </div>
            {project.project_website ? (
              <a href={project.project_website} className="text-dark-blue-2 mt-2 mb-4 text-xs" target="_blank" rel="noopener noreferrer">
                Project Website
              </a>
            ) : (
              <span className="block h-6"></span>
            )}
            <div className="flex flex-wrap justify-center mb-4">
              {(filteredTags.length > 0
                ? filteredTags
                : ['Energy Communities', 'RES Forecasting', 'Load Forecasting']
              ).map(tag => (
                <span key={tag} className="px-3 py-1 bg-light-blue-2 text-white font-bold rounded-full text-xs mr-1 mb-1 cursor-pointer" onClick={() => onTagClick(tag)}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto text-center">
              <a href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`} className="text-dark-blue-2 text-sm" target="_blank" rel="noopener noreferrer">
                See all repositories
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
