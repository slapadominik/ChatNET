import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getNewMessage,
  setConnection,
  userJoined,
  userLeft,
  setConnectedUsers,
} from '../actions/messages';
import Message from './Message';
import * as SignalR from '@aspnet/signalr';
import './Main.css';
import { BASE_URL } from '../constants';
import Sidebar from './Sidebar';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      newMessage: '',
    };
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(BASE_URL + '/hubs/chat', {
        accessTokenFactory: () => this.props.user.token,
      })
      .build();
  }

  componentDidMount() {
    this.setUpConnection();
  }

  setUpConnection = () => {
    this.connection.on('messageAdded', (data) => {
      this.props.getNewMessage(data);
    });

    this.connection.on('userJoined', (username) => {
      this.props.userJoined(username);
    });

    this.connection.on('userLeft', (username) => {
      this.props.userLeft(username);
    });

    this.connection.on('setConnectedUsers', (usernames) => {
      this.props.setConnectedUsers(usernames);
    });

    this.props.setConnection(this.connection);

    this.connection.start().catch((err) => console.log(err));
  };

  getUsername = () => {
    return this.props.user.username;
  };

  handleMessageChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  handleSend = () => {
    this.connection.invoke('sendMessage', {
      from: this.getUsername(),
      content: this.state.newMessage,
    });
    this.setState({ newMessage: '' });
  };

  checkIfAuthor = (name) => {
    return this.getUsername() === name;
  };

  renderMessages = () => {
    return this.props.messages.map((message, index) => (
      <Message
        key={index}
        from={message.from}
        content={message.content}
        isAuthor={this.checkIfAuthor(message.from)}
      />
    ));
  };

  render() {
    return (
      <div className="container-fluid h-94">
        <div className="row h-100">
          <Sidebar />
          <main className="col-md-11">
            <div className="row username">
              <div className="col text-center">
                <h4>Logged as <u>{this.getUsername()}</u></h4>
              </div>
            </div>
            <div className="container-msgs mt-2">{this.renderMessages()}</div>
            <div className="row fixed-bottom">
              <div className="col-md-11 offset-md-1">
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="Type something.."
                    value={this.state.newMessage}
                    onChange={this.handleMessageChange}
                  />
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={this.handleSend}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages.messages,
  user: state.messages.user,
});

export default connect(
  mapStateToProps,
  { getNewMessage, setConnection, userJoined, userLeft, setConnectedUsers },
)(Main);
