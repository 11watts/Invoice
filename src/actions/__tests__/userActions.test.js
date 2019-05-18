import mockAxios from "axios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { SET_USER } from "../types";
import { setUser, login, signup } from "../userActions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const setup = () => ({
  user: "username",
  password: "password",
  setError: jest.fn(),
  store: mockStore({ user: null })
});

describe("setuser actions", () => {
  it("should set username", () => {
    const { user } = setup();
    const expectedAction = {
      type: SET_USER,
      user
    };
    expect(setUser(user)).toEqual(expectedAction);
  });
});

describe("login actions", () => {
  it("should login and set user", () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { username: "username" }
      })
    );
    const { user, password, setError, store } = setup();

    const expectedActions = [
      {
        type: SET_USER,
        user
      }
    ];

    return store.dispatch(login(user, password, setError)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(setError).toHaveBeenCalledTimes(0);
    });
  });

  it("should fail login and set error message", () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        data: { error: {
          username: "You have entered an invalid username or password"
        } }
      })
    );
    const { user, password, setError, store } = setup();
    const expectedActions = [];

    return store.dispatch(login(user, password, setError)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(setError).toHaveBeenCalledTimes(1);
    });
  });

  it("should fail login and set default error message", () => {
    mockAxios.get.mockImplementationOnce(() => Promise.reject({}));

    const { user, password, setError, store } = setup();
    const expectedActions = [];

    return store.dispatch(login(user, password, setError)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(setError).toHaveBeenCalledTimes(1);
    });
  });
});

describe("signup actions", () => {
  it("should signup and set user", () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { username: "username" }
      })
    );
    const { user, password, setError, store } = setup();

    const expectedActions = [
      {
        type: SET_USER,
        user
      }
    ];

    return store.dispatch(signup(user, password, setError)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(setError).toHaveBeenCalledTimes(0);
    });
  });

  it("should fail signup and set default error message", () => {
    mockAxios.post.mockImplementationOnce(() => Promise.reject({}));

    const { user, password, setError, store } = setup();
    const expectedActions = [];

    return store.dispatch(signup(user, password, setError)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(setError).toHaveBeenCalledTimes(1);
    });
  });
});
