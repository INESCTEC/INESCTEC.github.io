import React, { useState, useEffect } from 'react';
import logo from '../assets/INESCTEC_logotipo_color_rgb.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowUp, faArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { RepoIcon } from '@primer/octicons-react'; 
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

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
  defaultCategory
}) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory || 'All');
  const [isArrowUp, setIsArrowUp] = useState(true);
  const [calendarArrowUp, setCalendarArrowUp] = useState(true);
  const categories = ['All', 'Energy', 'Robotics'];

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
    setActiveCategory(defaultCategory || 'All');
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
        <span className="reverse-gradient-text mt-4 mb-4 text-2xl md:text-4xl">Open Source Software</span>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-light-blue-2 text-white'
                  : 'text-dark-blue-2 bg-white border border-dark-blue-2'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center w-full px-6 md:px-8">
        <div className="flex-grow flex border border-dark-blue-2 rounded-full overflow-hidden">
          <input
            type="text"
            className="flex-grow ml-6 p-2 bg-white outline-none text-dark-blue-2 placeholder-dark-blue-2"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className="px-4 py-2 bg-white flex items-center justify-center">
            <FontAwesomeIcon icon={faSearch} className="text-dark-blue-2" />
          </button>
        </div>
        <div className="hidden md:flex items-center ml-4">
          <span className="text-dark-blue-2">Sort: </span>
          <div id="stars" data-tooltip-content="Total Stars">
            <FontAwesomeIcon icon={faStarRegular} className="text-dark-blue-2 text-md ml-2" />
            <button
              onClick={toggleArrow}
              className={`focus:outline-none ${
                sortByRepos ? 'opacity-50 cursor-not-allowed' : ''
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
              className={`focus:outline-none ${
                sortByStars ? 'opacity-50 cursor-not-allowed' : ''
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
      <div className="flex items-center flex-wrap mt-4 ml-6 md:ml-8">
        {activeFilters.map((filter, index) => (
          <div
            key={index}
            className="flex items-center bg-light-blue-2 text-white px-3 py-1 rounded-full mr-2 mb-2"
          >
            <span>{filter}</span>
            <FontAwesomeIcon
              icon={faTimes}
              className="ml-2 cursor-pointer"
              onClick={() => onRemoveTag(filter)}
            />
          </div>
        ))}
      </div>
      <Tooltip anchorId="stars" place="top" />
      <Tooltip anchorId="repos" place="top" />
    </header>
  );
};

export default Header;
