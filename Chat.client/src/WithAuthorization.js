import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isUserLoggedIn } from './Authorization';

export default function WithAuthorization (ComposedComponent) {
    return class Authorization extends Component {
        render() {
            if(isUserLoggedIn()) {
                return(
                    <ComposedComponent {...this.props} />
                )
            }
            return (
                <Redirect to="/login"/>
            );
        }
    }
}