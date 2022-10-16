const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [], amount: 0 };
  }

  if (action.type === "REMOVE") {
    const newArray = state.cart.filter((item) => {
      return item.id !== action.payload;
    });
    return { ...state, cart: newArray, amount: newArray.length };
  }

  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }

      return cartItem;
    });

    return { ...state, cart: tempCart };
  }

  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          // if (cartItem.amount === 0) {
          //   return { ...cartItem, amount: cartItem.amount };
          // }

          return { ...cartItem, amount: cartItem.amount - 1 };
        }

        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return { ...state, cart: tempCart };
  }

  if (action.type === "GET_TOTAL") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.amount += amount;
        const itemTotal = amount * price;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  return state;
};

export default reducer;
