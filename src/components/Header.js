import React, { useState, useEffect } from "react";
import logo from "../assets/INESCTEC_logotipo_color_rgb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowUp,
  faArrowDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { RepoIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

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
}) => {
  const [activeCategory, setActiveCategory] = useState(
    defaultCategory || "All",
  );
  const [isArrowUp, setIsArrowUp] = useState(true);
  const [calendarArrowUp, setCalendarArrowUp] = useState(true);
  const categories = ["All", "Energy", "Robotics", "Artificial Intelligence"];

  const handleSearchInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  const toggleArrow = () => {
    setIsArrowUp(!isArrowUp);
    onSortByStars();
  };

  const toggleCalendarArrow = () => {
    setCalendarArrowUp(!calendarArrowUp);
    onSortByRepos();
  };

  useEffect(() => {
    setActiveCategory(defaultCategory || "All");
  }, [defaultCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <header className="bg-white text-black font-mono relative z-10 pt-2 md:p-8">
      <div className="flex flex-col items-start ml-6 md:ml-8 mt-8 mb-6">
        <Link to="/">
          <img src={logo} alt="INESC TEC" className="h-12 md:h-16" />
        </Link>
        <span className="reverse-gradient-text mt-4 mb-4 text-2xl md:text-4xl">
          Open Source Software
        </span>
        <nav aria-label="Project categories" className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              aria-pressed={activeCategory === category}
              className={`min-h-[44px] px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-1 ${
                activeCategory === category
                  ? "bg-light-blue-2 text-white"
                  : "text-dark-blue-2 bg-white border border-dark-blue-2 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center w-full px-6 md:px-8">
        <div className="flex-grow flex border border-dark-blue-2 rounded-full overflow-hidden">
          <input
            type="text"
            className="flex-grow ml-6 p-2 bg-white outline-none text-dark-blue-2 placeholder-dark-blue-2 focus:ring-2 focus:ring-light-blue"
            placeholder="Search"
            aria-label="Search projects by name or tag"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button
            aria-label="Search"
            className="px-4 py-2 bg-white flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faSearch} className="text-dark-blue-2" />
          </button>
        </div>
        {/* Desktop sort */}
        <div className="hidden md:flex items-center ml-4">
          <span className="text-dark-blue-2">Sort: </span>
          <div id="stars" data-tooltip-content="Total Stars">
            <FontAwesomeIcon
              icon={faStarRegular}
              className="text-dark-blue-2 text-md ml-2"
            />
            <button
              onClick={toggleArrow}
              aria-label="Sort by stars"
              className={`focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-1 rounded ${
                sortByRepos ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!!sortByRepos}
            >
              <FontAwesomeIcon
                icon={isArrowUp ? faArrowUp : faArrowDown}
                className="text-dark-blue-2 text-md ml-1"
              />
            </button>
          </div>
          <div id="repos" className="ml-2" data-tooltip-content="Repositories">
            <RepoIcon size={18} className="text-dark-blue-2 text-md ml-2" />
            <button
              onClick={toggleCalendarArrow}
              aria-label="Sort by repositories"
              className={`focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-1 rounded ${
                sortByStars ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!!sortByStars}
            >
              <FontAwesomeIcon
                icon={calendarArrowUp ? faArrowUp : faArrowDown}
                className="text-dark-blue-2 text-md ml-1"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sort */}
      <div className="flex md:hidden items-center justify-end gap-3 px-6 mt-3">
        <span className="text-dark-blue-2 text-sm">Sort:</span>
        <button
          onClick={toggleArrow}
          aria-label="Sort by stars"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
            sortByStars
              ? "bg-dark-blue-2 text-white"
              : "bg-gray-100 text-dark-blue-2"
          } ${sortByRepos ? "opacity-50" : ""}`}
          disabled={!!sortByRepos}
        >
          <FontAwesomeIcon icon={faStarRegular} />
          <FontAwesomeIcon icon={isArrowUp ? faArrowUp : faArrowDown} className="text-xs" />
        </button>
        <button
          onClick={toggleCalendarArrow}
          aria-label="Sort by repositories"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
            sortByRepos
              ? "bg-dark-blue-2 text-white"
              : "bg-gray-100 text-dark-blue-2"
          } ${sortByStars ? "opacity-50" : ""}`}
          disabled={!!sortByStars}
        >
          <RepoIcon size={14} />
          <FontAwesomeIcon icon={calendarArrowUp ? faArrowUp : faArrowDown} className="text-xs" />
        </button>
      </div>
      {activeFilters.length > 0 && (
        <div className="flex items-center flex-wrap mt-4 ml-6 md:ml-8" role="list" aria-label="Active filters">
          {activeFilters.map((filter, index) => (
            <button
              key={index}
              onClick={() => onRemoveTag(filter)}
              aria-label={`Remove filter: ${filter}`}
              className="flex items-center bg-light-blue-2 text-white px-3 py-2 rounded-full mr-2 mb-2 min-h-[36px] hover:bg-dark-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dark-blue focus:ring-offset-1"
            >
              <span>{filter}</span>
              <FontAwesomeIcon
                icon={faTimes}
                className="ml-2"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}
      <Tooltip anchorId="stars" place="top" />
      <Tooltip anchorId="repos" place="top" />
    </header>
  );
};

export default Header;
