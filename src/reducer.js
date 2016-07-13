import { combineReducers } from "redux";

import cart from "./ducks/cartDuck";
import user from "./ducks/userDuck";

export default combineReducers( {
	  cart
	, user
} );
