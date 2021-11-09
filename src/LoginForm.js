import { Component } from "react";
import { Form, Button } from 'react-bootstrap';

class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state={
      formEmail: '',
      formUsername: ''
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
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.loginHandler(this.state.formUsername, this.state.formEmail);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={this.handleEmailChange} type="email" placeholder="Enter your email" value={this.state.formEmail}></Form.Control>
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={this.handleUsernameChange} type="text" placeholder="Enter your username" value={this.state.formUsername}></Form.Control>
        <Button type="submit">Login</Button>
      </Form>
    );
  }
};

export default LoginForm;
