import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GitHubIcon from '../assets/github-icon.png';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faCodeBranch as faCodeBranchSolid, faCode, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Popover, Button } from 'antd';

const ProjectFallbackLogo = ({ name, size = 'md' }) => {
  const initials = name
    .split(/[\s-_]+/)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  const sizeClasses = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-12 w-12 text-sm';

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

const ProjectCard = ({ project, onTagClick, viewMode = 'list' }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (project.project_logo) {
      import(`../assets/${project.project_logo}`)
        .then((module) => {
          setImageSrc(module.default);
        })
        .catch((err) => {
          console.error('Error loading project logo:', err);
          setImageSrc(null);
        });
    } else {
      setImageSrc(null);
    }
  }, [project.project_logo]);

  const normalizeTags = (tags) => {
    const uniqueTags = new Set();
    tags.forEach(tag => {
      uniqueTags.add(tag.toLowerCase());
    });
    return Array.from(uniqueTags);
  };

  const filteredTags = project.project_tags
    ? normalizeTags(project.project_tags).filter(tag => tag !== project.project_area.toLowerCase())
    : [];

  const maxTagsToShow = viewMode === 'grid' ? 2 : 3;
  const extraTags = filteredTags.length > maxTagsToShow ? filteredTags.slice(maxTagsToShow) : [];
  const visibleTags = filteredTags.slice(0, maxTagsToShow);

  const popoverContent = (
    <div className="flex flex-wrap gap-1">
      {extraTags.map((tag, index) => (
        <span
          key={tag + index}
          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs cursor-pointer hover:bg-gray-200"
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  );

  // Grid view card
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col h-full">
        {/* Header with logo and stats */}
        <div className="flex items-start justify-between mb-3">
          <a
            href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            {imageSrc ? (
              <img src={imageSrc} alt={project.project_name} className="h-10 w-auto" />
            ) : (
              <ProjectFallbackLogo name={project.project_name} />
            )}
          </a>
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStarRegular} className="text-xs" />
              <span>{project.total_stars || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCodeBranchSolid} className="text-xs" />
              <span>{project.total_repositories || 0}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {project.project_description || 'No description available.'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button
            className="px-2 py-1 bg-dark-blue text-white text-xs rounded hover:bg-light-blue transition-colors"
            onClick={() => onTagClick(project.project_area)}
          >
            {project.project_area}
          </button>
          {visibleTags.map((tag, index) => (
            <button
              key={tag + index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors"
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          ))}
          {extraTags.length > 0 && (
            <Popover content={popoverContent} title="More tags" trigger="click">
              <Button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded cursor-pointer h-auto">
                +{extraTags.length}
              </Button>
            </Popover>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {project.project_website && (
            <a
              href={project.project_website}
              target="_blank"
              rel="noreferrer"
              className="text-dark-blue text-xs hover:underline flex items-center gap-1"
            >
              Website <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px]" />
            </a>
          )}
          <a
            href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-blue text-xs font-medium hover:text-light-blue transition-colors ml-auto"
          >
            View repos →
          </a>
        </div>
      </div>
    );
  }

  // List view card (default)
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 mb-6 overflow-hidden">
        <div className="flex">
          {/* Left section */}
          <div className="flex-grow p-6 text-left" style={{ width: '65%' }}>
            {/* Header with logo and stats */}
            <div className="flex items-center justify-between mb-4">
              <a
                href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                {imageSrc ? (
                  <img src={imageSrc} alt={project.project_name} className="h-12 w-auto" />
                ) : (
                  <ProjectFallbackLogo name={project.project_name} />
                )}
              </a>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStarRegular} />
                    <span>{project.total_stars || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCodeBranchSolid} />
                    <span>{project.total_repositories || 0}</span>
                  </div>
                </div>
                {project.project_website && (
                  <a
                    href={project.project_website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-dark-blue text-sm hover:underline flex items-center gap-1"
                  >
                    Project Website <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 text-left">
              {project.project_description || 'No description available.'}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <button
                className="px-3 py-1.5 bg-dark-blue text-white text-sm rounded-full hover:bg-light-blue transition-colors"
                onClick={() => onTagClick(project.project_area)}
              >
                {project.project_area}
              </button>
              {visibleTags.map((tag, index) => (
                <button
                  key={tag + index}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  onClick={() => onTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
              {extraTags.length > 0 && (
                <Popover content={popoverContent} title="More tags" trigger="click">
                  <Button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full cursor-pointer h-auto">
                    +{extraTags.length} more
                  </Button>
                </Popover>
              )}
            </div>
          </div>

          {/* Right section - Repositories */}
          <div className="p-6 border-l border-gray-100 flex flex-col" style={{ width: '35%' }}>
            <h3 className="font-semibold text-sm text-gray-900 mb-4 text-left">Top Repositories</h3>
            <div className="space-y-3 flex-grow">
              {project.top_repositories && project.top_repositories.length > 0 ? (
                project.top_repositories.slice(0, 3).map(repo => (
                  <a
                    key={repo.name}
                    href={`https://github.com/INESCTEC/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={GitHubIcon} alt="GitHub" className="h-4 w-4 flex-shrink-0" />
                      <span className="text-gray-700 text-sm truncate group-hover:text-dark-blue transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm flex-shrink-0 ml-2">
                      <span>{repo.stars}</span>
                      <FontAwesomeIcon icon={faStarRegular} className="text-xs" />
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-left">No repositories available.</p>
              )}
            </div>
            <div className="text-right mt-4">
              <a
                href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-dark-blue text-sm font-medium hover:text-light-blue transition-colors"
              >
                See all repositories →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden bg-white rounded-xl border border-gray-200 shadow-sm mb-4 p-4 text-left">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <a
            href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            {imageSrc ? (
              <img src={imageSrc} alt={project.project_name} className="h-10 w-auto" />
            ) : (
              <ProjectFallbackLogo name={project.project_name} size="sm" />
            )}
          </a>
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStarRegular} className="text-xs" />
              <span>{project.total_stars || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCodeBranchSolid} className="text-xs" />
              <span>{project.total_repositories || 0}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3 text-left">
          {project.project_description || 'No description available.'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button
            className="px-2 py-1 bg-dark-blue text-white text-xs rounded hover:bg-light-blue transition-colors"
            onClick={() => onTagClick(project.project_area)}
          >
            {project.project_area}
          </button>
          {visibleTags.slice(0, 2).map((tag, index) => (
            <button
              key={tag + index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors"
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {project.project_website && (
            <a
              href={project.project_website}
              target="_blank"
              rel="noreferrer"
              className="text-dark-blue text-xs hover:underline"
            >
              Website
            </a>
          )}
          <a
            href={`https://github.com/orgs/INESCTEC/repositories?q=topic%3A${project.project_topic}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-blue text-xs font-medium hover:text-light-blue transition-colors ml-auto"
          >
            View repos →
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
