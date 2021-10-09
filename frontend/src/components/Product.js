import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom' // Faster link then href

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`} className='productLink'>

                    <Card.Title as='div'>
                        <strong style={{ fontWeight: 'bold' }}>
                            {product.name}
                        </strong>

                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.rating} text={product.numReviews} color='#f8e825' />
                </Card.Text>

                <Card.Text as='div'>
                    <h3 style={{ color: ' #B12704', fontFamily: "Amazon Ember", fontSize: '21px' }}>${product.price}</h3>
                </Card.Text>
            </Card.Body>


        </Card>

    )
}

export default Product
