import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PhoneService, Checkmark } from '../core';
import './PhoneDetail.css';

const PhoneDetail = () => {
  const { phoneId } = useParams();
  const [phone, setPhone] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPhoneDetail = async () => {
      try {
        setLoading(true);
        const data = await PhoneService.get(phoneId);
        setPhone(data);
        setMainImageIndex(0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching phone details:', error);
        setError('Error loading phone details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPhoneDetail();
  }, [phoneId]);
  
  const setImage = (index) => {
    setMainImageIndex(index);
  };
  
  if (loading) {
    return <div className="loading" data-testid="loading-indicator">Loading...</div>;
  }
  
  if (error) {
    return <div className="error" data-testid="error-message">{error}</div>;
  }
  
  if (!phone) {
    return <div className="not-found" data-testid="not-found">Phone not found</div>;
  }
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          {/* Phone header */}
          <h1 data-testid="phone-name">{phone.name}</h1>
          
          {/* Main phone image container - matching Angular structure */}
          <div className="phone-images">
            <img 
              src={phone.images[mainImageIndex]} 
              alt={phone.name} 
              className="phone selected"
              data-testid="main-image"
            />
          </div>
          
          {/* Phone description */}
          <p data-testid="phone-description">{phone.description}</p>
          
          {/* Thumbnails */}
          <ul className="phone-thumbs">
            {phone.images.map((img, index) => (
              <li key={index}>
                <img 
                  src={img}
                  onClick={() => setImage(index)}
                  alt={`${phone.name} - thumbnail ${index}`}
                  data-testid={`thumbnail-${index}`}
                />
              </li>
            ))}
          </ul>
          
          {/* Specs list - exactly matching Angular structure */}
          <ul className="specs" data-testid="specs-list">
            <li>
              <span>Availability and Networks</span>
              <dl>
                <dt>Availability</dt>
                {phone.availability && phone.availability.map((availability, index) => (
                  <dd key={index}>{availability}</dd>
                ))}
              </dl>
            </li>
            
            <li>
              <span>Battery</span>
              <dl>
                <dt>Type</dt>
                <dd>{phone.battery.type}</dd>
                <dt>Talk Time</dt>
                <dd>{phone.battery.talkTime}</dd>
                <dt>Standby time (max)</dt>
                <dd>{phone.battery.standbyTime}</dd>
              </dl>
            </li>
            
            <li>
              <span>Storage and Memory</span>
              <dl>
                <dt>RAM</dt>
                <dd>{phone.storage.ram}</dd>
                <dt>Internal Storage</dt>
                <dd>{phone.storage.flash}</dd>
              </dl>
            </li>
            
            <li>
              <span>Connectivity</span>
              <dl>
                <dt>Network Support</dt>
                <dd>{phone.connectivity.cell}</dd>
                <dt>WiFi</dt>
                <dd>{phone.connectivity.wifi}</dd>
                <dt>Bluetooth</dt>
                <dd>{phone.connectivity.bluetooth}</dd>
                <dt>Infrared</dt>
                <dd>{Checkmark(phone.connectivity.infrared)}</dd>
                <dt>GPS</dt>
                <dd>{Checkmark(phone.connectivity.gps)}</dd>
              </dl>
            </li>
            
            <li>
              <span>Android</span>
              <dl>
                <dt>OS Version</dt>
                <dd>{phone.android.os}</dd>
                <dt>UI</dt>
                <dd>{phone.android.ui}</dd>
              </dl>
            </li>
            
            <li>
              <span>Size and Weight</span>
              <dl>
                <dt>Dimensions</dt>
                {phone.sizeAndWeight.dimensions.map((dim, index) => (
                  <dd key={index}>{dim}</dd>
                ))}
                <dt>Weight</dt>
                <dd>{phone.sizeAndWeight.weight}</dd>
              </dl>
            </li>
            
            <li>
              <span>Display</span>
              <dl>
                <dt>Screen size</dt>
                <dd>{phone.display.screenSize}</dd>
                <dt>Screen resolution</dt>
                <dd>{phone.display.screenResolution}</dd>
                <dt>Touch screen</dt>
                <dd>{Checkmark(phone.display.touchScreen)}</dd>
              </dl>
            </li>
            
            <li>
              <span>Hardware</span>
              <dl>
                <dt>CPU</dt>
                <dd>{phone.hardware.cpu}</dd>
                <dt>USB</dt>
                <dd>{phone.hardware.usb}</dd>
                <dt>Audio / headphone jack</dt>
                <dd>{phone.hardware.audioJack}</dd>
                <dt>FM Radio</dt>
                <dd>{Checkmark(phone.hardware.fmRadio)}</dd>
                <dt>Accelerometer</dt>
                <dd>{Checkmark(phone.hardware.accelerometer)}</dd>
              </dl>
            </li>
            
            <li>
              <span>Camera</span>
              <dl>
                <dt>Primary</dt>
                <dd>{phone.camera.primary}</dd>
                <dt>Features</dt>
                <dd>{phone.camera.features.join(', ')}</dd>
              </dl>
            </li>
            
            <li>
              <span>Additional Features</span>
              <dd>{phone.additionalFeatures}</dd>
            </li>
          </ul>
          
          {/* Back button - matching Angular's behavior */}
          <Link to="/phones" className="btn btn-default" data-testid="back-button">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetail;
