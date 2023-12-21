import { SET_INVITATION_MODAL } from "./actions";

const initialState = {
  isOpen:false
};

function userReducer(state = initialState, action) {
  
  switch (action.type) {
    case SET_INVITATION_MODAL:
      return { ...state, isOpen: action.payload };

    default:
      return state;
  }
}
export default userReducer;
