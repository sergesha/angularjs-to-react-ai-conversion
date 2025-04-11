import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhoneService from '../../services/PhoneService';
import './PhoneList.css';

const PhoneList = () => {
  // State used to replace the AngularJS controller
  const [phones, setPhones] = useState([]);
  const [query, setQuery] = useState('');
  const [orderProp, setOrderProp] = useState('age');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch phones data on component mount
  useEffect(() => {
    const fetchPhones = async () => {
      setLoading(true);
      try {
        console.log('Fetching phones...');
        const data = await PhoneService.getPhones();
        console.log('Phones data received:', data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          setPhones(data);
        } else {
          console.error('Phones data is not an array:', data);
          setError('Invalid phone data format. Please try again later.');
          setPhones([]);
        }
      } catch (err) {
        console.error('Error fetching phones:', err);
        setError('Failed to load phones. Please try again later.');
        setPhones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  // Filter phones based on search query
  const filteredPhones = Array.isArray(phones)
    ? phones.filter(phone => {
        const searchString = `${phone.name} ${phone.snippet}`.toLowerCase();
        return searchString.includes(query.toLowerCase());
      })
    : [];

  // Sort phones based on selected order
  const sortedPhones = [...filteredPhones].sort((a, b) => {
    if (orderProp === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a.age - b.age;
    }
  });

  if (loading) {
    return <div className="loading">Loading phones...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Top controls for search and sort */}
        <div className="search-controls col-md-12">
          <div className="search-box">
            <p>
              Search:
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-control"
              />
            </p>
          </div>
          <div className="sort-box">
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
        </div>

        {/* Phone list */}
        <div className="col-md-12">
          <ul className="phones">
            {sortedPhones.length > 0 ? (
              sortedPhones.map((phone) => (
                <li key={phone.id} className="thumbnail phone-list-item">
                  <Link to={`/phones/${phone.id}`} className="thumb">
                    <img
                      src={PhoneService.getImageUrl(phone.imageUrl)}
                      alt={phone.name}
                      onError={(e) => {
                        console.log(`Error loading image: ${e.target.src}`);
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = '/assets/img/phones/placeholder.svg';
                      }}
                    />
                  </Link>
                  <Link to={`/phones/${phone.id}`} className="phone-name">{phone.name}</Link>
                  <p className="phone-snippet">{phone.snippet}</p>
                </li>
              ))
            ) : (
              <div>
                <p>No phones found</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhoneList;
