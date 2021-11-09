import { Component } from "react";

class Profile extends Component {

  render() {
    /* TODO: render information about logged in user */
    /* STRETCH TODO: if no logged in user then redirect home */
    return (
      <>
        <p>Username: {this.props.userInfo.user}</p>
        <p>Email: {this.props.userInfo.email}</p>
      </>
    )
  }
};

export default Profile;
