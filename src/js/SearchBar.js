import React, {Component} from 'react';
import classNames from 'classnames';
import Model from './Model';
import Event from './Event';
import * as EventType from './EventType';

class SearchBar extends Component {
	constructor() {
		super(...arguments);
		this.onInputKeyPress = this.onInputKeyPress.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.startNewSearch = this.startNewSearch.bind(this);
		//this.onInputBlur = this.onInputBlur.bind(this);
		this.state = {
			searchText: ''
		};
	}
	startNewSearch() {
		const {searchText} = this.state;
		console.log('Start New Search: ' + searchText);
		Model.startNewSearch(searchText);
	}
	onInputKeyPress(evt) {
    if(evt.key === 'Enter'){
    	//console.log('Enter');
    	evt.target.blur();
    	this.startNewSearch();
    }     
	}
	onInputChange(evt) {
		//console.log(evt.target.value);
		this.setState({searchText: evt.target.value});
	}
	render() {				
		return (
		  <div className={classNames('SearchBar', this.props.bsClass)}>
		    <button onClick={this.startNewSearch}>
		      <i className="fa fa-search" aria-hidden="true"></i>
		    </button>
		    <input type="text" placeholder='搜尋' value={this.state.searchText} onKeyPress={this.onInputKeyPress} onChange={this.onInputChange} />
		  </div>		
		);		
	}
}

SearchBar.defaultProps = {
	bsClass: null
};

export default SearchBar;