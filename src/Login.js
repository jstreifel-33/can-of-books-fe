import React from 'react';
import Card from 'react-bootstrap/Card';
import './Login.css';
import LoginButton from './LoginButton.js'
import LoginForm from './LoginForm.js'

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state={
      showForm: false
    }
  }

  showForm = () => {
    this.setState({
      showForm: true
    })
  }

  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click Below to Log In
          </Card.Text>
          {this.state.showForm ? <LoginForm/> : <LoginButton showForm={this.showForm}/>}
        </Card.Body>
      </Card>
    )
  }
}

export default Login;
