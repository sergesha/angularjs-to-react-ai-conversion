import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PhoneService } from '../core';
import './PhoneList.css';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [query, setQuery] = useState('');
  const [orderProp, setOrderProp] = useState('age');
  
  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const data = await PhoneService.getAll();
        setPhones(data);
      } catch (error) {
        console.error('Error fetching phone data:', error);
      }
    };
    
    fetchPhones();
  }, []);
  
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  
  const handleOrderPropChange = (event) => {
    setOrderProp(event.target.value);
  };
  
  // Filter phones by query - matching Angular's filtering logic
  const filteredPhones = phones.filter(phone => {
    const lowerQuery = query.toLowerCase();
    return phone.name.toLowerCase().includes(lowerQuery) ||
           phone.snippet.toLowerCase().includes(lowerQuery);
  });
  
  // Sort phones by selected property - matching Angular's sorting logic
  const sortedPhones = [...filteredPhones].sort((a, b) => {
    if (orderProp === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a.age - b.age; // Make sure sorting by age works exactly like Angular
    }
  });
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {/* Sidebar content - exactly matching Angular structure */}
          <p>
            Search:
            <input 
              value={query}
              onChange={handleQueryChange}
              data-testid="search-input"
              className="form-control"
            />
          </p>
          
          <p>
            Sort by:
            <select 
              value={orderProp}
              onChange={handleOrderPropChange}
              data-testid="sort-select"
              className="form-control"
            >
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </p>
        </div>
        
        <div className="col-md-10">
          {/* Body content - exactly matching Angular structure */}
          <ul className="phones">
            {sortedPhones.map(phone => (
              <li key={phone.id} className="thumbnail">
                <Link to={`/phones/${phone.id}`} className="thumb">
                  <img 
                    src={`${process.env.PUBLIC_URL}/${phone.imageUrl}`} 
                    alt={phone.name}
                  />
                </Link>
                <Link to={`/phones/${phone.id}`} className="name">{phone.name}</Link>
                <p>{phone.snippet}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhoneList;
