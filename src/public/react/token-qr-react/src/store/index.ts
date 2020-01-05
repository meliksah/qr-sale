import { createStore, combineReducers, applyMiddleware } from "redux";
import { qrReducer } from "./qr/reducer";

const rootReducer = combineReducers({
  qr: qrReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
  );
  return store;
}
