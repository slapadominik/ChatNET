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
import { isNullOrEmpty } from '../helpers/StringHelpers';
import moment from 'moment'

class Main extends Component {
  constructor() {
    super();
    this.state = {
      newMessage: '',
      date: new Date()
    };
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(BASE_URL + '/hubs/chat', {
        accessTokenFactory: () => this.props.user.token,
      })
      .configureLogging(SignalR.LogLevel.None)
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
    let msg = this.state.newMessage;
    if (!isNullOrEmpty(msg)) {
      this.connection.invoke('sendMessage', {
        from: this.getUsername(),
        content: msg,
      });
      this.setState({ newMessage: '' });
    } else {
      this.setState({ newMessage: '' });
    }
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
        date={message.date}
        isAuthor={this.checkIfAuthor(message.from)}
      />
    ));
  };

  handleMessageKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSend();
    }
  };

  render() {
    return (
      <div className="container-fluid h-94">
        <div className="row h-100">
          <Sidebar />
          <main className="col-md-11">
            <h6 className="text-center text-secondary mt-3">{moment(this.state.date).format('DD-MM-YYYY')}</h6>
            <div className="container-msgs mt-3">{this.renderMessages()}</div>
            <div className="row fixed-bottom">
              <div className="col-md-11 offset-md-1">
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="Type message.."
                    value={this.state.newMessage}
                    onChange={this.handleMessageChange}
                    onKeyDown={this.handleMessageKeyDown}
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
