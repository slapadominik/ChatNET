import React from 'react';
import { useSelector } from 'react-redux';
import './Sidebar.css';

const Sidebar = () => {
  const users = useSelector((state) => state.messages.connectedUsers);
  const user = useSelector((state) => state.messages.user);

  let renderUsers = (users) => {
    return users.map((username, index) => {
      if (username === user.username) {
        return (
          <div key={index}>
            <span className="dot mr-1" />
            {username}  (You)
          </div>
        );
      }
      return (
        <div key={index}>
          <span className="dot mr-1" />
          {username}
        </div>
      );
    });
  };
  return (
    <nav className="col-md-1 d-none d-md-block sidebar h-100 bg-dark">
      <h4>Online</h4>
      <ul className="nav-list">{renderUsers(users)}</ul>
    </nav>
  );
};

export default Sidebar;
