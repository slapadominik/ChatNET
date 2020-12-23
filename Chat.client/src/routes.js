import React from 'react';
import { Route } from 'react-router-dom';
import Main from './components/Main';
import WithAuthorization from './WithAuthorization';
import Logout from './components/Logout';
import Navbar from './components/Navbar'
import Login from './components/Login';

export default (
    <div className="h-100">
        <Navbar />
        <Route exact path="/" component={WithAuthorization(Main)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={WithAuthorization(Logout)} />
    </div>
)