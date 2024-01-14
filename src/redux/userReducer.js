import { SET_INVITATION_MODAL, SET_LOGIN_DETAIL } from "./actions";

const initialState = {
  isOpen: false,
  isLoggedIn: false,
  userDetail: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INVITATION_MODAL:
      return { ...state, isOpen: action.payload };
    case SET_LOGIN_DETAIL:
      
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        userDetail: action.payload.userDetail,
      };
    default:
      return state;
  }
}
export default userReducer;
