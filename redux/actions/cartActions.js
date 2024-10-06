export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,  // product is the object of the product we want to add to the cart
  });
