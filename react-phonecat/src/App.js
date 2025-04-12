import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PhoneList from './components/PhoneList/PhoneList';
import PhoneDetail from './components/PhoneDetail/PhoneDetail';
import './App.css';
import './app.animations.css';

// Wrapper component to handle animations between routes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup className="view-container">
      <CSSTransition key={location.key} classNames="view-frame" timeout={500}>
        <div className="view-frame">
          <Routes location={location}>
            <Route path="/phones" element={<PhoneList />} />
            <Route path="/phones/:phoneId" element={<PhoneDetail />} />
            <Route path="*" element={<Navigate replace to="/phones" />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

/**
 * Main App component - sets up routing for the application
 * This replaces the AngularJS ngRoute module configuration
 */
function App() {
  return (
    <Router>
      <div className="app">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
