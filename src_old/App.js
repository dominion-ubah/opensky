import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './components/HomePage';
import LoginPage from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import store from './reducers/store';
export class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
        });
    }

    render() {
        const { alert } = this.props;
        return (
        <Provider store={store}>
              <div className="container">
                  <div className="col-sm-8 col-sm-offset-2">
                    <LoginPage />
                  </div>
              </div>
        </Provider>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}