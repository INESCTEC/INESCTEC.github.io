import React, { useState, useEffect } from "react";
import logo from "../assets/INESCTEC_logotipo_color_rgb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowUp,
  faArrowDown,
  faTimes,
  faList,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { RepoIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";

const Header = ({
  searchTerm,
  onSearchChange,
  onSortByStars,
  onSortByRepos,
  onCategoryChange,
  activeFilters,
  onRemoveTag,
  sortByStars,
  sortByRepos,
  defaultCategory,
  stats,
  viewMode,
  onViewModeChange,
}) => {
  const [activeCategory, setActiveCategory] = useState(
    defaultCategory || "All",
  );
  // Arrow direction based on sort state (down = desc, up = asc)
  const categories = ["All", "Energy", "Robotics", "Artificial Intelligence"];

  const handleSearchInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  useEffect(() => {
    setActiveCategory(defaultCategory || "All");
  }, [defaultCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <header className="bg-white text-black font-mono pt-4 pb-6">
      {/* Top row: Logo + Title + Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <Link to="/">
            <img src={logo} alt="INESC TEC" className="h-10 md:h-12" />
          </Link>
          <span className="reverse-gradient-text text-lg md:text-2xl font-semibold">
            Open Source Software
          </span>
        </div>
        {stats && (
          <div className="hidden md:block text-sm text-gray-500">
            {stats.totalProjects} Projects · {stats.totalRepos} Repositories · {stats.totalStars.toLocaleString()} Stars
          </div>
        )}
      </div>

      {/* Second row: Categories */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            aria-pressed={activeCategory === category}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-1 whitespace-nowrap flex-shrink-0 ${
              activeCategory === category
                ? "bg-dark-blue text-white"
                : "text-dark-blue-2 bg-white border border-gray-300 hover:border-dark-blue-2"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Third row: Search + Sort + View toggle */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Search */}
        <div className="flex-grow flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-dark-blue-2 transition-colors">
          <input
            type="text"
            className="flex-grow px-4 py-2 bg-white outline-none text-gray-700 placeholder-gray-400"
            placeholder="Search projects..."
            aria-label="Search projects by name or tag"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button
            aria-label="Search"
            className="px-4 py-2 bg-white flex items-center justify-center text-gray-400"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Sort:</span>
          <button
            onClick={onSortByStars}
            aria-label="Sort by stars"
            title="Sort by total stars"
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors border ${
              sortByStars
                ? "bg-dark-blue text-white border-dark-blue"
                : "bg-white text-gray-600 border-gray-300 hover:border-dark-blue-2"
            }`}
          >
            <FontAwesomeIcon icon={faStarRegular} />
            <FontAwesomeIcon icon={sortByStars === 'asc' ? faArrowUp : faArrowDown} className="text-xs" />
          </button>
          <button
            onClick={onSortByRepos}
            aria-label="Sort by repositories"
            title="Sort by number of repositories"
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors border ${
              sortByRepos
                ? "bg-dark-blue text-white border-dark-blue"
                : "bg-white text-gray-600 border-gray-300 hover:border-dark-blue-2"
            }`}
          >
            <RepoIcon size={14} />
            <FontAwesomeIcon icon={sortByRepos === 'asc' ? faArrowUp : faArrowDown} className="text-xs" />
          </button>

          {/* View mode toggle - desktop only */}
          {onViewModeChange && (
            <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden ml-2">
              <button
                onClick={() => onViewModeChange('list')}
                aria-label="List view"
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'list'
                    ? "bg-dark-blue text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
              <button
                onClick={() => onViewModeChange('grid')}
                aria-label="Grid view"
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'grid'
                    ? "bg-dark-blue text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FontAwesomeIcon icon={faGrip} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center flex-wrap mt-4 gap-2" role="list" aria-label="Active filters">
          {activeFilters.map((filter, index) => (
            <button
              key={index}
              onClick={() => onRemoveTag(filter)}
              aria-label={`Remove filter: ${filter}`}
              className="flex items-center bg-light-blue text-white px-3 py-1.5 rounded-full text-sm hover:bg-dark-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dark-blue focus:ring-offset-1"
            >
              <span>{filter}</span>
              <FontAwesomeIcon
                icon={faTimes}
                className="ml-2 text-xs"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
