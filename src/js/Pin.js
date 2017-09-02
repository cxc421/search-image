import React, {Component} from 'react';

class Pin extends Component {
	constructor() {
		super(...arguments);
		this.onLoadImgError = this.onLoadImgError.bind(this);

		const {url, description} = this.props;
		this.state = {
			url: url,
			description: description
		};
		this.loadCount = 0;
	}
	onLoadImgError(evt) {
		//console.error('Load error!');
		//console.log(evt.target.src);
		if (++this.loadCount > 2) {
			console.error('Load failed');
			return false;
		}
		setTimeout(()=>{
			//console.log('Retry....');
			this.setState({url: this.props.thumbnail.url});			
		}, 100);
	}
	render() {
		const {url, description} = this.state;
		return (
	    <div className="Pin">
	      <div className="img-wrapper">
	        <img src={url} alt={url} onError={this.onLoadImgError}/>
	      </div>
	      <p>{description}</p>
	    </div>
		);
	}
}

export default Pin;