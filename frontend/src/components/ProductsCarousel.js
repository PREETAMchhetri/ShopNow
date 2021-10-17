import React, { useEffect } from 'react'
import { topProducts } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Carousel } from 'react-bootstrap'
import Loader from 'react-loader-spinner'

const ProductsCarousel = () => {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(topProducts())
    }, [dispatch])

    return loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : error ? <span>{error}</span> : (

        <Carousel pause='hover' className='bg-black' fade>
            {products.map(product => (
                <Carousel.Item key={product._id} interval={2000} >
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name}(${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductsCarousel
