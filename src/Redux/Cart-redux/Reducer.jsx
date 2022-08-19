import {
  ADD_TO_CART,
  EMPTY_CART,
  ORDER_ITEMS,
  REMOVE_ITEM,
  UPDATE_QTY,
} from "./Action-type";

const initialState = {
  cartItem: [],
  orderItems: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItem: [...state.cartItem, payload],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter((Item) => Item.id !== payload),
      };
    case EMPTY_CART:
      return {
        ...state,
        cartItem: [],
      };
    case UPDATE_QTY:
      return {
        ...state,
        cartItem: [...payload],
      };
    case ORDER_ITEMS:
      return {
        ...state,
        orderItems: [...state.orderItems, payload],
      };

    default:
      return state;
  }
};

export default reducer;
