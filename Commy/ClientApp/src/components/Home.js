import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import CategoryDetailModal from './CategoryDetailModal';
import PostCategory from './PostCategory';
import Products from './Products';

export function Home() {

    const [getCategories, setCategories] = useState([]);
    const [categoryListModalOpen, setCategoryListModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryProducts, setSelectedCategoryProducts] = useState(null);

    const toggleCategoryListModal = () => {
        setCategoryListModalOpen(!categoryListModalOpen);
    };

    const openCategoryDetailModal = async (category) => {
        setSelectedCategory(category);
        fetchProductsForCategory(category);
    };

    const closeCategoryDetailModal = () => {
        setSelectedCategory(null);
    };

    const [itemModalOpen, setItemModalOpen] = useState(false);
    const [editCategory, setEditedCategory] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toggleCategory = () => {
        setModalIsOpen(false);
    }
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = (category) => {
        setSelectedCategory(category);
        setModalOpen(!modalOpen);
    };
    const toggleOpenModal = (category) => {
        setEditedCategory(category);
        setSelectedCategory(category); // Set the selected category for editing
        console.log(category);
        setEditModalOpen(!editModalOpen);
    };

    const toggleItemModal = (category) => {
        setEditedCategory(category);
        setItemModalOpen(category);
    };

    const fetchProductsForCategory = async (category) => {
        setSelectedCategory(category);
        try {
            const response = await axios.get(`https://localhost:7287/Products?categoryId=${category.id}`);
            console.log('API Response:', response.data); // Log the API response
            setSelectedCategoryProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };



    // const handleItemClick = async (category) => {
    //     // When a category is clicked, set it as the selected category
    //     setSelectedCategory(category);

    //     try {
    //         const response = await axios.get(`https://localhost:7287/Products?categoryId=${category.id}`);
    //         // Assuming the API endpoint returns products related to the selected category
    //         setSelectedCategoryProducts(response.data);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // };
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7287/Categories`);
            setCategories(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteCategory = async (category) => {
        if (!category) {
            // Handle the case where category is null or undefined
            console.error("Cannot delete null or undefined category.");
            return;
        }
        try {
            await axios.delete(`https://localhost:7287/categories/${category.id}`);
            toggleItemModal(null);
            fetchData();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Hello, Please Enjoy Yourself!</h1>

            <Button color="primary" onClick={toggleCategoryListModal}>
                Open Category List
            </Button>

            <Modal isOpen={categoryListModalOpen} toggle={toggleCategoryListModal}>
                <ModalHeader toggle={toggleCategoryListModal}>Category List</ModalHeader>
                <ModalBody>
                    <ul>
                        {getCategories.map((category, id) => (
                            <li key={id}>
                                <Button color="link" onClick={() => openCategoryDetailModal(category)}>
                                    {category.name}
                                </Button>
                                <Button color="link" onClick={() => deleteCategory(category)}>
                                    Delete
                                </Button>

                            </li>
                        ))}
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggleCategoryListModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

            {selectedCategory && (
                <CategoryDetailModal
                    isOpen={!!selectedCategory}
                    toggle={closeCategoryDetailModal}
                    category={selectedCategory}
                    fetchData={fetchData}
                    selectedCategoryProducts={selectedCategoryProducts}
                />
            )}
            <PostCategory
                fetchData={fetchData}
            />
            <Products

            />
            <Form>
            </Form>
        </div>

    );
}
export default Home;