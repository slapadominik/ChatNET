import React from 'react';
import { Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import WithAuthorization from './WithAuthorization';
import Logout from './components/Logout';
import Navbar from './components/Navbar'

export default (
    <div>
        <Navbar />
        <Route exact path="/" component={WithAuthorization(Main)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={WithAuthorization(Logout)} />
    </div>
)