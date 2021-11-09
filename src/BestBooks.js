import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  handleGetBooks = async (email) =>{
    let results = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books?email=${email}`);
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
          <Carousel >
            {this.state.books.map(book => (
              <Carousel.Item key={book.title}>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/150"
                alt="book.title"
              />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>Your book collection is empty!</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
