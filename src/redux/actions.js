export const SET_INVITATION_MODAL = "SET_INVITATION_MODAL";
export const SET_GROUP_INFO = "SET_GROUP_INFO";
export const SET_POPUP_MODAL = "SET_POPUP_MODAL";
export const SET_POPUP_DIALOG = "SET_POPUP_DIALOG";
export const SET_LOGIN_DETAIL="SET_LOGIN_DETAIL";
export const SET_TASKS="SET_TASKS";
export const setInvitationModal = (isOpen) => (dispatch) => {
  dispatch({
    type: SET_INVITATION_MODAL,
    payload: { isOpen },
  });
};

//===========
//===GROUP===
//===========
export const setGroupInfo = (groupInfo) => (dispatch) => {
  dispatch({
    type: SET_GROUP_INFO,
    payload: groupInfo,
  });
};
//===========
//===Profile===
//===========
export const setPopUpModal = (payload) => (dispatch) => {
  dispatch({
    type: SET_POPUP_MODAL,
    payload: payload,
  });
};
export const setPopUpDialog = (payload) => (dispatch) => {
  dispatch({
    type: SET_POPUP_DIALOG,
    payload: payload,
  });
};
//===========
//===USER===
//===========
export function setLoginDetail(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_LOGIN_DETAIL,
      payload: payload,
    });
  };
}
//===========
//===TASKS===
//===========
export function setTasks(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_TASKS,
      payload: payload,
    });
  };
}