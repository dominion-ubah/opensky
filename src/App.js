import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';

export class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
        });

        history.listen((location, action) => {
        });
    }

    render() {
        const { alert } = this.props;
        console.log("alert", alert)
        return (
            <div className="container">
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}




export default connect(mapStateToProps)(App)
