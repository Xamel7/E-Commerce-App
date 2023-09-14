import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Products from './Products';



const CategoryDetailModal = ({ isOpen, toggle, category, fetchData, selectedCategoryProducts}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState({});
    const [editCategory, setEditedCategory] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [productName, setProductName] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [productCategory, setproductCategory] = useState('');
    const [editProduct, setEditProduct] = useState(false);
    const [editProductModal, setEditProductModal] = useState(null);

    const toggleEditProduct =(category, selectedCategoryProduct) => {
    setEditProductModal(category);
    setSelectedProduct(selectedCategoryProduct);
    setEditProduct(!editProduct);

    }
    const toggleOpenModal = (category, selectedCategoryProducts) => {
        setEditedCategory(category);
        setSelectedCategory(category); // Set the selected category for editing
        console.log(category);
        console.log(selectedCategoryProducts);
        setEditModalOpen(!editModalOpen);
    };


    const deleteProduct = async (products) => {
        if (!products) {
            // Handle the case where category is null or undefined
            console.error("Cannot delete null or undefined product.");
            return;
        }
        try {
            await axios.delete(`https://localhost:7287/products/${products.id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting products:', error);
        }
    };
    const toggleModal = (category) => {
        setSelectedCategory(category);
        setModalOpen(!modalOpen);
        
    };

    const saveItem = async () => {
        const newItem = { name: itemName, description };
        try {
            await axios.put(`https://localhost:7287/categories/${selectedCategory.id}`, newItem);
            // Handle successful update
            toggleOpenModal(); // Close the edit modal
            fetchData(); // Refresh data after update
        } catch (error) {
            console.error('Error saving item:', error);
            console.log('Server response (error):', error.response.data);
        }
    };
    const updateItem = async () => {
        if (!selectedProduct) {
            console.error("No selected product to update.");
            return;
          }
        
          const newProduct = {
            id: selectedProduct.id, // Make sure id is set correctly
            name: productName, // Make sure productName is set correctly
            price: parseFloat(productPrice), // Make sure productPrice is set correctly and converted to a number
            categoryId: parseInt(productCategory), // Make sure productCategory is set correctly and converted to an integer
          };
        
          try {
            await axios.put(`https://localhost:7287/products/${selectedProduct.id}`, newProduct);
            // Handle successful update
            toggleEditProduct(); // Close the edit modal
            fetchData(); // Refresh data after update
          } catch (error) {
            console.error('Error updating item:', error);
            console.log('Server response (error):', error.response.data);
          }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{category.name}</ModalHeader>
                <ModalBody>
                    <p>Description: {category.description}</p>
                    <ul>{selectedCategoryProducts?.filter((product) => product.categoryId === category.id).map((products) => (
                        <li key={products.id}>
                            <p>Name:{products.name}</p>
                            <p>Price:{products.price}</p>
                            <Button color="danger" onClick={() => deleteProduct(products)}>Delete</Button>
                            <Button color="primary" onClick={() => toggleEditProduct(category, products)}>Edit</Button>
                        </li>))}</ul>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => toggleOpenModal(category)}>
                        Edit
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalOpen} toggle={toggleModal} fullscreen>
                <ModalHeader toggle={toggleModal}>
                    {selectedCategory ? selectedCategory.name : ''}
                </ModalHeader>
                <ModalBody>
                    {selectedCategory ? selectedCategory.description : ''}

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => toggleOpenModal(category)}>
                        Edit
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={editModalOpen} toggle={toggleOpenModal} fullscreen>
                <ModalHeader toggle={toggleOpenModal}>
                    Edit Category
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="categoryName">Category Name</Label>
                            <Input
                                id="categoryName"
                                name="Name"
                                placeholder="Category Name"
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="categoryDescription">Description</Label>
                            <Input
                                id="categoryDescription"
                                name="description"
                                placeholder="Description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveItem}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={toggleOpenModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>







            <Modal isOpen={editProduct} toggle={toggleEditProduct} fullscreen>
                <ModalHeader toggle={toggleEditProduct}>
                    Edit Category
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="Product-Name">Product Name</Label>
                            <Input
                                id="Product-Name"
                                name="Name"
                                placeholder="Product Name"
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Product-Price">Product Price</Label>
                            <Input
                                id="Product-Price"
                                name="Name"
                                placeholder="Product Price"
                                type="text"
                                value={productPrice}
                                onChange={(e) => setproductPrice(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="CategoryId">CategoryId</Label>
                            <Input
                                id="CategoryId"
                                name="CategoryId"
                                placeholder="CategoryId"
                                type="text"
                                value={productCategory}
                                onChange={(e) => setproductCategory(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={updateItem}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={toggleEditProduct}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>

    );
};

export default CategoryDetailModal;

//     var categoryUpdate = { ...selectedCategory }

//     const [isOpen, setIsOpen] = useState(false)

//     const newNamedItem = (props) => {
//       const newitemName = {
//         newName : [...props.itemName]
//     };

//     const [nameState, setNameState] = useState(newNamedItem);

//     useEffect(() => {
//         setNameState({...nameState, newitemName: [...props.itemName]})
//     }, [props.itemName])
//     };



//     function deleteCategory() {
//         axios.delete("https://localhost:7089/categories", { "params": { id: selectedCategory.id } })
//             .then(response => {
//                 let updatedCategories = [...categories]
//                 let index = updatedCategories.find((element) => {
//                     return element.id == selectedCategory.id
//                 })
//                 updatedCategories.splice(index, 1)
//                 setCategories(updatedCategories)
//                 setIsOpen(false)
//             })
