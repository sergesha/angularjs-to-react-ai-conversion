import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PhoneList from './components/PhoneList/PhoneList';
import PhoneDetail from './components/PhoneDetail/PhoneDetail';
import './App.css';
import './utils/animations/animations.css';

/**
 * Main App component - sets up routing for the application
 * This replaces the AngularJS ngRoute module configuration
 */
function App() {
  return (
    <Router>
      <div className="app">
        <div className="view-container">
          <div className="view-frame">
            <Routes>
              <Route path="/phones" element={<PhoneList />} />
              <Route path="/phones/:phoneId" element={<PhoneDetail />} />
              <Route path="*" element={<Navigate replace to="/phones" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
