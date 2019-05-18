import { SET_USER } from "./../actions/types";

const initialState = { user: null };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user } = action;
      return { ...state, user };
    }
    default:
      return state;
  }
};

export default userReducer;
