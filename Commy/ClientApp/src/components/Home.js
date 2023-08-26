import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            itemModalOpen: false,
            itemName: '',
            description: '',
        };
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };

    toggleItemModal = () => {
        this.setState({
            itemModalOpen: !this.state.itemModalOpen,
        });
    };

    handleItemClick = () => {
        this.toggleItemModal();
    };

    saveItem = async () => {
        const { itemName, description } = this.state;
        const newItem = { itemName, description };

        try {
            await axios.put('http://localhost:5111/Category', newItem);
            this.toggleItemModal();
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    render() {
        return (
            <div>
                <h1>Hello, You Commy Swine!</h1>
                <Button color="primary" onClick={this.toggleModal}>
                    Open Menu
                </Button>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Item List</ModalHeader>
                    <ModalBody>
                        <ul className="list-group">
                            <div>
                                <Button outline color="primary" onClick={this.handleItemClick}>
                                    Groceries
                                </Button>{' '}
                                <Button outline color="primary" onClick={this.handleItemClick}>
                                    Clothes
                                </Button>{' '}
                                <Button outline color="primary" onClick={this.handleItemClick}>
                                    Electronics
                                </Button>{' '}
                                <Button outline color="primary" onClick={this.handleItemClick}>
                                    Home Appliances
                                </Button>{' '}
                                <Button outline color="primary" onClick={this.handleItemClick}>
                                    Jewelry
                                </Button>{' '}
                                <Button outline color="primary" onClick={this.handleItemClick}>
                                    Instrumental
                                </Button>{' '}


                                {/* Add more buttons */}
                            </div>
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.itemModalOpen} toggle={this.toggleItemModal}>
                    <ModalHeader toggle={this.toggleItemModal}>Edit Item</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="itemName">Item Name</Label>
                                <Input type="text" name="itemName" id="itemName" value={this.state.itemName} onChange={e => this.setState({itemName: e.target.value})}/>
                                <Label for="Description">Description</Label>
                                <Input type="text" name="Description" id="Description" value={this.state.description} onChange={e => this.setState({ description: e.target.value})}/>

                            </FormGroup>
                            {/* Add more form fields */}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.saveItem}>Save</Button>
                        <Button color="secondary" onClick={this.toggleItemModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}