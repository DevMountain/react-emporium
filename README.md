## React Emporium

### Objectives

* Build a simple e-commerce site using React, React Router, and Redux.
* Become familiar with the concepts of actions, action creators, application state, and working with multiple reducers.

## Step 1: Dependencies and Redux setup.

Be sure to `npm init`, then install the following dependencies (for an explanation of each dependency see [React Friends](https://github.com/DevMountain/react-friends/)):

Standard:

* `react`
* `react-dom`
* `react-router`
* `redux`
* `react-redux`

Dev:

* `babel-core`
* `babel-loader`
* `babel-preset-es2015`
* `babel-preset-react`
* `css-loader`
* `style-loader`
* `webpack`
* `webpack-dev-server`

The only new dependencies here are Redux (which we will be using to manage our application state) and React Redux (which allows us to connect React components to Redux).

We will begin by setting up our Reducers following the [Ducks](https://github.com/erikras/ducks-modular-redux) pattern. Inside of `/src/ducks` create two new files: `cartDuck.js` and `userDuck.js`. `cartDuck` will track the state of the user's cart, and `userDuck` will track the state of the current user. `userDuck` is more simple, so we will begin there.

* Create two action types of "LOGIN" and "LOGOUT"
* Create an initial state object with three properties:
	* username - Defaults to an empty string
	* email - Defaults to an empty string
	* loggedIn - Defaults to boolean false
* Create and export by default a reducer function that will handle your two actions.
	* LOGIN should take a user from the action and place its username and email on state, as well as toggling `loggedIn` to true.
	* LOGOUT should return the initial state.
	* Remember that reducers **must** return a state object.
	* Remember that you cannot mutate state, you need to return a new state object each time.
* Create and export an action creator for each of your action types
	* LOGIN should take a single user parameter.

Your code should look something like this:
``` js
// userDuck.js
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";

const initialState = {
	username: ""
	, email: ""
	, loggedIn: false
};

export default function reducer( state = initialState, action ) {
	switch( action.type ) {
		case LOGIN:
			return Object.assign( {}, action.user, { loggedIn: true } );
		case LOGOUT:
			return initialState;
	}

	return state;
}

export function login( user ) {
	return { type: LOGIN, user };
}

export function logout() {
	return { type: LOGIN };
}

```

Now we will set up our `cartDuck.js`

* Create three action types of `ADD_PRODUCT`, `REMOVE_PRODUCT`, and `CHECKOUT`
* Create an initial state object with two properties:
	* `productsInCart` - Defaults to an empty array
	* `runningTotal` - Defaults to the number 0
* Create and export by default a reducer function that handles the above action types appropriately.
* Create and export three action creators for your action types
	* Add and Remove product action creators should take in a product parameter

Your code should look something like this:
``` js
// cartDuck.js
const ADD_PRODUCT = "cart/ADD_PRODUCT";
const REMOVE_PRODUCT = "cart/REMOVE_PRODUCT";
const CHECKOUT = "cart/CHECKOUT";

const initialState = {
	productsInCart: []
	, runningTotal: 0
};

export default function reducer( state = initialState, action ) {
	switch( action.type ) {
		case ADD_PRODUCT:
			return {
				productsInCart: [ ...state.productsInCart, action.product ]
				, runningTotal: state.runningTotal + action.product.price
			};
		case REMOVE_PRODUCT:
			return {
				productsInCart: state.productsInCart.filter( product => product._id !== action.product._id )
				, runningTotal: state.runningTotal - action.product.price
			};
		case CHECKOUT:
			return initialState;
	}

	return state;
}

export function addProduct( product ) {
	return { type: ADD_PRODUCT, product };
}

export function removeProduct( product ) {
	return { type: REMOVE_PRODUCT, product };
}

export function checkout() {
	return { type: CHECKOUT };
}
```

Now that our two reducers are created, we need to link them to a Redux store. To do that we will need 2 new files inside of `/src/`: `reducer.js` and `store.js`

* In `reducer.js` combine your reducers using Redux's `combineReducers` and export them as default.
* In `store.js` use and export by default Redux's `createStore` method.

The code should look something like this:
``` js
// reducer.js
import { combineReducers } from "redux";

import cart from "./ducks/cartDuck";
import user from "./ducks/userDuck";

export default combineReducers( {
	  cart
	, user
} );
```

``` js
// store.js
import { createStore } from "redux";

import reducer from "./reducer";

export default createStore( reducer );
```

With those files created and set up, we won't need to touch them again, just make use of what they've exported.

___

## Step 2: Component setup
**Index**
* Create `index.js` in the `src/` directory and import the standard React, ReactDOM, and React Router components as well as two new imports:
	* `store` from our recently created Redux store.
	* `Provider` from `react-redux` - Allows us to connect our store to our components
* Using ReactDOM, render a router onto `react-node`
	* For now, the route will have one path of `"/"` handled by the component `App` (which we will be creating shortly).
* The only change to implement now that we have added Redux is that we must wrap our Router inside of a `Provider` component:

``` jsx
ReactDOM.render(
		<Provider store={ store }>
			<Router history={ browserHistory }>
				<Route path="/" component={ App }>
				</Route>
			</Router>
		</Provider>
	, reactNode );
```

**Component One**: App
Inside of `/src/components/App` create a file: `App.js`.
Our `App` component will be extremely simple, serving as a simple wrapper for our application. For now it should just return a `<div>` containing the component' children.

Don't forget to import this component to `index.js` so your root route can be handled!

**Component Two**: NavBar
Inside of `/src/components/NavBar` create a file: `NavBar.js`.
* Create `NavBar.js` inside of the `NavBar/` folder and import the following:
    * `React` from `react` - As always
    * `connect` from react-redux - To connect our component to our application state.
    * `Link` from `react-router` - For routing
    * `NavBar.css` for our styles.
* Create a class of `NavBar` and export the `connect`ed version of the class. Connecting to both `state.user` and `state.cart`
* Inside the component's `render` method return the following JSX:

``` jsx
<nav>
	<h2>React Emporium</h2>
</nav>
```

* Underneath the `<h2>` element return either

``` jsx
<div className="nav-link">
	<Link to="/">{ this.props.cart.productsInCart.length } items in cart - ${ Math.floor( this.props.cart.runningTotal ) }</Link>
</div>
```

or

``` jsx
<div className="nav-link">
	<Link to="/login">Login</Link>
</div>
```

depending on whether or not the user is logged in. Your code should look something like this:

``` jsx
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"

import "./NavBar.css";

class NavBar extends React.Component {
	render() {
		return (
			<nav>
				<h2>React Emporium</h2>
				{ this.props.user.loggedIn
					?
						<div className="nav-link">
							<Link to="/">{ this.props.cart.productsInCart.length } items in cart - ${ Math.floor( this.props.cart.runningTotal ) }</Link>
						</div>
					:
						<div className="nav-link">
							<Link to="/login">Login</Link>
						</div>
				}
			</nav>
		);
	}
}

export default connect( state => ( {
	user: state.user
	, cart: state.cart
} ) )( NavBar );
```

Import the NavBar component into `App.js` and include it inside of the `render` method above  `{ this.props.children }`.

**Component Three:** Login
Inside of `/src/components/Login` create a file: `Login.js`.
Our login component will contain a simple form that takes in a user's name and email and dispatches that information to the store.

You will need to import:
* React
* `connect` from `react-redux`
* `browserHistory` from `react-router`
* `Login.css`
* And the `login` action creator inside of `userDuck`

The login class will need the following:
* A constructor that creates an initial state with properties of `username` and `email`
* A `handleChange` method for editing input fields
* A `login` method that will dispatch a login action to our store and then route to `"/shop"`( which we haven't created just yet ).
* A `render` method that returns the following JSX:

``` jsx
<div>
		<form className="login-form">
			<input
				placeholder="Username"
				type="text"
			/>
			<input
				placeholder="Email"
				type="text"
			/>
			<button
				type="submit"
			>
				Login
			</button>
		</form>
</div>
```

Be sure to plug in `value`'s, `onChange`'s, and `onClick`'s where necessary.

Lastly, connect the component to `state.user` and export the component.
