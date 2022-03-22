import { createStore } from "redux";
import reducer from "./reducer";

const storageKey = "basesolve_task_state";

const loadState = () => {
  const serializedState = sessionStorage.getItem(storageKey);
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  sessionStorage.setItem(storageKey, serializedState);
};

const persistedState = loadState();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
