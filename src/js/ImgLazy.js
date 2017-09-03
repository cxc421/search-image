import React, {Component} from 'react';
import ImgLazyCenter from './ImgLazyCenter';
import Event from './Event';
import * as EventType from './EventType';

class ImgLazy extends Component {
	constructor() {
		super(...arguments);
		// function binding
		this.imgOnLoad = this.imgOnLoad.bind(this);
		this.imgOnError = this.imgOnError.bind(this);
		this.canLoadImgChange = this.canLoadImgChange.bind(this);
		// init state
		const {src, alt} = this.props;
		this.state = {
			src: src,
			alt: alt,
			canLoadImg: false
		};
		this.imgId = ImgLazyCenter.genNewImgId();
	}
	subscribeLoadImg ()	{
		this.setState({canLoadImg: false});
		ImgLazyCenter.subscribe( this.imgId );
	}
	canLoadImgChange (imgId) {
		if (imgId === this.imgId) {
			this.setState({canLoadImg: true});
		}
	}
	imgOnLoad (evt) {
		ImgLazyCenter.finish(this.imgId);
		return this.props.onLoad(evt);
	}
	imgOnError (evt) {
		ImgLazyCenter.finish(this.imgId);
		return this.props.onError(evt);
	}
	render () {
		const {src, alt, canLoadImg} = this.state;
		return (canLoadImg 
			? <img src={src} alt={alt} onLoad={this.imgOnLoad} onError={this.imgOnError} data-idx={this.props['data-idx']} /> 
			: null
		);
	}
	componentDidMount() {
		Event.on(EventType.CAN_LOAD_IMG_CHANGE, this.canLoadImgChange);
		this.subscribeLoadImg();
	}
	componentWillReceiveProps(nextProps) {
		const {src, alt} = nextProps;
		if (src !== this.state.src || alt !== this.state.alt) {
			this.subscribeLoadImg();
			this.setState({
				src: src, alt: alt
			});
		}
	}
}

ImgLazy.defaultProps = {
	src: '',
	alt: '',
	'data-idx': null,
	onLoad: (f) => f,
	onError: (f) => f
};

export default ImgLazy;