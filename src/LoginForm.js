import { Component } from "react";
import { Form } from 'react-bootstrap';

class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state={
      formEmail: 'asdf',
      formUsername: 'adsf'
    }
  }

  handleEmailChange = (e) =>{
    this.setState({
      formEmail: e.target.value
    })
  }

  handleUsernameChange = (e) =>{
    this.setState({
      formUsername: e.target.value
    })
  }
  
  render() {
    /* TODO: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
      <Form>
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={this.handleEmailChange} type="email" placeholder="Enter your email" value={this.state.formEmail}></Form.Control>
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={this.handleUsernameChange} type="text" placeholder="Enter your username" value={this.state.formUsername}></Form.Control>
      </Form>
    );
  }
};

export default LoginForm;
