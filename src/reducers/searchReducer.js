const defaultState = {
  query: ""
};

var reducer = function(state = defaultState, action) {
  switch (action.type) {
    case "CHANGE_QUERY":
      return {
        ...state,
        query: action.payload
      };

    default:
      return { ...state };
  }
};

export default reducer;
