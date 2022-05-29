import {
  faFlag,
  faShippingFast,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function BusinessSummary() {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full my-4">
      <div className="stat">
        <div className="stat-title">
          <FontAwesomeIcon icon={faFlag} style={{ color: 'brown' }} size="3x" />
        </div>
        <div className="stat-title">COUNTRIES</div>
        <div className="stat-value">20+</div>
      </div>

      <div className="stat">
        <div className="stat-title">
          <FontAwesomeIcon
            icon={faShippingFast}
            style={{ color: 'brown' }}
            size="3x"
          />
        </div>
        <div className="stat-title">SHIPPING</div>
        <div className="stat-value">125+</div>
      </div>

      <div className="stat">
        <div className="stat-title">
          <FontAwesomeIcon
            icon={faUsers}
            style={{ color: 'brown' }}
            size="3x"
          />
        </div>
        <div className="stat-title">CLIENTS</div>
        <div className="stat-value">79+</div>
      </div>
    </div>
  );
}

export default BusinessSummary;
