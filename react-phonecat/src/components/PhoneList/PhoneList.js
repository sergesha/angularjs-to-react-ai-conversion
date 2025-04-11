import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhoneService from '../../services/PhoneService';
import './PhoneList.css';

const PhoneList = () => {
  // State used to replace the AngularJS controller
  const [phones, setPhones] = useState([]);
  const [query, setQuery] = useState('');
  const [orderProp, setOrderProp] = useState('age');

  // Fetch phones data on component mount
  useEffect(() => {
    const fetchPhones = async () => {
      const data = await PhoneService.getPhones();
      setPhones(data);
    };

    fetchPhones();
  }, []);

  // Filter phones based on search query
  const filteredPhones = phones.filter((phone) => {
    const searchString = `${phone.name} ${phone.snippet}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });

  // Sort phones based on selected order
  const sortedPhones = [...filteredPhones].sort((a, b) => {
    if (orderProp === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a[orderProp] - b[orderProp];
    }
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {/* Sidebar content */}
          <p>
            Search:
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control"
            />
          </p>

          <p>
            Sort by:
            <select
              value={orderProp}
              onChange={(e) => setOrderProp(e.target.value)}
              className="form-control"
            >
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </p>
        </div>

        <div className="col-md-10">
          {/* Body content */}
          <ul className="phones">
            {sortedPhones.length > 0 ? (
              sortedPhones.map((phone) => (
                <li key={phone.id} className="thumbnail phone-list-item">
                  <Link to={`/phones/${phone.id}`} className="thumb">
                    <img src={phone.imageUrl} alt={phone.name} />
                  </Link>
                  <Link to={`/phones/${phone.id}`}>{bphone.name}</Link>
                  <p>{bphone.snippet}</p>
                </li>
              ))
            ) : (
              <p>No phones found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhoneList;
