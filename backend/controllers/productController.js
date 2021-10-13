import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products)

})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404).send("NOT FOUND");
    }
})


const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    } else {
        res.status(404).send("NOT FOUND");
    }
})

//CREATE PRODUCT
//POST api/products
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//UPDATE PRODUCT
//PUT api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body


    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.image = image || product.image
        product.brand = brand || product.brand
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
//DESC- Create new review
// POST REQ
//@access - /api/products/:id/review
//Private - all user
const createProductReview = asyncHandler(async (req, res) => {
    const {
        rating,
        comment,
    } = req.body


    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.image = image || product.image
        product.brand = brand || product.brand
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };