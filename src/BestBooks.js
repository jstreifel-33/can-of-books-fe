import React from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal.js';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  handleGetBooks = async (email) =>{
    let results = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books?email=${email}`);
    this.setState({
      books: results.data
    })
  }
  handlePostBooks = async (bookObj) => {
    try {
      console.log(process.env.REACT_APP_SERVER_URL);
      let res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/books`,bookObj);
      console.log(res);
      if (res.data) {
        this.setState({books: [...this.state.books,res.data]})
      }
    } catch (err) {
      console.error(err);
    }
  }
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  }

  componentDidMount(){
    this.handleGetBooks(this.props.email);
  }

  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button onClick={this.toggleModal}>Add Book</Button>
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
        <BookFormModal
          toggleModal={this.toggleModal}
          show={this.state.showModal}
          email={this.props.email}
          handlePostBooks={this.handlePostBooks}
        />
      </>
    )
  }
}

export default BestBooks;
