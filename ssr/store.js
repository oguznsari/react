import { createWrapper } from "next-redux-wrapper";
import data from "./pages/API/data.json";
import { legacy_createStore as createStore } from "redux";

// create store
const store = (initialState = startState) => {
    return createStore(reducer, initialState);
};

export const initStore = createWrapper(store);