import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';


export function PostCategory({fetchData}) {
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    const createCategory = async () => {
        try {
            const requestData = { Name: name, description: description };
            await axios.post('https://localhost:7287/categories/', requestData);
            toggle();
            fetchData();
        } catch (error) {
            console.error('Error creating category:', error);
        };
    }
    return (
        <div>
            <Button color="primary" onClick={toggle}>Make Category</Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Make A Category </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label
                                for="exampleName"
                            >
                                Category Name
                            </Label>
                            <Input
                                id="exampleName"
                                name="Name"
                                placeholder="Category Name"
                                type="name"
                                value={name} onChange={(e) => setName(e.target.value)} required
                            />
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <Label
                                for="exampleDescription"
                            >
                                Description
                            </Label>
                            <Input
                                id="exampleDescription"
                                name="description"
                                placeholder="Description"
                                type="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} required
                            />
                        </FormGroup>
                        {' '}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={createCategory}>
                        Save Changes
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default PostCategory;