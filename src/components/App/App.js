import React from "react";

import "./App.css";

import NavBar from "../NavBar/NavBar";

class App extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				{ this.props.children }
			</div>
		);
	}
}

export default App;
