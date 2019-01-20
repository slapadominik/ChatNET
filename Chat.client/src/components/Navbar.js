import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { logout } from '../actions/messages';
import { connect } from 'react-redux';


class Navbar extends Component {

    logout = () => {
        this.props.logout();
        this.props.connection.stop();
    }

    renderUsers = () => {
        console.log(this.props.connectedUsers)
        return this.props.connectedUsers.map((username, index) => 
            <div key={index}>{username} <span className="dot"/></div>
        )
    }

    render() {
        if(this.props.user==null) {
            return null;
        }

        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Chat</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">Main Chat</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Private Channels</Link>
                    </li>
                    <li className="nav-item" onClick={this.logout}>
                        <Link to="/logout" className="nav-link">Logout</Link>
                    </li>
                    </ul>
                </div>
                <div id="sidebar-wrapper" className="sidebar-toggle">
                    <div className="sidebar-brand">
                        <h4>Online users</h4>
                    </div>
                    <ul className="sidebar-nav">
                        {this.renderUsers()}
                    </ul>
                </div>
                </nav>
        )
    }
}

const mapStateToProps = state => ({
    user: state.messages.user,
    connection: state.messages.connection,
    connectedUsers: state.messages.connectedUsers
});

export default connect(mapStateToProps, { logout })(Navbar)