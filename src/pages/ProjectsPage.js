import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import image from '../assets/circuit.png';
import { useLocation } from 'react-router-dom';
import ScrollNavbar from '../components/ScrollNavbar';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortByStars, setSortByStars] = useState(null);
  const [sortByRepos, setSortByRepos] = useState(null);

  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const defaultCategory = queryParams.get('category') || 'All';

  useEffect(() => {
    fetch('/projects.json')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error loading the data:', error);
        setProjects([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const category = queryParams.get('category');
    if (category) setCategoryFilter(category);
  }, [queryParams]);

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    setActiveFilters([]); 
  };

  const handleTagClick = (tag) => {
    if (!activeFilters.includes(tag)) {
      setActiveFilters([...activeFilters, tag]);
      setCategoryFilter('All'); 
      setCurrentPage(1);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setActiveFilters(activeFilters.filter((tag) => tag !== tagToRemove));
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const filteredProjects = projects
    .filter((project) => {
      const categoryMatch = categoryFilter === 'All' || project.project_area.toLowerCase() === categoryFilter.toLowerCase();
      const tagMatch = activeFilters.length === 0 || activeFilters.every((filter) =>
        project.project_tags.map(tag => tag.toLowerCase()).includes(filter.toLowerCase())
      );
      return categoryMatch && tagMatch;
    })
    .filter((project) => {
      return searchTerm === '' || 
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.project_tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    })
    .sort((a, b) => {
      if (sortByStars) {
        return sortByStars === 'asc' ? a.total_stars - b.total_stars : b.total_stars - a.total_stars;
      }
      if (sortByRepos) {
        return sortByRepos === 'asc' ? a.total_repositories - b.total_repositories : b.total_repositories - a.total_repositories;
      }
      return 0;
  });


  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const handleSortByStars = () => {
    setSortByStars(sortByStars ? null : 'asc');
    setSortByRepos(null);
  };

  const handleSortByRepos = () => {
    setSortByRepos(sortByRepos ? null : 'asc');
    setSortByStars(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white font-mono relative">
        <img src={image} alt="INESC TEC" className="absolute top-0 left-0 w-full h-auto z-0" />
  
        {/* Fade-in Navbar */}
        <ScrollNavbar />

        {/* Main content */}
        <div className="flex-grow mt-16 relative z-10">
          <div className="mt-6 mb-12 bg-white">
            <Header
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              activeFilters={activeFilters}
              onRemoveTag={handleRemoveTag}
              onSortByStars={handleSortByStars}
              onSortByRepos={handleSortByRepos}
              sortByStars={sortByStars}
              sortByRepos={sortByRepos}
              defaultCategory={defaultCategory} 
              onCategoryChange={handleCategoryChange}
            />
            {!loading && filteredProjects.length > 0 && (
              <div className="flex justify-between items-center px-6 md:px-8 mt-4 text-sm text-gray-600">
                <span>
                  Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}

            <div className="mt-4 mb-4 pb-2 pt-2">
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue-2"></div>
                </div>
              ) : currentProjects.length > 0 ? (
                currentProjects.map((project, index) => (
                  <React.Fragment key={index}>
                    <ProjectCard project={project} onTagClick={handleTagClick} />
                  </React.Fragment>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                  <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium mb-2">No projects found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
  
            {!loading && filteredProjects.length > 0 && (
              <div className="flex justify-center md:justify-end mt-4 md:mr-14">
                <nav aria-label="Pagination" className="flex items-center gap-1">
                  <button
                    className={`min-w-[44px] min-h-[44px] px-4 py-2 border border-gray-300 rounded-l-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-1 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-dark-blue-2 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      className={`min-w-[44px] min-h-[44px] px-4 py-2 border-t border-b border-l border-gray-300 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-1 ${
                        currentPage === index + 1
                          ? 'bg-dark-blue-2 text-white border-dark-blue-2'
                          : 'bg-white text-dark-blue-2 hover:bg-gray-50'
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                      aria-label={`Page ${index + 1}`}
                      aria-current={currentPage === index + 1 ? 'page' : undefined}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className={`min-w-[44px] min-h-[44px] px-4 py-2 border border-gray-300 rounded-r-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-1 ${
                      currentPage === totalPages || totalPages === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-dark-blue-2 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
  
        {/* Footer */}
        <Footer />
        <BackToTop />
      </div>
    </>
  );  
};

export default ProjectsPage;
