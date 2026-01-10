import React, { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

// Code splitting - lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading spinner component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-dark-blue to-light-blue">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Suspense fallback={<PageLoader />}>
        <div key={location.pathname} className="page-transition">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
