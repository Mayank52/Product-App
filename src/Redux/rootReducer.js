import { initialState } from "./initialState";

export default function (state = initialState, action) {
  console.log(state, action);

  switch (action.type) {
    case "SET_SELECTED_PRODUCT":
      return {
        ...state,
        selectedProduct: action.payload,
      };
    case "SET_IS_EDIT":
      return {
        ...state,
        isEdit: action.payload,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
