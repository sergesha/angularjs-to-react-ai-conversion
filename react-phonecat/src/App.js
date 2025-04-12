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
    <div className="view-container">
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="view-frame"
          timeout={1000} // Match Angular's 1s animation duration
        >
          <div className="view-frame">
            <Routes location={location}>
              <Route path="/phones" element={<PhoneList />} />
              <Route path="/phones/:phoneId" element={<PhoneDetail />} />
              <Route path="*" element={<Navigate replace to="/phones" />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
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
