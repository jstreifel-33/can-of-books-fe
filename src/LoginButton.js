import { Button } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';

{/*
export default class LoginButton extends Component {

  

  handleClick = () =>{
    this.props.showForm();
  }

  

  render() {

    return (
    <Button onClick={this.handleClick}>Log In</Button>
    )
  }
}
*/}



function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <Button onClick={loginWithRedirect}>Log in</Button>
  );
}

export default LoginButton;