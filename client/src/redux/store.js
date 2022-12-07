import { createStore, applyMiddleware} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';



const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(thunk))//hacer acciones asincronas y concectar con devstools para ver estados de redux 
);

export default store;