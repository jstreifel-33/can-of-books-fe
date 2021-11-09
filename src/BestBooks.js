import React from 'react';
import axios from 'axios';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  handleGetBooks = async (email) =>{
    console.log('getting books...');
    let results = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books?email=${email}`);
    console.log(results);
    this.setState({
      books: results.data
    })
  }

  componentDidMount(){
    this.handleGetBooks(this.props.email);
  }

  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>Your book collection is empty!</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
