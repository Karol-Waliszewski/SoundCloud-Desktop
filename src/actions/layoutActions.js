import uuid from "uuid/v4";

export const CHANGE_QUEUE = state => ({
  type: "CHANGE_QUEUE",
  payload: state
});

export const TOGGLE_QUEUE = () => ({
  type: "TOGGLE_QUEUE"
});

export const UPDATE_POPUPS = popups => ({
  type: "UPDATE_POPUPS",
  payload: popups
});

export const ADD_POPUP = message => (dispatch, getState) => {
  let popups = new Map([...getState().layout.popups]);
  let id = uuid();
  popups.set(id, message);
  dispatch(UPDATE_POPUPS(popups));
  // Remove popup after 4s
  setTimeout(() => {
    dispatch(REMOVE_POPUP(id));
  }, 4000);
};

export const REMOVE_POPUP = id => (dispatch, getState) => {
  let popups = new Map([...getState().layout.popups]);
  if (popups.has(id)) {
    popups.delete(id);
    dispatch(UPDATE_POPUPS(popups));
  }
};
