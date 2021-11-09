import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import BestBooks from './BestBooks';
import Profile from './Profile.js'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: null,
    }
  }

  loginHandler = (user, email) => {
    this.setState({
      user,
      email
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
      email: null
    })
  }

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
             { this.state.user ? <BestBooks email={this.state.email}/> : <Login loginHandler={this.loginHandler}/>}
            </Route>
            <Route path="/profile">
            <Profile userInfo = {this.state}/>
            </Route>
          </Switch>
          <Footer/>
        </Router>
      </>
    )
  }
}

export default App;
