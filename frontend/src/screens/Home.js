import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
//PACKAGE for REDUX
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from 'react-loader-spinner'

//PACKAGES to FETCH products from SERVER
import { useEffect } from 'react'


const Home = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, error, products } = productList
    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])


    return (
        <>
            <h2>Latest products</h2>
            {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                : error ? <h3>{error}</h3> : <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>}


        </>
    )
}

export default Home
