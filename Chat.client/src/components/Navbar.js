import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { logout } from '../actions/messages';
import { connect } from 'react-redux';

class Navbar extends Component {
  logout = () => {
    this.props.logout();
    this.props.connection.stop();
  };

  render() {
    if (this.props.user == null) {
      return null;
    }

    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <b>Chat.NET</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" onClick={this.logout}>
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.messages.user,
  connection: state.messages.connection,
  connectedUsers: state.messages.connectedUsers,
});

export default connect(
  mapStateToProps,
  { logout },
)(Navbar);
