import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PhoneList from './components/PhoneList/PhoneList';
import PhoneDetail from './components/PhoneDetail/PhoneDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center mt-3">Google Phone Gallery</h1>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/phones" replace={true} />} />
          <Route path="/phones" element={<PhoneList />} />
          <Route path="/phones/:phoneId" element={<PhoneDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
