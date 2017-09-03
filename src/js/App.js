import React, {Component} from 'react';
import NavBar from './Navbar';
import Pin from './Pin';
import Slide from './Slide';
import Model from './Model';
import Event from './Event';
import * as EventType from './EventType';
import $ from 'jquery';

class App extends Component {
	constructor() {
		super(...arguments);
		this.onImageListUpdate = this.onImageListUpdate.bind(this);
		this.onWindowResize = this.onWindowResize().bind(this);
		this.state = {
			imgList  : Model.getData().imageList.slice(),
			colNum   : 0			
		};
	}
	makeDemoList () {
		const num = 60;
		const res = [];
		for (let i=0; i<num; i++) {
			res.push(i+1);
		}
		return res;
	}
	updateColNum () {
	  var winWidth = window.innerWidth || document.body.clientWidth;
	  var marginWidth = 14; // overflow bar width
	  var blockWidth = 260;	  
	  var blockNum = Math.floor( (winWidth - marginWidth)/blockWidth );
	  console.log('blockNum=' + blockNum);
	  if (blockNum !== this.state.colNum)	{
			this.setState({colNum: blockNum});
	  }		
	}
	onImageListUpdate (imgList) {
		this.setState({imgList: imgList});
	}	
	onWindowResize = () => {
		let preKey = null;
		return () => {
			clearTimeout(preKey);
			preKey = setTimeout(()=>{
				this.updateColNum();
			}, 500);
		}
	}
	componentDidMount() {
		Event.on(EventType.IMGLIST_CHANGE, this.onImageListUpdate);
		$(window).resize(this.onWindowResize);
		this.updateColNum();
	}	
	render() {
		const {imgList, colNum} = this.state;		
		const colJSX = [];
		const genItem = (startIdx) => {
			const itemJSX = [];
			const imgLength = imgList.length;			
			for (let i = startIdx; i < imgLength; i += colNum) {
				//itemJSX.push(<div className="demo" key={`img-${i}`}>{i+1}</div>);
				let imgObj = imgList[i];
				itemJSX.push(<Pin {...imgObj} key={i} idx={i}/>);
			}
			return itemJSX;
		};

		for (let col=1; col<=colNum; col++) {
			colJSX.push(
				<div className="col" key={`col-${col}`}>					
					{genItem(col-1)}
				</div>
			);
		}
		return (
			<div>
				<NavBar />
				<div className="wrapper">					
					{ 
						colJSX
					}
				</div>
				<Slide />
			</div>
		);
	}
}

export default App;