import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import ProductsCarousel from '../components/ProductsCarousel'
//PACKAGE for REDUX
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from 'react-loader-spinner'

//Helmet is for custom page titles
import Meta from '../components/Meta'

//PACKAGES to FETCH products from SERVER
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


const Home = ({ match }) => {

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))

    }, [dispatch, keyword, pageNumber])


    return (
        <>
            <Meta />
            {!keyword ? <ProductsCarousel /> : <Link to='/' className='btn btn-light my-3'>Go Back</Link>}
            <h2>Latest products</h2>
            {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                : error ? <h3>{error}</h3> : (
                    <>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </>
                )}

        </>
    )
}

export default Home
