import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import CategoryDetailModal from './CategoryDetailModal';

export function Products() {
    const [getProducts, setProducts] = useState([]);
    const [selectedProduct, setselectedProduct] = useState([]);


    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');

    const [productModal, setProductModal] = useState(false);
    const [price, setPrice] = useState('');

    const toggle = () => setProductModal(!productModal);


    const createProduct = async () => {
        try {
            const requestData = { Name: name, Price: price, CategoryId: categoryId };
            await axios.post('https://localhost:7287/products/', requestData);
            toggle();
            fetchData();
        } catch (error) {
            console.error('Error creating category:', error);
        };
    }


    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7287/Products`);
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Button color="primary" onClick={toggle}>Make Product</Button>

            <Modal isOpen={productModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Make A Product </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label
                                for="exampleName">
                                Product Name
                            </Label>
                            <Input
                                id="Product-Name"
                                name="Name"
                                placeholder="Product-Name"
                                type="Name"
                                value={name} onChange={(e) => setName(e.target.value)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label
                                for="Product-Price">
                                Product Price
                            </Label>
                            <Input
                                id="Product-Price"
                                name="Price"
                                placeholder="Product-Price"
                                type="price"
                                value={price} onChange={(e) => setPrice(e.target.value)} required/>
                        </FormGroup>

                        {' '}
                        <FormGroup>
                            <Label
                                for="exampleDescription"
                            >
                                CategoryId
                            </Label>
                            <Input
                                id="exampleDescription"
                                name="CategoryId"
                                placeholder="CategoryId"
                                type="CategoryId"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)} required
                            />
                        </FormGroup>
                        {' '}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={createProduct}>
                        Save Changes
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            {/* <CategoryDetailModal
                fetchData={fetchData}
            /> */}
        </div>
    );
}
export default Products;