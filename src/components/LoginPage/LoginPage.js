import React, { Component } from 'react';
import { connect } from 'react-redux';


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    checked: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.history.push('/home')
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    console.log('event:',event.target.value);   
    this.setState({
      [propertyName]: event.target.value,
    });
  }// end handleInputChangeFor

render() {
    console.log('checked:',this.state);
    
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form className="box" onSubmit={this.login}>
          <h2>Login</h2>
          <div>
            <label className="labelClass" htmlFor="username">
              For student, use first name :
              <input
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label className="labelClass" htmlFor="password">
              For student, use lunch code :
              <input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div className="loginRegister">
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
                   
              <button
              type="button"
              className="link-button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
              >
              Register
              </button>       
          </div>
        </form> 
      </div>
      
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
