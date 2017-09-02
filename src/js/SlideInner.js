import React, {Component} from 'react';
import Event from './Event';
import * as EventType from './EventType';
import Model from './Model';
import $ from 'jquery';

class SlideInner extends Component {
	constructor() {
		super(...arguments);

		this.onClickItem = this.onClickItem.bind(this);
		this.onImageListChange = this.onImageListChange.bind(this);

		const {curSelectImgIndex, imageList} = Model.getData();
		this.state = {
			curSelectImgIndex: curSelectImgIndex,
			imageList: imageList
		};		
	}	
	updateMarginLeft($list, correctMarginLeft) {
		const $container = $(this.refs.container);		
		//$list.css('margin-left', correctMarginLeft);
		$list
			.stop()
			.animate({marginLeft: correctMarginLeft}, 700);

	}
	setSelectItem($list, curSelectImgIndex) {
		const $container = $(this.refs.container);
		const $preSelect = $container.find('.select-inner-item');
		if ($preSelect.length) {
			$preSelect.removeClass('select-inner-item');
		}
		$list.children().eq(curSelectImgIndex).addClass('select-inner-item');		
	}
	checkListPosition() {
		const {curSelectImgIndex, imageList} = Model.getData();
		if (curSelectImgIndex < 0 || curSelectImgIndex >= imageList.length) {
			return false;
		}
		const $list = $(this.refs.list);
		const curMarginLeft = $list.css('margin-left');
		const correctMarginLeft = -45 - 90*curSelectImgIndex;
		if (curMarginLeft !== correctMarginLeft) {
			this.updateMarginLeft($list, correctMarginLeft);
			this.setSelectItem($list, curSelectImgIndex)
		}
	}
	onClickItem (evt) {
		//console.log(evt.target.getAttribute('data-idx'));
		//console.log(evt);
		const newIdx = evt.target.getAttribute('data-idx');
		Model.updateSelectIndex(newIdx);
	}
	onImageListChange (newList) {
		this.setState({imageList: newList});
	}
	componentDidMount() {
		this.checkListPosition();
		Event.on(EventType.IMGLIST_CHANGE, this.onImageListChange);
	}
	componentDidUpdate() {
		this.checkListPosition();		
	}
	render() {
		const {imageList} = this.state;
		//const listStyle = {marginLeft: (-45 - 90*curSelectImgIndex) };
		return (
			<div className="SlideInner" ref="container">
				<div className="background"></div>
				<div className="inner-list-warpper">
					<div ref="list" className="inner-list">
						{
							imageList.map((imgObj, idx)=>{
								return (
									<div className="inner-item" key={idx} data-idx={idx} onClick={this.onClickItem}>
										<img src={imgObj.thumbnail.url} alt={imgObj.thumbnail.url} data-idx={idx} />
									</div>
								);
							})
						}
					</div>
				</div>
			</div>					
		);
	}
}

export default SlideInner;