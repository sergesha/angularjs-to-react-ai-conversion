import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PhoneService from '../../services/PhoneService';
import './PhoneList.css';

/**
 * PhoneList component - displays a list of phones with filtering and sorting capabilities
 * This is a functional component that replaces the AngularJS controller and template
 */
const PhoneList = () => {
  // State used to replace the AngularJS controller properties
  const [phones, setPhones] = useState([]);
  const [query, setQuery] = useState('');
  const [orderProp, setOrderProp] = useState('age');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch phones data on component mount - similar to ngOnInit in Angular
  useEffect(() => {
    const fetchPhones = async () => {
      setLoading(true);
      try {
        const data = await PhoneService.getAll();

        // Ensure data is an array
        if (Array.isArray(data)) {
          setPhones(data);
        } else {
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

  // Filter phones based on search query - replacing Angular's filter pipe
  const filteredPhones = Array.isArray(phones)
    ? phones.filter(phone => {
        const searchString = `${phone.name} ${phone.snippet}`.toLowerCase();
        return searchString.includes(query.toLowerCase());
      })
    : [];

  // Sort phones based on selected order - replacing Angular's orderBy pipe
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
        {/* Sidebar content - matching the AngularJS template */}
        <div className="col-md-2">
          <p>
            Search:
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-testid="search-input"
              style={{ marginTop: '5px', width: '100%' }}
            />
          </p>

          <p>
            Sort by:
            <select
              value={orderProp}
              onChange={(e) => setOrderProp(e.target.value)}
              data-testid="sort-select"
              style={{ marginTop: '5px', width: '100%' }}

            >
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </p>
        </div>

        {/* Body content - matching the AngularJS template */}
        <div className="col-md-10">
          <ul className="phones">
            <TransitionGroup>
              {sortedPhones.length > 0 ? (
                sortedPhones.map((phone) => (
                  <CSSTransition key={phone.id} classNames="phone-list-item" timeout={500}>
                    <li className="thumbnail phone-list-item">
                      <Link to={`/phones/${phone.id}`} className="thumb">
                        <img
                          src={PhoneService.getImageUrl(phone.imageUrl)}
                          alt={phone.name}
                        />
                      </Link>
                      <Link to={`/phones/${phone.id}`}>{phone.name}</Link>
                      <p>{phone.snippet}</p>
                    </li>
                  </CSSTransition>
                ))
              ) : (
                <CSSTransition classNames="phone-list-item" timeout={500}>
                  <div>
                    <p>No phones found</p>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhoneList;
