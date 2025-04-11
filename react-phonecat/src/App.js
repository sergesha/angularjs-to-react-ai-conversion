import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PhoneList from './components/PhoneList/PhoneList';
import PhoneDetail from './components/PhoneDetail/PhoneDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>Phone Catalog</h1>
        </div>
      </header>
      <div className="view-container">
        <div className="view-frame">
          <Routes>
            <Route path="/" element={<Navigate to="/phones" replace={true} />} />
            <Route path="/phones" element={<PhoneList />} />
            <Route path="/phones/:phoneId" element={<PhoneDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
