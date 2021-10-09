import axios from 'axios'
import { ADD_CART, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, REMOVE_CART } from '../constants/cartConstraints'

export const cartAction = (id, qty) => async (dispatch, getState) => {
    try {

        const { data } = await axios.get(`/api/products/${id}`)


        dispatch({
            type: ADD_CART,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                numReviews: data.numReviews,
                rating: data.rating,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error.message);
    }
}

export const removeFromCart = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: REMOVE_CART,
            payload: id,
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } catch (error) {
        console.log(error);
    }
}

export const saveShippingAddress = (data) => async (dispatch) => {

    try {

        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: data,
        })
        localStorage.setItem('shippingAddress', JSON.stringify(data))

    } catch (error) {
        console.log(error);
    }
}

export const savePaymentMethod = (data) => async (dispatch) => {

    try {

        dispatch({
            type: CART_SAVE_PAYMENT_METHOD,
            payload: data,
        })


    } catch (error) {
        console.log(error);
    }
}