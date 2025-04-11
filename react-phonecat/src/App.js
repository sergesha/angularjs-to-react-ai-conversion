import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PhoneList from './phone-list/PhoneList';
import PhoneDetail from './phone-detail/PhoneDetail';
import './App.css';
import './app.animations.css';

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
