import React, {Component} from 'react';
import Navbar from './Navbar';
import Ping from './Ping'

class App extends Component {
	constructor() {
		super(...arguments);
	}
	render() {
		return (
			<div>
				<Navbar />
				<div className="grid">
					<Ping />
				</div>
			</div>
		);
	}
}

export default App;