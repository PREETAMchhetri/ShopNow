import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from 'react-loader-spinner'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate



    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])



    const deleteUserHandler = (id) => {
        if (window.confirm("Are You Sure")) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
            {errorDelete && <span>{errorDelete}</span>}
            {loadingCreate && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
            {errorCreate && <span>{errorCreate}</span>}
            {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : error ? <span>{error}</span> : (
                <Table striped bordered hover responsive variant='dark' className='table-sm'>
                    <thead>
                        <tr>

                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>

                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteUserHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen
