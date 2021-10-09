import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})

//Desc - Register a new user
//POST - public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne({ email: email });

    if (userExist) {
        res.status(400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        //If user was created
        //201 -  Created Something
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    } else {
        res.status(400)
    }

})

//Desc - GET user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })


    } else {
        res.status(404)
    }

})
//Desc- Update user profile
//Put request
//api/user/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(404)
    }

})

export { authUser, registerUser, getUserProfile, updateUserProfile };