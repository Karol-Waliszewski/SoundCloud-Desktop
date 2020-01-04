export const CHANGE_VOLUME = volume => {
  return {
    type: "CHANGE_VOLUME",
    payload: volume
  };
};

export const CHANGE_TIME = time => {
  return {
    type: "CHANGE_VOLUME",
    payload: time
  };
};

export const CHANGE_STATE = state => {
  return {
    type: "CHANGE_VOLUME",
    payload: state
  };
};

const actions = {
  CHANGE_VOLUME,
  CHANGE_TIME,
  CHANGE_STATE
};

export default actions;
