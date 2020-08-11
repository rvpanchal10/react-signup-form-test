import React from 'react';
import NotFound404 from '../../assets/images/404.svg';

function NoContentPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-box">
        <div className="not-found-box-inner">
          <img src={NotFound404} alt="Not Found" />
          <h2>404</h2>
          <h3>NOT FOUND</h3>
        </div>
      </div>
    </div>
  );
}

export default NoContentPage;