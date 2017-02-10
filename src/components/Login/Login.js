import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import './Login.css';
import {login} from '../../ducks/userDuck';

class Login extends React.Component {
  constructor(props){
    super(props);

  }

  handleChange(field, event){
    this.setState({[field]: event.target.value});
  }

  login(){
    this.props.login({
      username: document.getElementById(username),
      email: document.getElementById(email)
    });
    browserHistory.push("/shop");

  }
componentDidMount(){
  console.log("re-rendered");
}
  render(){
    return(
      <div>
        <form className='login-form'>
          <input
            id="username"
            onChange={this.handleChange.bind(this, 'username')}
            placeholder="Username"
            type='text'
            value={this.props.username} />
          <input
            id="email"
            onChange={this.handleChange.bind(this, 'email')}
            placeholder="Email"
            type='text'
            value={this.props.email} />
          <button
            onClick={this.login.bind(this)}
            type='submit'>
            Login
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    username: state.username,
    email: state.email
  }
}

const mapDispatchToActionCreators = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToActionCreators)(Login);
