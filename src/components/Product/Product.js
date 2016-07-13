import React from "react";

import "./Product.css";

class Product extends React.Component {
	render() {
		return (
			<div className="product-wrapper">
				<h2>{ this.props.name }</h2>
				<h3>Price: ${ this.props.price }</h3>
				<button onClick={ this.props.addToCart }>Add to Cart</button>
			</div>
		);
	}
}

export default Product;
