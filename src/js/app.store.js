import DB from "./app.db";
import {createStore} from "redux";
import {AppReducer} from "./reducers/app.reducer";

let AppState = DB.get('data');

window.Store = createStore(AppReducer, AppState || undefined);

Store.subscribe(() => {
   DB.set('data', Store.getState());
});
