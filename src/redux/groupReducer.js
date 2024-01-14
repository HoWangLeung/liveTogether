import { SET_GROUP_INFO, SET_INVITATION_MODAL } from "./actions";

const initialState = {
  groupInfo: {},
};

function groupReducer(state = initialState, action) {
  
  switch (action.type) {
    case SET_GROUP_INFO:
      return { ...state, groupInfo: action.payload };

    default:
      return state;
  }
}
export default groupReducer;
