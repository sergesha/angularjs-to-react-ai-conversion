import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PhoneService from '../../services/PhoneService';
import checkmark from '../../utils/checkmark';
import './PhoneDetail.css';

/**
 * PhoneDetail component - displays detailed information about a specific phone
 * This is a functional component that replaces the AngularJS controller and template
 */
const PhoneDetail = () => {
  const { phoneId } = useParams();
  const [phone, setPhone] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch phone details on component mount or when phoneId changes
  useEffect(() => {
    const fetchPhone = async () => {
      setLoading(true);
      try {
        const data = await PhoneService.get(phoneId);

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

  // Function to set the main image - replacing Angular's ng-click behavior
  const setImage = (imageUrl) => {
    setMainImageUrl(imageUrl);
  };

  if (loading) {
    return <div className="loading" data-testid="loading-indicator">Loading phone details...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error" data-testid="error-message">{error}</div>
        <Link to="/phones" className="btn btn-default mt-3" data-testid="back-button">Back to Phone List</Link>
      </div>
    );
  }

  if (!phone) {
    return (
      <div>
        <div className="error" data-testid="not-found">Phone not found</div>
        <Link to="/phones" className="btn btn-default mt-3" data-testid="back-button">Back to Phone List</Link>
      </div>
    );
  }

  return (
    <div className="phone-detail">
      {/* Main phone image container - Exactly matching the Angular structure */}
      <div className="phone-images">
        <TransitionGroup>
          {phone.images && phone.images.map((img) => (
            <CSSTransition key={img} classNames="phone-image" timeout={300}>
              <img
                src={PhoneService.getImageUrl(img)}
                className={`phone ${img === mainImageUrl ? 'selected' : ''}`}
                alt={phone.name}
                data-testid={img === mainImageUrl ? "main-image" : undefined}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      {/* Phone header */}
      <h1 data-testid="phone-name">{phone.name}</h1>

      {/* Phone description */}
      <p data-testid="phone-description">{phone.description}</p>

      {/* Thumbnails */}
      <ul className="phone-thumbs">
        {phone.images && phone.images.map((img, index) => (
          <li key={index}>
            <img
              src={PhoneService.getImageUrl(img)}
              onClick={() => setImage(img)}
              alt={`${phone.name} - thumbnail ${index}`}
              data-testid={`thumbnail-${index}`}
            />
          </li>
        ))}
      </ul>

      {/* Specs list - matching Angular structure */}
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

      {/* Back button */}
      <Link to="/phones" className="btn btn-default" data-testid="back-button">Back</Link>
    </div>
  );
};

export default PhoneDetail;
