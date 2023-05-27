import { createWrapper } from "next-redux-wrapper";
import data from "./pages/API/data.json";
import { legacy_createStore as createStore } from "redux";

// initial state
const startState = {
    cards: []
}

//Actions
export const initialCards = () => {
    return {
        type: 'INITIALCARDS',
        cards: data
    }
}

export const addItem = (item) => {
    return {
        type: 'ADD',
        item: item
    }
}

// create store
const store = (initialState = startState) => {
    return createStore(reducer, initialState);
};

export const initStore = createWrapper(store);