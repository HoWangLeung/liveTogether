import { SET_GROUP_INFO, SET_INVITATION_MODAL } from "./actions";

const initialState = {
  data: {},
};

function groupReducer(state = initialState, action) {
  
  switch (action.type) {
    case SET_GROUP_INFO:
      return { ...state, data: action.payload };

    default:
      return state;
  }
}
export default groupReducer;
