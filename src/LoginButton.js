import { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class LoginButton extends Component {

  

  handleClick = () =>{
    this.props.showForm();
  }

  render() {

    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return (
    <Button onClick={this.handleClick}>Log In</Button>
    )
  }
}
