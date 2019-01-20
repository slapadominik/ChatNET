import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNewMessage, setConnection, userJoined, userLeft, setConnectedUsers } from '../actions/messages';
import Message from './Message';
import * as SignalR from '@aspnet/signalr';
import './Main.css';
import {BASE_URL} from '../constants';

class Main extends Component {
constructor() {
    super();
    this.state={
        newMessage: '',
    }
    this.connection = new SignalR.HubConnectionBuilder()
    .withUrl(BASE_URL+'/hubs/chat', { accessTokenFactory: () => this.props.user.token })
    .build();
}

componentDidMount() {
    this.setUpConnection();
}

setUpConnection = () => {
    this.connection.on("messageAdded", data => {
        this.props.getNewMessage(data);
    });

    this.connection.on("userJoined", username => {
        this.props.userJoined(username);
    });

    this.connection.on("userLeft", username => {
        this.props.userLeft(username);
    })

    this.connection.on("setConnectedUsers", usernames => {
        console.log(usernames);
        this.props.setConnectedUsers(usernames);
    });

    this.props.setConnection(this.connection);
    
    this.connection
            .start()
            .then(() => console.log("Connection success"))
            .catch(err => console.log(err))
}

getUsername = () => {
    return this.props.user.username;
}

handleMessageChange = e => {
    this.setState({newMessage: e.target.value})
}

handleSend = () => {
    this.connection.invoke("sendMessage", {
            from: this.getUsername(),
            content: this.state.newMessage,
        })
    this.setState({newMessage: ''})
}

checkIfAuthor = name => {
    return this.getUsername() === name
}

renderMessages = () => {
    return this.props.messages.map((message, index) => 
        <Message key={index} from={message.from} content={message.content} isAuthor={this.checkIfAuthor(message.from)} />
    )
}

    render() {
        return (
            <div className="container">
                <div className="row username">
                    <div className="col-6 offset-6">
                        <h4>User: {this.getUsername()}</h4>
                    </div>   
                </div>
                {this.renderMessages()}
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">
                    <div className="input-group">
                        <input
                                className="form-control"
                                placeholder="Type something.."
                                value={this.state.newMessage}
                                onChange={this.handleMessageChange}
                            />
                        <div className="input-group-prepend">
                           <button className="btn btn-warning btn-block" onClick={this.handleSend}>Send</button>
                        </div>
                    </div>
                    </div>
                </div>              
            </div>
        )
    }
}

const mapStateToProps = state => ({
    messages: state.messages.messages,
    user: state.messages.user
});

export default connect(mapStateToProps, { getNewMessage, setConnection, userJoined, userLeft, setConnectedUsers })(Main)