import React, {Component} from 'react';
import SearchBar from './SearchBar'

class Navbar extends Component {
	render () {
		return (			
			<div className="Navbar">								
				<i className="fa fa-google-plus-official" aria-hidden="true"></i>
				<SearchBar bsClass="Navbar_searchbar"/>
			</div>
		);
	}
}

export default Navbar;