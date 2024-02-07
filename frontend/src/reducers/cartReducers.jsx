import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const initialState = {
  cartItems: []
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.product === newItem.product);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product === existingItem.product ? newItem : item
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem]
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== action.payload)
      };

    default:
      return state;
  }
};
