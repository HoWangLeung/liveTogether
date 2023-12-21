export const SET_INVITATION_MODAL = "SET_INVITATION_MODAL";
export const SET_GROUP_INFO = "SET_GROUP_INFO";

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
    payload: { groupInfo },
  });
};
