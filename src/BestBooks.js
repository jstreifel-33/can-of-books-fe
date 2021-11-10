import React from 'react';
import axios from 'axios';
import { Container, Button, Carousel } from 'react-bootstrap';
import BookFormModal from './BookFormModal.js';
import BookUpdateModal from './BookUpdateModal.js';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAdd: false,
      showUpdate: false,
      carouselIndex: 0
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  handleGetBooks = async (email) => {
    let results = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books?email=${email}`);
    this.setState({
      books: results.data
    })
  }
  handlePostBooks = async (bookObj) => {
    try {
      console.log(process.env.REACT_APP_SERVER_URL);
      let res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/books`, bookObj);
      console.log(res);
      if (res.data) {
        this.setState({ books: [...this.state.books, res.data] })
      }
    } catch (err) {
      console.error(err);
    }
  }

  filterBooks = (id) => this.state.books.filter(book => book._id !== id);

  handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/books/${id}?email=${this.props.email}`);
      //let filteredBooks = this.state.books.filter(book => book._id !== id);
      let filteredBooks = this.filterBooks(id);
      this.setState({
        books: filteredBooks,
        carouselIndex: 0
      });
    } catch (err) {
      console.error(err);
    }
  }

  handlePutBook = async (id, bookFromForm) => {
    try {
      let updatedBook = await axios.put(`${process.env.REACT_APP_SERVER_URL}/books/${id}?email=${this.props.email}`, bookFromForm);
      let filteredBooks = this.filterBooks(id);
      filteredBooks.push(updatedBook.data);
      this.setState({ books: filteredBooks, carouselIndex: 0 });
    } catch (err) {
      console.error(err);
    }
  }
  toggleAdd = () => {
    this.setState({ showAdd: !this.state.showAdd });
  }
  toggleUpdate = () => {
    this.setState({ showUpdate: !this.state.showUpdate });
  }
  carouselProgress = () => {
    if (this.state.carouselIndex)
      this.setState({ carouselIndex: this.state.carouselIndex + 1 })
  }

  componentDidMount() {
    this.handleGetBooks(this.props.email);
  }

  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <Container>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button onClick={this.toggleAdd} style={{margin:"5px 0px 5px 0px"}}>Add Book</Button>
        {this.state.books.length ? (
          <Carousel activeIndex={this.state.carouselIndex} onSelect={(e) => this.setState({ carouselIndex: e })}>
            {this.state.books.map(book => (
              <Carousel.Item key={book._id}>
                <img
                  className="d-block"
                  src="bookshelf.jpg"
                  alt="book.title"
                  style={{ height: "600px", width: "100%" }}
                />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <Button variant="secondary" onClick={() => this.handleDeleteBook(book._id)} style={{margin:"5px"}}>Delete from Collection</Button>
                  <Button variant="secondary" onClick={() => this.toggleUpdate()} style={{margin:"5px"}}>Update Book Info</Button>
                </Carousel.Caption>
                <BookUpdateModal 
                  book={book} 
                  handlePutBook={this.handlePutBook}
                  toggleUpdate={this.toggleUpdate}
                  show={this.state.showUpdate}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>Your book collection is empty!</h3>
        )}
        <BookFormModal
          toggleAdd={this.toggleAdd}
          show={this.state.showAdd}
          email={this.props.email}
          handlePostBooks={this.handlePostBooks}
        />
      </Container>
    )
  }
}

export default BestBooks;
