import React from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'

//Package for fetchin from server
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

import Loader from 'react-loader-spinner'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails


    useEffect(() => {

        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Row >
                <Col md={6}>
                    {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                        : error ? <h3>{error}</h3> : <Image src={product.image} fluid />
                    }
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3 className='my-3'>
                                {product.name}
                            </h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={product.numReviews} color='#f8e825' />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <span style={{ color: ' #B12704', fontFamily: "Amazon Ember", fontSize: '21px' }}>
                                Price: ${product.price}
                            </span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                Product Description:
                            </span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        ${product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>qty</Col>
                                        <Col>
                                            <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}>


                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <div className="d-grid gap-2">
                                    <Button
                                        onClick={addToCartHandler}
                                        type='button'
                                        disabled={product.countInStock === 0}>
                                        Add to Cart
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}


export default ProductScreen
