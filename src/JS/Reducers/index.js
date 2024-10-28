import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";
import AuthReducer from "./AuthReducer";
import Cart_wishesListReducer from "./Cart_wishesListReducer"
import UserReducer from "./UserReducer";




const rootReducer = combineReducers({ProductReducer,AuthReducer,Cart_wishesListReducer,UserReducer});

export default rootReducer;