import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/messages';
import { connect } from 'react-redux';
import "../../node_modules/jquery/dist/jquery.min.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

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
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav float-right">
            <li className="nav-item " onClick={this.logout}>
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
