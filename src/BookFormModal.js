import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class BookFormModal extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        let newBook = {
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value,
            email: this.props.email
        }
        console.log(newBook);
        this.props.handlePostBooks(newBook);
        this.props.toggleModal();
    }

    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.toggleModal}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' name='title'/>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' name='description'/>
                        <Form.Label>Status</Form.Label>
                        <Form.Control type='text' name='status'/>
                        <Button type="submit">
                    Save Changes
                </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}