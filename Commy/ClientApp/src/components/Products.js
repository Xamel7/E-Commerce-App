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

    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const toggle = () => setProductModal(!productModal);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", `${process.env.REACT_APP_Cloud_Name}`);
        try {
            setUploadingImg(true);
            let res = await fetch(
                `${process.env.REACT_APP_CLOUD_API}`,
                {
                    method: "post",
                    body: data,
                }
            );
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    const createProduct = async () => {
        try {
            uploadImage();
            const url = await uploadImage(image);
            const requestData = { Name: name, Price: price, CategoryId: categoryId, image: url };
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
                            <img src={imagePreview}
                                className="product"
                                alt='' />
                            <Label
                                for="exampleName">
                                Image
                            </Label>
                            <Input
                                id="Product-Image"
                                name="Image"
                                placeholder="Product-Image"
                                 type="file" accept="image/png, image/jpeg" onChange={validateImg} />
                        </FormGroup>
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
                                value={price} onChange={(e) => setPrice(e.target.value)} required />
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