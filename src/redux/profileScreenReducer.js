import {
  SET_GROUP_INFO,
  SET_INVITATION_MODAL,
  SET_POPUP_DIALOG,
  SET_POPUP_MODAL,
} from "./actions";

const initialState = {
  popUpModalConfig: {
    type: "success",
    visible: false,
    message: "Update Successful!",
  },
  popUpDialogConfig: {
    type: "success",
    visible: false,
    message: "Update Successful!",
    description:null,
    onDonePressed: null,
  },
};

function profileScreenReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POPUP_MODAL:
      return { ...state, popUpModalConfig: action.payload };
    case SET_POPUP_DIALOG:
      return { ...state, popUpDialogConfig: action.payload };

    default:
      return state;
  }
}
export default profileScreenReducer;
