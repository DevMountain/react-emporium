import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../../services/productService";

import "./Shop.css";

import { addProduct } from "../../ducks/cartDuck";

import Product from "../Product/Product";

class Shop extends React.Component {
	addToCart( product ) {
		this.props.dispatch( addProduct( product ) )
	}

	render() {
		const products = getProducts().map( product => (
			<Product
				addToCart={ this.addToCart.bind( this, product ) }
				key={ product.name }
				name={ product.name }
				price={ product.price }
			/>
		) );

		return (
			<div className="shop-wrapper">
				{ products }
			</div>
		);
	}
}

export default connect( state => ( { cart: state.cart } ) )( Shop );
