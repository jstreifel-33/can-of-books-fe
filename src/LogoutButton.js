import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'react-bootstrap';
{/*
class LogoutButton extends Component {

  render() {
    return (
      <button onClick={this.props.onLogout}>
        Log Out
      </button>
    );
  }
};

export default LogoutButton;
*/}

const LogoutButton = () => {
  const { 
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;