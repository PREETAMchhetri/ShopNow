import React from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Meta from '../components/Meta'


//Package for fetchin from server
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, reviewProduct } from '../actions/productActions'

import Loader from 'react-loader-spinner'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewSelector = useSelector(state => state.productReview)
    const { loading: loadingReview, error: errorReview, success: successReview } = productReviewSelector


    useEffect(() => {
        if (successReview) {
            alert("Review Submitted")
            setRating(0)
            setComment("")
            dispatch({ type: PRODUCT_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successReview, product])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(reviewProduct(match.params.id, {
            rating,
            comment,
        }))
    }
    return (
        <>
            <Row >
                <Col md={6}>
                    {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                        : error ? <h3>{error}</h3> : <Image src={product.image} fluid />
                    }
                </Col>
                <Meta title={product.name} />
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
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    <ListGroup variant='flush'>
                        {product.reviews.length > 0 ? (
                            product.reviews.map(review => (

                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} color='#f8e825' />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>

                            ))) : <h4 style={{ fontSize: '1rem' }}>No reviews</h4>
                        }

                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            {errorReview && <span>{errorReview}</span>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">2 - Good</option>
                                            <option value="4">2 - Very Good</option>
                                            <option value="5">2 - Very Excellent</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form>
                            ) : <Link to='/login'> Sign In to write a review</Link>}

                        </ListGroup.Item>
                    </ListGroup>

                </Col>
            </Row>
        </>
    )
}


export default ProductScreen