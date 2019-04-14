import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../actions'

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        if(name){
            if(name === 'username'){
               this.setState({
                   username: value
               }) 
            }
            if(name === 'password'){
               this.setState({
                   password: value
               }) 
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        if(username && password){
            console.log(this.props)
            this.props.loginUser();
        }else {
            
        }
        this.setState({
            submitted: true
        })
      
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input onChange={this.handleChange} type="text" className="form-control username" name="username" />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" name="password"/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {
    console.log(121, 'dispatch called')
    return {
        loginUser: bindActionCreators(userActions.login, dispatch)
    }

}

export  { connect(mapStateToProps, mapDispatchToProps)(LoginPage) };

