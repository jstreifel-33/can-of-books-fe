import { Component } from "react";
import {withAuth0} from '@auth0/auth0-react';
import { Container,Image } from 'react-bootstrap';


class Profile extends Component {

  render() {
    /* TODO: render information about logged in user */
    /* STRETCH TODO: if no logged in user then redirect home */
    return (
      <Container style={{paddingTop:'5px'}}>
        <div>
          <Image src={this.props.auth0.user.picture} alt={'Profile'} style={{display: 'inlineBlock'}} />
          <p>Username: {this.props.auth0.user.nickname}</p>
          <p>Email: {this.props.auth0.user.email}</p>
        </div>
      </Container>
    )
  }
};

export default withAuth0(Profile);
