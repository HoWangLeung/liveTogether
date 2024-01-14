import {   SET_TASKS } from "./actions";

const initialState = {
  tasks: [],
};

function taskReducer(state = initialState, action) {
  
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload };

    default:
      return state;
  }
}
export default taskReducer;
