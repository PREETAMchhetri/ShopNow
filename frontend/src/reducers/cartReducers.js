import {
    ADD_CART,
    REMOVE_CART,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstraints'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ADD_CART:
            const item = action.payload

            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {

                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }

        default:
            return state
    }
}