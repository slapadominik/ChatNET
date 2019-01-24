import React, { Component } from 'react';
import { login } from '../actions/messages';
import { connect } from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../constants';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
        }
    }

    handleLogin = () => {
        axios.post(BASE_URL+'/api/user', {
            username: this.state.username
        }).then(response => {
            if (response.status===201){
                this.props.login(response.data);
                this.props.history.push('/')
            }
        }).catch(error => {
            if (error.response) {
                alert(error.response.data);
            }
            else{
                alert(error + '. Probably problem with CORS on the server side.')
            }
        });
    }

    handleUsernameChange = e => {
        this.setState({username: e.target.value})
    }

    render() {
        const { username } = this.state;
        return (
            <div style={{marginTop: '150px'}} className={"container"}>
                <input
                    className={"form-control"}
                    placeholder="Enter your username"
                    value={username}
                    type="text"
                    onChange={this.handleUsernameChange}
                />
                <button className={"btn btn-warning"} onClick={this.handleLogin}>Login</button>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    login: state.messages.username
});

export default connect(mapStateToProps, { login })(Login)