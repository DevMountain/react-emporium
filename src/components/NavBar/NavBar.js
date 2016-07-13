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
