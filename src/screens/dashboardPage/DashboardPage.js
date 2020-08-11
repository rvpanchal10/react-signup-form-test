import React, { useContext }  from 'react';

import { UserContext } from '../../contexts/UserContext';

import { clearLocalStorage } from '../../utils/localStorage';

function DashboardPage() {
  const userState = useContext(UserContext);

  const logoutUser = async () => {
    userState.logout();
    clearLocalStorage();
  };

  const getInitials = (string) => {
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <div className="wall-wrapper">
      <div className="user-profile shadow">
        <h2>Welcome New User</h2>
        <div className="user-detail-wrapper">
          <div className="user-avatar">
            <span>{userState?.firstName && userState?.lastName ? getInitials(`${userState?.firstName} ${userState?.lastName}`) : ''}</span>
          </div>
          <div className="username">
              <p>{userState?.firstName && userState?.lastName ? `${userState?.firstName} ${userState?.lastName}` : ''}</p>
          </div>
        </div>
        <div className="user-logout"> 
          <button type="button" className="btn-logout btn btn-primary" onClick={() => logoutUser()}>Logout</button>
        </div>
      </div>
      <div className="main-wrapper container">
        <div className="row">
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;