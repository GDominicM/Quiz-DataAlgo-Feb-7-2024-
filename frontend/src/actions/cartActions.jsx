import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

// Action creator to add an item to the cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            },
        });

        // Use setTimeout as a workaround to allow time for the state to update
        setTimeout(() => {
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        }, 0);
    } catch (error) {
        console.error('Error adding to cart:', error.message);
    }
};

// Action creator to remove an item from the cart
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });

    // Use setTimeout as a workaround to allow time for the state to update
    setTimeout(() => {
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }, 0);
};

