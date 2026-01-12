import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
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
  const [sortByStars, setSortByStars] = useState('desc');
  const [sortByRepos, setSortByRepos] = useState(null);
  const [viewMode, setViewMode] = useState('list');

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

  // Calculate stats
  const totalProjects = projects.length;
  const totalRepos = projects.reduce((sum, p) => sum + (p.total_repositories || 0), 0);
  const totalStars = projects.reduce((sum, p) => sum + (p.total_stars || 0), 0);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const handleSortByStars = () => {
    if (sortByStars === 'desc') {
      setSortByStars('asc');
    } else if (sortByStars === 'asc') {
      setSortByStars(null);
    } else {
      setSortByStars('desc');
    }
    setSortByRepos(null);
  };

  const handleSortByRepos = () => {
    if (sortByRepos === 'desc') {
      setSortByRepos('asc');
    } else if (sortByRepos === 'asc') {
      setSortByRepos(null);
    } else {
      setSortByRepos('desc');
    }
    setSortByStars(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white font-mono">
  
        {/* Fade-in Navbar */}
        <ScrollNavbar />

        {/* Main content */}
        <div className="flex-grow mt-12 md:mt-16">
          <div className="mt-2 md:mt-6 mb-12 bg-white max-w-7xl mx-auto px-4 md:px-8">
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
              stats={{ totalProjects, totalRepos, totalStars }}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            
            <div className="mt-4 mb-4 pb-2 pt-2">
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue-2"></div>
                </div>
              ) : currentProjects.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentProjects.map((project, index) => (
                      <ProjectCard key={index} project={project} onTagClick={handleTagClick} viewMode={viewMode} />
                    ))}
                  </div>
                ) : (
                  currentProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} onTagClick={handleTagClick} viewMode={viewMode} />
                  ))
                )
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
  
            {!loading && filteredProjects.length > 0 && totalPages > 1 && (
              <div className="flex justify-center mt-6 mb-4">
                <nav aria-label="Pagination" className="flex items-center gap-2">
                  <button
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-dark-blue hover:bg-gray-100'
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    ←
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                        currentPage === index + 1
                          ? 'bg-dark-blue text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                      aria-label={`Page ${index + 1}`}
                      aria-current={currentPage === index + 1 ? 'page' : undefined}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-dark-blue hover:bg-gray-100'
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    →
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
