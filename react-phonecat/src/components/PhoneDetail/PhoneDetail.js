import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PhoneService from '../../services/PhoneService';
import checkmark from '../../utils/checkmark';
import './PhoneDetail.css';

const PhoneDetail = () => {
  const { phoneId } = useParams();
  const [phone, setPhone] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhone = async () => {
      setLoading(true);
      try {
        console.log(`Fetching phone with ID: ${phoneId}`);
        const data = await PhoneService.getPhone(phoneId);
        console.log(`Phone ${phoneId} data received:`, data);
        
        if (data) {
          setPhone(data);
          if (data.images && data.images.length > 0) {
            setMainImageUrl(data.images[0]);
          }
          setError(null);
        } else {
          setError('Phone not found');
        }
      } catch (err) {
        console.error('Error fetching phone details:', err);
        setError('Failed to load phone details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhone();
  }, [phoneId]);

  const setImage = (imageUrl) => {
    setMainImageUrl(imageUrl);
  };

  if (loading) {
    return <div className="loading">Loading phone details...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <Link to="/phones" className="btn btn-primary mt-3">Back to Phone List</Link>
      </div>
    );
  }

  if (!phone) {
    return (
      <div>
        <div className="error">Phone not found</div>
        <Link to="/phones" className="btn btn-primary mt-3">Back to Phone List</Link>
      </div>
    );
  }

  return (
    <div className="phone-detail">
      <div className="phone-images">
        {phone.images && phone.images.map((img, index) => (
          <img 
            key={index}
            src={PhoneService.getImageUrl(img)} 
            alt={phone.name} 
            className={`phone ${img === mainImageUrl ? 'selected' : ''}`}
            onError={(e) => {
              console.log(`Error loading image: ${e.target.src}`);
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = '/assets/img/phones/placeholder.svg';
            }}
          />
        ))}
      </div>

      <h1>{phone.name}</h1>

      <p>{phone.description}</p>

      <ul className="phone-thumbs">
        {phone.images && phone.images.map((img, index) => (
          <li key={index}>
            <img 
              src={PhoneService.getImageUrl(img)} 
              alt={`${phone.name} thumbnail ${index}`}
              onClick={() => setImage(img)}
              onError={(e) => {
                console.log(`Error loading thumbnail: ${e.target.src}`);
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = '/assets/img/phones/placeholder.svg';
              }}
            />
          </li>
        ))}
      </ul>

      <ul className="specs">
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
            <dd>{phone.battery && phone.battery.type}</dd>
            <dt>Talk Time</dt>
            <dd>{phone.battery && phone.battery.talkTime}</dd>
            <dt>Standby time (max)</dt>
            <dd>{phone.battery && phone.battery.standbyTime}</dd>
          </dl>
        </li>
        <li>
          <span>Storage and Memory</span>
          <dl>
            <dt>RAM</dt>
            <dd>{phone.storage && phone.storage.ram}</dd>
            <dt>Internal Storage</dt>
            <dd>{phone.storage && phone.storage.flash}</dd>
          </dl>
        </li>
        <li>
          <span>Connectivity</span>
          <dl>
            <dt>Network Support</dt>
            <dd>{phone.connectivity && phone.connectivity.cell}</dd>
            <dt>WiFi</dt>
            <dd>{phone.connectivity && phone.connectivity.wifi}</dd>
            <dt>Bluetooth</dt>
            <dd>{phone.connectivity && phone.connectivity.bluetooth}</dd>
            <dt>Infrared</dt>
            <dd dangerouslySetInnerHTML={{ 
              __html: checkmark(phone.connectivity && phone.connectivity.infrared) 
            }} />
            <dt>GPS</dt>
            <dd dangerouslySetInnerHTML={{ 
              __html: checkmark(phone.connectivity && phone.connectivity.gps) 
            }} />
          </dl>
        </li>
        <li>
          <span>Android</span>
          <dl>
            <dt>OS Version</dt>
            <dd>{phone.android && phone.android.os}</dd>
            <dt>UI</dt>
            <dd>{phone.android && phone.android.ui}</dd>
          </dl>
        </li>
        <li>
          <span>Size and Weight</span>
          <dl>
            <dt>Dimensions</dt>
            {phone.sizeAndWeight && phone.sizeAndWeight.dimensions && 
             phone.sizeAndWeight.dimensions.map((dim, index) => (
              <dd key={index}>{dim}</dd>
            ))}
            <dt>Weight</dt>
            <dd>{phone.sizeAndWeight && phone.sizeAndWeight.weight}</dd>
          </dl>
        </li>
        <li>
          <span>Display</span>
          <dl>
            <dt>Screen size</dt>
            <dd>{phone.display && phone.display.screenSize}</dd>
            <dt>Screen resolution</dt>
            <dd>{phone.display && phone.display.screenResolution}</dd>
            <dt>Touch screen</dt>
            <dd dangerouslySetInnerHTML={{ 
              __html: checkmark(phone.display && phone.display.touchScreen) 
            }} />
          </dl>
        </li>
        <li>
          <span>Hardware</span>
          <dl>
            <dt>CPU</dt>
            <dd>{phone.hardware && phone.hardware.cpu}</dd>
            <dt>USB</dt>
            <dd>{phone.hardware && phone.hardware.usb}</dd>
            <dt>Audio / headphone jack</dt>
            <dd>{phone.hardware && phone.hardware.audioJack}</dd>
            <dt>FM Radio</dt>
            <dd dangerouslySetInnerHTML={{ 
              __html: checkmark(phone.hardware && phone.hardware.fmRadio) 
            }} />
            <dt>Accelerometer</dt>
            <dd dangerouslySetInnerHTML={{ 
              __html: checkmark(phone.hardware && phone.hardware.accelerometer) 
            }} />
          </dl>
        </li>
        <li>
          <span>Camera</span>
          <dl>
            <dt>Primary</dt>
            <dd>{phone.camera && phone.camera.primary}</dd>
            <dt>Features</dt>
            <dd>{phone.camera && phone.camera.features && phone.camera.features.join(', ')}</dd>
          </dl>
        </li>
        <li>
          <span>Additional Features</span>
          <dd>{phone.additionalFeatures}</dd>
        </li>
      </ul>
      
      <div style={{ clear: 'both', paddingTop: '1em' }}>
        <Link to="/phones" className="btn btn-primary">Back to Phone List</Link>
      </div>
    </div>
  );
};

export default PhoneDetail;
