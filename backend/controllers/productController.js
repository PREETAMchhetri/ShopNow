import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1


    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.count({ ...keyword })

    const products = await Product.find({ ...keyword }).limit(pageSize).skip
        (pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) })

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
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReviewed) {
            res.status(401)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
        await product.reviews.push(review)

        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()

        res.status(201).json(review)

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

//Desc - GET/ api/products/top
// Public
const topRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    topRatedProducts,
};