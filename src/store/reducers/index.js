const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_TASK":
      return { ...state, taskList: action.payload };

    default:
      return state;
  }
};

export default reducer;
