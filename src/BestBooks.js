import React from 'react';
import axios from 'axios';
import { Container, Button, Carousel } from 'react-bootstrap';
import BookFormModal from './BookFormModal.js';
import BookUpdateModal from './BookUpdateModal.js';
import { withAuth0 } from '@auth0/auth0-react';



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
  getConfig = async (method) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      console.log(res);
      console.log(jwt);
      const config = {
        headers: { "Authoriztion": `Bearer ${jwt}`},
        method: method,
        baseURL: process.env.REACT_APP_SERVER_URL
      }
      return config;
    } 
  }
  handleGetBooks = async (email) => {
    let config = await this.getConfig('get');
    //let results = await axios.get(`${process.env.REACT_APP_SERVER_URL}/books?email=${email}`,config);
    //let results = await axios(`${process.env.REACT_APP_SERVER_URL}/books?email=${email}`,config);
    config.url = `/books?email=${email}`
    let results = await axios(config);

    this.setState({
      books: results.data
    })
  }
  handlePostBooks = async (bookObj) => {
    let config = await this.getConfig('post');
    config.url = '/books';
    config.data = bookObj;
    try {
      console.log(config.baseUrl);
      //let res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/books`,bookObj,config);
      let res = await axios(config);
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
    let config = await this.getConfig('delete');
    config.url = `/books/${id}?email=${this.props.auth0.user.email}`;
    try {
      //await axios.delete(`${process.env.REACT_APP_SERVER_URL}/books/${id}?email=${this.props.auth0.user.email}`);
      await axios(config);
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
    let config = await this.getConfig('put');
    config.url = `/books/${id}?email=${this.props.email}`;
    config.data = bookFromForm;
    try {
      //let updatedBook = await axios.put(`${process.env.REACT_APP_SERVER_URL}/books/${id}?email=${this.props.email}`, bookFromForm);
      let updatedBook = await axios(config);
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
    this.handleGetBooks(this.props.auth0.user.email);
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

export default withAuth0(BestBooks);
