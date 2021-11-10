import React, { Component } from 'react'
import { Modal, Form, Button, Container } from 'react-bootstrap'

export default class BookUpdateModal extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
    }
    console.log(newBook);
    this.props.handlePutBook(this.props.book._id, newBook);
    this.props.toggleUpdate();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.toggleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' name='title' defaultValue={this.props.book.title} />
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' name='description' defaultValue={this.props.book.description} />
              <Form.Label>Status</Form.Label>
              <Form.Control type='text' name='status' defaultValue={this.props.book.status} />
              <Button type="submit" style={{ margin: "10px 0px 10px 0px" }}>
                Save Changes
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
}
