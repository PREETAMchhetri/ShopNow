import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'

import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)



    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) { history.push('/login') }
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {

            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }


    }, [dispatch, product, history, productId, successUpdate, userInfo])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,
        }))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light'>Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>

                {loadingUpdate && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}

                {errorUpdate && <span>{errorUpdate}</span>}

                {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : error ? <span>{error}</span> : (

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                value={price}
                                placeholder='enter price'
                                onChange={(e) => setPrice(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                            <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                            {uploading && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                value={brand}
                                placeholder='enter brand'
                                onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countinstock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                value={countInStock}
                                placeholder='enter stock'
                                onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                value={category}
                                placeholder='enter category'
                                onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                value={description}
                                placeholder='enter description'
                                onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}


            </FormContainer >
        </>

    )
}

export default ProductEditScreen
