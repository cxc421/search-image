import React, {Component} from 'react';
import Event from './Event';
import * as EventType from './EventType';
import Model from './Model';
import SlideInner from './SlideInner';
import classNames from 'classnames';
import loadingImg from '../img/Ellipsis.svg';
import $ from 'jquery';

class Slide extends Component {
	constructor() {
		super(...arguments);

		this.updateImageCheck = this.updateImageCheck.bind(this);
		this.onLoadImgError = this.onLoadImgError.bind(this);
		this.onLoadImgSuccess = this.onLoadImgSuccess.bind(this);
		this.onSlideStatusChange = this.onSlideStatusChange.bind(this);
		this.onClickCloseBtn = this.onClickCloseBtn.bind(this);
		this.onClickRightBtn = this.onClickRightBtn.bind(this);
		this.onClickLeftBtn = this.onClickLeftBtn.bind(this);
		//this.onSelectIndexChange = this.onSelectIndexChange.bind(this);
		this.onClickSlide = this.onClickSlide.bind(this);
		this.onClickDownloadBtn = this.onClickDownloadBtn.bind(this);

		const {curSelectImgIndex, imageList, showSlide} = Model.getData();
		const selectImg = imageList[curSelectImgIndex];
		this.state = {
			showSlide        : showSlide,			
			url              : selectImg.url,		
			description      : selectImg.description,	
			parentPage       : selectImg.parentPage,	
			preUrl           : ''
		};		
	}
	onLoadImgError () {
		const {curSelectImgIndex, imageList} = Model.getData();
		if (imageList.length <= curSelectImgIndex || curSelectImgIndex < 0) {
			return false;
		}
		const thumbnailUrl = imageList[curSelectImgIndex].thumbnail.url;
		if (this.state.url === thumbnailUrl) {
			console.error('Load failed');
			return false;
		}
		setTimeout(()=>{
			console.log('Retry....');				
			this.setState({url: thumbnailUrl});			
		}, 100);		
	}
	onLoadImgSuccess () {
		const {url} = this.state;
		this.setState({preUrl: url});
	}
	onSlideStatusChange (newShowSlide) {
		if (newShowSlide !== this.state.showSlide) {
			this.setState({showSlide: newShowSlide});
		}		
	}
	updateImageCheck () {
		const {curSelectImgIndex, imageList, showSlide} = Model.getData();
		if (imageList.length === 0 || curSelectImgIndex < 0 || curSelectImgIndex > imageList.length) {
			this.setState({
				url              : '',		
				description      : '',	
				parentPage       : '',				
			});			
		}
		else {
			const selectImg = imageList[curSelectImgIndex];		
			this.setState({
				url              : selectImg.url,		
				description      : selectImg.description,	
				parentPage       : selectImg.parentPage,				
			});
		}		
	}
	onClickCloseBtn () {
		Model.toggleSlideDisplay({show: false});
	}
	onClickRightBtn () {
		var newIdx = Model.getData().curSelectImgIndex + 1;
		Model.updateSelectIndex(newIdx);
	}
	onClickLeftBtn () {
		var newIdx = Model.getData().curSelectImgIndex - 1;
		Model.updateSelectIndex(newIdx);
	}	
	onClickSlide (evt) {
		if (evt.target === this.refs.self) {
			this.onClickCloseBtn();
		}
	}
	onClickDownloadBtn () {
		var nodeA;
		if ( (nodeA = document.getElementById('export-download-link')) === null ) {
			nodeA = document.createElement("A");
			nodeA.setAttribute('id', 'export-download-link');
			nodeA.setAttribute('style', 'display:none;');
			nodeA.setAttribute('download', '');
			nodeA.setAttribute('target', 'ifr');
			document.body.appendChild(nodeA);
		}
		nodeA.setAttribute('href', this.state.url);
		nodeA.click();	
	}
	componentDidMount() {
		Event.on(EventType.SLIDE_STATUS_CHANGE, this.onSlideStatusChange);
		Event.on(EventType.SELECT_INDEX_CHANGE, this.updateImageCheck);
		Event.on(EventType.IMGLIST_CHANGE, this.updateImageCheck);
	}
	render() {
		const {showSlide} = this.state;
		const slideStyle = {display: (showSlide)?'block':'none'};		
		const {url, description, parentPage, preUrl} = this.state;	
		const showLoadingImg = (url !== preUrl) || (url === '');
		//const showLoadingImg = true;
		return (
			<div className="Slide" ref="self" style={slideStyle} onClick={this.onClickSlide}>
				<div className="content-wrapper">
					<div className={classNames("main-content", {"loading": showLoadingImg})}>			
						<img className="loading-img" src={loadingImg}	alt="Loading..." />
						<img src={url} alt={url} onLoad={this.onLoadImgSuccess} onError={this.onLoadImgError} />					
						<SlideInner />
					</div>
					<div className="footer-content">												
						<a href={parentPage} target="_blank">{description}</a>	
						<div className="download-btn" onClick={this.onClickDownloadBtn}>Download</div>					
					</div>
					<div className="left-button" onClick={this.onClickLeftBtn}></div>					
					<div className="right-button" onClick={this.onClickRightBtn}></div>
					<div className="close-button" onClick={this.onClickCloseBtn}></div>					
				</div>
			</div>
		);
	}
}

Slide.defaultProps = {
	show: true
};

export default Slide;