import React, { Component } from 'react';
import { login } from '../actions/messages';
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../constants';
import Mailbox from '../images/mailbox.svg';
import '../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  handleLogin = () => {
    axios
      .post(BASE_URL + '/api/user', {
        username: this.state.username,
      })
      .then((response) => {
        if (response.status === 201) {
          this.props.login(response.data);
          this.props.history.push('/');
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data);
        } else {
          alert(error + '. Probably problem with CORS on the server side.');
        }
      });
  };

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  render() {
    const { username } = this.state;
    return (
      <div className="d-flex align-items-center h-100">
        <div className="container text-center">
          <h1>Chat.NET</h1>
          <img src={Mailbox} className="photo" alt="mailbox" />
          <div className="input-group col-md-6 mx-auto">
            <input
              className={'form-control'}
              placeholder="Enter your username"
              value={username}
              type="text"
              onChange={this.handleUsernameChange}
            />
            <button className={'btn btn-warning'} onClick={this.handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  login: state.messages.username,
});

export default connect(
  mapStateToProps,
  { login },
)(Login);
